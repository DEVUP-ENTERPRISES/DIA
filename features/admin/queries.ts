import 'server-only'
import { createClient } from '@/lib/supabase/server'

/** All users across all roles - for admin users page. */
export async function getAllUsers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role, full_name, is_active, created_at')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

/** All lawyer applications regardless of status - for admin lawyers page. */
export async function getAllLawyerApplications() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lawyer_profiles')
    .select(
      `
      id,
      application_status,
      application_submitted_at,
      reviewed_at,
      profiles!lawyer_profiles_user_id_fkey (
        full_name,
        email
      )
    `,
    )
    .order('application_submitted_at', { ascending: false })

  if (error || !data) return []
  return data
}

/** Dashboard stat counts. */
export async function getAdminDashboardStats() {
  const supabase = await createClient()

  const [lawyersRes, pendingRes, approvedRes, moderatorsRes] = await Promise.all([
    supabase
      .from('lawyer_profiles')
      .select('id', { count: 'exact', head: true }),
    supabase
      .from('lawyer_profiles')
      .select('id', { count: 'exact', head: true })
      .eq('application_status', 'pending'),
    supabase
      .from('lawyer_profiles')
      .select('id', { count: 'exact', head: true })
      .eq('application_status', 'approved'),
    supabase
      .from('moderator_profiles')
      .select('id', { count: 'exact', head: true }),
  ])

  return {
    totalLawyers: lawyersRes.count ?? 0,
    pendingApplications: pendingRes.count ?? 0,
    approvedLawyers: approvedRes.count ?? 0,
    moderators: moderatorsRes.count ?? 0,
  }
}

/** All moderator profiles. */
export async function getAllModerators() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('moderator_profiles')
    .select(
      `
      id,
      created_at,
      profiles!moderator_profiles_user_id_fkey (
        full_name,
        email,
        is_active
      )
    `,
    )
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}
