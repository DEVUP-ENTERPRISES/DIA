'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from '@/lib/activity-log'
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './schemas'
import type { UserRole, ApplicationStatus } from '@/types/auth'

// ---------------------------------------------------------------------------
// Shared action state type
// ---------------------------------------------------------------------------

export type ActionState = {
  error?: string
  success?: string
  fieldErrors?: Record<string, string[]>
}

// Roles a user is allowed to self-select at signup. Admin/moderator are created
// separately and can never be chosen here.
const SELF_SIGNUP_ROLES: readonly UserRole[] = ['civilian', 'lawyer']

function normalizeSignupRole(value: FormDataEntryValue | null): UserRole {
  return value === 'lawyer' ? 'lawyer' : 'civilian'
}

// ---------------------------------------------------------------------------
// Post-auth routing - shared by login and the OAuth/email callback logic.
// Returns the path a user should land on based on role + onboarding state.
// ---------------------------------------------------------------------------

async function resolvePostAuthPath(userId: string): Promise<string> {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, purpose')
    .eq('id', userId)
    .single()

  const role = profile?.role as UserRole | undefined

  if (role === 'admin') return '/admin/dashboard'
  if (role === 'moderator') return '/moderator/dashboard'

  if (role === 'civilian') {
    // Civilian onboarding is complete once they've told us their purpose.
    return profile?.purpose ? '/dashboard' : '/onboarding'
  }

  if (role === 'lawyer') {
    const { data: lp } = await supabase
      .from('lawyer_profiles')
      .select('application_status')
      .eq('user_id', userId)
      .single()

    // No lawyer profile yet → still needs to complete onboarding.
    if (!lp) return '/onboarding'

    const status = lp.application_status as ApplicationStatus
    if (status === 'approved') return '/lawyer/dashboard'
    if (status === 'hold') return '/lawyer/status/hold'
    if (status === 'rejected') return '/lawyer/status/rejected'
    return '/lawyer/status/pending'
  }

  return '/login'
}

// ---------------------------------------------------------------------------
// Login (all roles - email + password)
// ---------------------------------------------------------------------------

export async function login(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error || !data.user) {
    return { error: 'Invalid email or password.' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_active')
    .eq('id', data.user.id)
    .single()

  if (!profile) {
    return { error: 'Account not found. Please contact support.' }
  }

  if (!profile.is_active) {
    await supabase.auth.signOut()
    return { error: 'Your account has been deactivated.' }
  }

  logActivity({ actor: data.user.id, action: 'user_login' })

  redirect(await resolvePostAuthPath(data.user.id))
}

// ---------------------------------------------------------------------------
// Signup (civilian or lawyer) - email + password
// ---------------------------------------------------------------------------

export async function signup(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const role = normalizeSignupRole(formData.get('role'))

  const parsed = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      // The handle_new_user DB trigger reads this to set the profile role.
      data: { role },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback`,
    },
  })

  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      return { error: 'An account with this email already exists.' }
    }
    return { error: error.message }
  }

  if (data.user) {
    logActivity({
      actor: data.user.id,
      action: role === 'lawyer' ? 'lawyer_registered' : 'user_login',
      metadata: { event: 'signup', role },
    })
  }

  // If the session exists, the account was auto-confirmed → go straight to
  // onboarding. Otherwise the user must verify their email first.
  if (data.session) {
    redirect('/onboarding')
  }

  redirect('/verify-email')
}

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------

export async function logout(): Promise<never> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

// ---------------------------------------------------------------------------
// Forgot password
// ---------------------------------------------------------------------------

export async function forgotPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/reset-password`,
    },
  )

  if (error) {
    return { error: error.message }
  }

  return {
    success:
      'If an account with that email exists, a reset link has been sent.',
  }
}

// ---------------------------------------------------------------------------
// Reset password
// ---------------------------------------------------------------------------

export async function resetPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  logActivity({ actor: null, action: 'password_reset' })

  redirect('/login')
}

// ---------------------------------------------------------------------------
// Google OAuth (civilian or lawyer)
// ---------------------------------------------------------------------------
// Supabase can't set user_metadata.role before the OAuth account is created,
// so the handle_new_user trigger defaults OAuth signups to 'civilian'. To
// support "sign up as a lawyer with Google", we pass the intended role through
// the callback URL; the callback promotes a brand-new civilian profile to
// 'lawyer' when that intent is present.
// ---------------------------------------------------------------------------

export async function signInWithGoogle(role?: UserRole): Promise<ActionState> {
  const supabase = await createClient()

  const intendedRole: UserRole =
    role && SELF_SIGNUP_ROLES.includes(role) ? role : 'civilian'

  const callbackUrl = new URL(
    '/auth/callback',
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  )
  if (intendedRole === 'lawyer') {
    callbackUrl.searchParams.set('intended_role', 'lawyer')
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl.toString(),
    },
  })

  if (error || !data.url) {
    return { error: 'Google sign-in is currently unavailable.' }
  }

  redirect(data.url)
}
