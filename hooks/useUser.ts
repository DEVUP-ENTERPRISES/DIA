'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { UserSession } from '@/types/auth'

/**
 * Client-side hook that returns the current user's session profile.
 * Subscribes to Supabase auth state changes so it stays in sync.
 *
 * For most data-fetching use cases prefer reading session in Server Components.
 * Use this hook only in Client Components that genuinely need reactive auth state.
 */
export function useUser() {
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function fetchProfile(userId: string) {
      const { data } = await supabase
        .from('profiles')
        .select('id, email, role, full_name, phone, avatar_url, is_active, email_verified')
        .eq('id', userId)
        .single()
      setUser(data as UserSession | null)
    }

    // Get initial session.
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        fetchProfile(authUser.id).finally(() => setLoading(false))
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    // Subscribe to future auth events (sign in / sign out).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
