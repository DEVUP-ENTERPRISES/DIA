import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client.
 * Bypasses RLS - use ONLY in Server Actions / Route Handlers for operations
 * that legitimately require elevated access (e.g., creating a moderator,
 * reading all lawyer profiles for admin review, writing activity logs).
 *
 * NEVER import this in Client Components or expose to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.',
    )
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
