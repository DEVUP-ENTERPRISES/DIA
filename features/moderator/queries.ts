import 'server-only'
import { createClient } from '@/lib/supabase/server'

/** Lawyer applications pending review — for moderator list page. */
export async function getPendingApplications() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lawyer_profiles')
    .select(
      `
      id,
      application_status,
      application_submitted_at,
      profiles!lawyer_profiles_user_id_fkey (
        full_name,
        email
      )
    `,
    )
    .eq('application_status', 'pending')
    .order('application_submitted_at', { ascending: true })

  if (error || !data) return []
  return data
}

/** Recently reviewed applications (approved / hold / rejected). */
export async function getRecentlyReviewed(limit = 10) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lawyer_profiles')
    .select(
      `
      id,
      application_status,
      reviewed_at,
      profiles!lawyer_profiles_user_id_fkey (
        full_name,
        email
      )
    `,
    )
    .in('application_status', ['approved', 'hold', 'rejected'])
    .order('reviewed_at', { ascending: false })
    .limit(limit)

  if (error || !data) return []
  return data
}
