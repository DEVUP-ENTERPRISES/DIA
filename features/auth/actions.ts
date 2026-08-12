'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from '@/lib/activity-log'
import {
  loginSchema,
  civilianSignupSchema,
  lawyerSignupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './schemas'
import type { ApplicationStatus } from '@/types/auth'

// ---------------------------------------------------------------------------
// Shared action state type
// ---------------------------------------------------------------------------

export type ActionState = {
  error?: string
  success?: string
  fieldErrors?: Record<string, string[]>
}

// ---------------------------------------------------------------------------
// Login (all roles — email + password)
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

  // Fetch authoritative role from profiles table (never trust JWT metadata alone).
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', data.user.id)
    .single()

  if (!profile) {
    return { error: 'Account not found. Please contact support.' }
  }

  if (!profile.is_active) {
    await supabase.auth.signOut()
    return { error: 'Your account has been deactivated.' }
  }

  // Fire-and-forget activity log.
  logActivity({ actor: data.user.id, action: 'user_login' })

  // Redirect based on role.
  const role = profile.role
  if (role === 'admin') redirect('/admin/dashboard')
  if (role === 'moderator') redirect('/moderator/dashboard')
  if (role === 'civilian') redirect('/dashboard')

  // Lawyer — check application status.
  if (role === 'lawyer') {
    const { data: lp } = await supabase
      .from('lawyer_profiles')
      .select('application_status, bar_council_number, bio')
      .eq('user_id', data.user.id)
      .single()

    if (!lp) redirect('/lawyer/profile')

    const status = lp.application_status as ApplicationStatus
    if (status === 'approved') redirect('/lawyer/dashboard')
    if (status === 'hold') redirect('/lawyer/status/hold')
    if (status === 'rejected') redirect('/lawyer/status/rejected')
    redirect('/lawyer/status/pending')
  }

  redirect('/login')
}

// ---------------------------------------------------------------------------
// Civilian signup
// ---------------------------------------------------------------------------

export async function civilianSignup(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = civilianSignupSchema.safeParse({
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
      // The handle_new_user DB trigger reads this to set role = 'civilian'.
      data: { role: 'civilian' },
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
      action: 'user_login',
      metadata: { event: 'signup' },
    })
  }

  // Supabase may auto-confirm or require email verification depending on project config.
  // If session exists, the user is auto-confirmed → redirect to dashboard.
  if (data.session) {
    redirect('/dashboard')
  }

  // Otherwise, direct them to verify email.
  redirect('/verify-email')
}

// ---------------------------------------------------------------------------
// Lawyer signup
// ---------------------------------------------------------------------------

export async function lawyerSignup(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = lawyerSignupSchema.safeParse({
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
      // The handle_new_user DB trigger reads this to set role = 'lawyer'.
      data: { role: 'lawyer' },
      // After email verification, redirect back to the app.
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
      action: 'lawyer_registered',
      metadata: { email: parsed.data.email },
    })
  }

  // Lawyers must verify email before proceeding.
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

  // Return success without redirecting — the page shows a confirmation message.
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
// Google OAuth (civilian only)
// ---------------------------------------------------------------------------

export async function signInWithGoogle(): Promise<ActionState> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback`,
      queryParams: {
        // Pass role hint — the DB trigger will read raw_user_meta_data.role.
        // For OAuth signups the trigger defaults to 'civilian' if not set.
      },
    },
  })

  if (error || !data.url) {
    return { error: 'Google sign-in is currently unavailable.' }
  }

  redirect(data.url)
}
