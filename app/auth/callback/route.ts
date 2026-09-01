import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ApplicationStatus, UserRole } from '@/types/auth'

/**
 * Supabase OAuth + email-confirmation callback handler.
 * Exchanges the `code` query param for a session, promotes Google lawyer
 * signups to the lawyer role, then redirects based on role + onboarding state.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  // Set on the OAuth redirect URL when the user chose "lawyer" for a Google signup.
  const intendedRole = searchParams.get('intended_role')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
  }

  const userId = data.session.user.id

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active, purpose')
    .eq('id', userId)
    .single()

  if (!profile || !profile.is_active) {
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/login?error=account_inactive`)
  }

  let role = profile.role as UserRole

  // Google lawyer signup: the trigger defaulted this new account to 'civilian'
  // (OAuth can't carry role metadata). Promote it to 'lawyer' only if the
  // account is still a fresh civilian with no onboarding progress.
  if (
    intendedRole === 'lawyer' &&
    role === 'civilian' &&
    !profile.purpose
  ) {
    const { data: lp } = await supabase
      .from('lawyer_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle()

    if (!lp) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'lawyer' })
        .eq('id', userId)

      if (!updateError) role = 'lawyer'
    }
  }

  // Route based on role + onboarding completion.
  if (role === 'admin') {
    return NextResponse.redirect(`${origin}/admin/dashboard`)
  }
  if (role === 'moderator') {
    return NextResponse.redirect(`${origin}/moderator/dashboard`)
  }
  if (role === 'civilian') {
    return NextResponse.redirect(
      `${origin}${profile.purpose ? '/dashboard' : '/onboarding'}`,
    )
  }

  if (role === 'lawyer') {
    const { data: lp } = await supabase
      .from('lawyer_profiles')
      .select('application_status')
      .eq('user_id', userId)
      .single()

    // No lawyer profile yet → complete onboarding.
    if (!lp) return NextResponse.redirect(`${origin}/onboarding`)

    const status = lp.application_status as ApplicationStatus
    if (status === 'approved') {
      return NextResponse.redirect(`${origin}/lawyer/dashboard`)
    }
    if (status === 'hold') {
      return NextResponse.redirect(`${origin}/lawyer/status/hold`)
    }
    if (status === 'rejected') {
      return NextResponse.redirect(`${origin}/lawyer/status/rejected`)
    }
    return NextResponse.redirect(`${origin}/lawyer/status/pending`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
