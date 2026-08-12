import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Supabase OAuth + email-confirmation callback handler.
 * Exchanges the `code` query param for a session, then redirects
 * the user to the correct dashboard based on their role.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  // `next` is set by Supabase when redirecting after email verification.
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

  // Fetch authoritative role from profiles table.
  // RLS policy "Users can view own profile" covers this — user reads their own row.
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', userId)
    .single()

  if (!profile || !profile.is_active) {
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/login?error=account_inactive`)
  }

  const role = profile.role

  // Redirect to the correct dashboard.
  if (role === 'admin') {
    return NextResponse.redirect(`${origin}/admin/dashboard`)
  }
  if (role === 'moderator') {
    return NextResponse.redirect(`${origin}/moderator/dashboard`)
  }
  if (role === 'civilian') {
    return NextResponse.redirect(`${origin}/dashboard`)
  }

  // Lawyer — check application status and onboarding step.
  if (role === 'lawyer') {
    const { data: lp } = await supabase
      .from('lawyer_profiles')
      .select('application_status, bar_council_number, bio')
      .eq('user_id', userId)
      .single()

    if (!lp) return NextResponse.redirect(`${origin}/lawyer/profile`)

    const status = lp.application_status
    if (status === 'approved') return NextResponse.redirect(`${origin}/lawyer/dashboard`)
    if (status === 'hold') return NextResponse.redirect(`${origin}/lawyer/status/hold`)
    if (status === 'rejected') return NextResponse.redirect(`${origin}/lawyer/status/rejected`)
    return NextResponse.redirect(`${origin}/lawyer/status/pending`)
  }

  // Fallback — honour the `next` param from Supabase email links.
  return NextResponse.redirect(`${origin}${next}`)
}
