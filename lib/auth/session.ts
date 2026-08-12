import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { UserSession } from '@/types/auth'

/**
 * Returns the current authenticated user with their profile data.
 * Validates via supabase.auth.getUser() (network round-trip) to prevent
 * trusting a tampered JWT. Returns null if unauthenticated.
 *
 * Call this at the top of Server Actions and layouts that gate on auth.
 */
export async function getServerSession(): Promise<UserSession | null> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) return null

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(
      'id, email, role, full_name, phone, avatar_url, is_active, email_verified',
    )
    .eq('id', user.id)
    .single()

  if (profileError || !profile) return null

  // Inactive accounts are treated as unauthenticated.
  if (!profile.is_active) return null

  return profile as UserSession
}

/**
 * Returns the lawyer application status for the current user.
 * Returns null if the user is not a lawyer or has no lawyer_profile row yet.
 */
export async function getLawyerApplicationStatus(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lawyer_profiles')
    .select('application_status, bar_council_number, bio')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null

  return {
    application_status: data.application_status,
    // A profile is considered "complete" when at minimum bio and bar number are set.
    profile_complete: !!(data.bar_council_number && data.bio),
  }
}
