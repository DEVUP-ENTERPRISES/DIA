import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { UserRole, ApplicationStatus } from '@/types/auth'

// ---------------------------------------------------------------------------
// Route matchers
// ---------------------------------------------------------------------------

/** Public routes that are always accessible. */
const PUBLIC_PATHS = [
  '/',
  '/about',
  '/legal',
  '/resources',
  '/login',
  '/signup',
  '/signup/civilian',
  '/signup/lawyer',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/auth/callback',
]

/** Role → home dashboard mapping. */
const ROLE_HOME: Record<UserRole, string> = {
  admin: '/admin/dashboard',
  moderator: '/moderator/dashboard',
  lawyer: '/lawyer/status/pending', // overridden below based on status
  civilian: '/dashboard',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
}

function startsWithAny(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname.startsWith(p))
}

// ---------------------------------------------------------------------------
// Proxy function (Next.js 16 — replaces middleware.ts)
// ---------------------------------------------------------------------------

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Build a Supabase client that can read/refresh session cookies.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // getUser() validates the JWT server-side; never rely on getSession() alone.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ------------------------------------------------------------------
  // 1. Unauthenticated — only allow public paths.
  // ------------------------------------------------------------------
  if (!user) {
    if (isPublicPath(pathname)) return response
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // ------------------------------------------------------------------
  // 2. Fetch the profile row to get the authoritative role.
  //    Never trust JWT claims alone for routing decisions.
  // ------------------------------------------------------------------
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single()

  const role = profile?.role as UserRole | undefined
  const isActive = profile?.is_active ?? false

  // Inactive accounts are forced to login.
  if (!isActive) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // ------------------------------------------------------------------
  // 3. Authenticated user on a public/auth page → redirect to dashboard.
  // ------------------------------------------------------------------
  if (isPublicPath(pathname)) {
    // Let /auth/callback through always (it handles the OAuth exchange).
    if (pathname.startsWith('/auth/')) return response

    const url = request.nextUrl.clone()

    if (role === 'lawyer') {
      // Lawyer's home depends on application status — resolved below.
      const { data: lp } = await supabase
        .from('lawyer_profiles')
        .select('application_status')
        .eq('user_id', user.id)
        .single()
      url.pathname = lawyerHome(lp?.application_status)
    } else {
      url.pathname = ROLE_HOME[role ?? 'civilian']
    }
    return NextResponse.redirect(url)
  }

  // ------------------------------------------------------------------
  // 4. Role-based route guards.
  // ------------------------------------------------------------------

  // --- Admin routes ---
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return redirectToRoleHome(request, role, user.id, supabase)
    }
    return response
  }

  // --- Moderator routes ---
  if (pathname.startsWith('/moderator')) {
    if (role !== 'moderator') {
      return redirectToRoleHome(request, role, user.id, supabase)
    }
    return response
  }

  // --- Lawyer routes ---
  if (pathname.startsWith('/lawyer')) {
    if (role !== 'lawyer') {
      return redirectToRoleHome(request, role, user.id, supabase)
    }

    const { data: lp } = await supabase
      .from('lawyer_profiles')
      .select('application_status, bar_council_number, bio')
      .eq('user_id', user.id)
      .single()

    const status = lp?.application_status as ApplicationStatus | undefined
    const profileComplete = !!(lp?.bar_council_number && lp?.bio)

    // Protect /lawyer/dashboard — only approved lawyers.
    if (pathname.startsWith('/lawyer/dashboard') && status !== 'approved') {
      const url = request.nextUrl.clone()
      url.pathname = lawyerHome(status)
      return NextResponse.redirect(url)
    }

    // Redirect approved lawyers away from status pages / onboarding.
    if (
      status === 'approved' &&
      (pathname.startsWith('/lawyer/status') ||
        pathname.startsWith('/lawyer/profile') ||
        pathname.startsWith('/lawyer/documents'))
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/lawyer/dashboard'
      return NextResponse.redirect(url)
    }

    // Pending/hold/rejected: only allow status pages.
    if (
      status &&
      status !== 'approved' &&
      pathname.startsWith('/lawyer/dashboard')
    ) {
      const url = request.nextUrl.clone()
      url.pathname = lawyerHome(status)
      return NextResponse.redirect(url)
    }

    // If no lawyer profile yet, redirect to profile creation.
    if (!lp && !pathname.startsWith('/lawyer/profile')) {
      const url = request.nextUrl.clone()
      url.pathname = '/lawyer/profile'
      return NextResponse.redirect(url)
    }

    // Profile complete but no status page submission yet: go to documents.
    if (
      lp &&
      !profileComplete &&
      !startsWithAny(pathname, ['/lawyer/profile'])
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/lawyer/profile'
      return NextResponse.redirect(url)
    }

    return response
  }

  // --- Civilian /dashboard ---
  if (pathname.startsWith('/dashboard')) {
    if (role !== 'civilian') {
      return redirectToRoleHome(request, role, user.id, supabase)
    }
    return response
  }

  return response
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function lawyerHome(status: ApplicationStatus | undefined | null): string {
  switch (status) {
    case 'approved':
      return '/lawyer/dashboard'
    case 'hold':
      return '/lawyer/status/hold'
    case 'rejected':
      return '/lawyer/status/rejected'
    default:
      return '/lawyer/status/pending'
  }
}

async function redirectToRoleHome(
  request: NextRequest,
  role: UserRole | undefined,
  userId: string,
  supabase: ReturnType<typeof createServerClient>,
) {
  const url = request.nextUrl.clone()

  if (role === 'lawyer') {
    const { data: lp } = await supabase
      .from('lawyer_profiles')
      .select('application_status')
      .eq('user_id', userId)
      .single()
    url.pathname = lawyerHome(lp?.application_status)
  } else {
    url.pathname = ROLE_HOME[role ?? 'civilian']
  }

  return NextResponse.redirect(url)
}

// ---------------------------------------------------------------------------
// Matcher config — skip Next.js internals and static assets.
// ---------------------------------------------------------------------------

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
