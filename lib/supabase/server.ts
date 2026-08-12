import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Server-side Supabase client.
 * Must be called inside a Server Component, Server Action, or Route Handler
 * where the Next.js 16 async cookies() API is available.
 *
 * Uses the anon key + RLS. For privileged operations use lib/supabase/admin.ts.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // setAll is called from a Server Component where cookies cannot be
            // mutated. The middleware handles session refresh in that case.
          }
        },
      },
    },
  )
}
