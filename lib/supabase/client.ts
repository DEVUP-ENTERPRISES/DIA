import { createBrowserClient } from '@supabase/ssr'

/**
 * Resolves the base URL the browser client should talk to.
 *
 * In the browser we use a same-origin reverse proxy (`/sb`, configured as a
 * rewrite in next.config.ts) so network logs show our own domain instead of
 * *.supabase.co. During SSR (`window` undefined) or if the proxy isn't
 * configured we fall back to the direct Supabase URL.
 *
 * Note: this is obfuscation only. The anon key is public by design and RLS is
 * the real security boundary.
 */
function getBrowserSupabaseUrl(): string {
  const direct = process.env.NEXT_PUBLIC_SUPABASE_URL!

  if (typeof window === 'undefined') return direct

  // Opt-out escape hatch if the proxy ever needs to be disabled.
  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE_PROXY === 'true') return direct

  return `${window.location.origin}/sb`
}

/**
 * Browser-side Supabase client.
 * Safe to call multiple times - @supabase/ssr returns a singleton per tab.
 * Use only in Client Components or client-side hooks.
 */
export function createClient() {
  return createBrowserClient(
    getBrowserSupabaseUrl(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
