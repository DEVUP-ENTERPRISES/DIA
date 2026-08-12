import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { getSignedUrl } from '@/lib/storage'
import type { LawyerProfileRow, LawyerDocumentRow } from '@/types/database'

/** Returns the lawyer_profile row for the current authenticated user. */
export async function getLawyerProfile(
  userId: string,
): Promise<LawyerProfileRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lawyer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data as LawyerProfileRow
}

/** Returns the documents for a lawyer_profile row by its id. */
export async function getLawyerDocuments(
  lawyerProfileId: string,
): Promise<LawyerDocumentRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lawyer_documents')
    .select('*')
    .eq('lawyer_id', lawyerProfileId)

  if (error || !data) return []
  return data as LawyerDocumentRow[]
}

/**
 * Returns documents with signed URLs for the current lawyer.
 * Admin client is used to bypass RLS — the signed URL is ephemeral (1 hour).
 */
export async function getLawyerDocumentsWithUrls(lawyerProfileId: string) {
  const docs = await getLawyerDocuments(lawyerProfileId)
  return Promise.all(
    docs.map(async (doc) => ({
      ...doc,
      signed_url: doc.file_url ? await getSignedUrl(doc.file_url) : null,
    })),
  )
}

/**
 * Returns all lawyer profiles for admin/moderator review.
 * The RLS policy "Admin and moderator can view all lawyer profiles" covers this.
 */
export async function getAllLawyerProfilesForReview() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lawyer_profiles')
    .select(
      `
      id,
      user_id,
      application_status,
      application_submitted_at,
      review_notes,
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

/** Fetch a single lawyer profile by lawyer_profiles.id (for review page). */
export async function getLawyerProfileById(lawyerProfileId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lawyer_profiles')
    .select(
      `
      *,
      profiles!lawyer_profiles_user_id_fkey (
        full_name,
        email,
        phone,
        avatar_url
      )
    `,
    )
    .eq('id', lawyerProfileId)
    .single()

  if (error || !data) return null
  return data
}
