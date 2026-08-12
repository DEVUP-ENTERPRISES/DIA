'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { createClient } from '@/lib/supabase/server'
import { logActivity } from '@/lib/activity-log'
import { reviewApplicationSchema } from '@/features/admin/schemas'
import type { ActionState } from '@/features/auth/actions'
import type { ActivityAction } from '@/lib/activity-log'

// ---------------------------------------------------------------------------
// Review a lawyer application (approve / hold / reject)
// Shared by both moderator and admin — authorisation checked here.
// ---------------------------------------------------------------------------

export async function reviewApplication(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getServerSession()

  if (!session || (session.role !== 'moderator' && session.role !== 'admin')) {
    return { error: 'Unauthorised.' }
  }

  const parsed = reviewApplicationSchema.safeParse({
    lawyer_profile_id: formData.get('lawyer_profile_id'),
    action: formData.get('action'),
    review_notes: formData.get('review_notes') || undefined,
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { lawyer_profile_id, action, review_notes } = parsed.data
  const supabase = await createClient()

  // Fetch the target profile to resolve the user_id for activity logging.
  const { data: lp, error: fetchError } = await supabase
    .from('lawyer_profiles')
    .select('id, user_id')
    .eq('id', lawyer_profile_id)
    .single()

  if (fetchError || !lp) {
    return { error: 'Lawyer profile not found.' }
  }

  const { error: updateError } = await supabase
    .from('lawyer_profiles')
    .update({
      application_status: action,
      reviewed_by: session.id,
      reviewed_at: new Date().toISOString(),
      review_notes: review_notes ?? null,
    })
    .eq('id', lawyer_profile_id)

  if (updateError) {
    return { error: updateError.message }
  }

  const activityMap: Record<string, ActivityAction> = {
    approved: 'application_approved',
    hold: 'application_hold',
    rejected: 'application_rejected',
  }

  logActivity({
    actor: session.id,
    target: lp.user_id,
    action: activityMap[action] ?? 'application_approved',
    metadata: { review_notes, reviewer_role: session.role },
  })

  // Redirect back to the applications list.
  if (session.role === 'admin') {
    redirect('/admin/lawyers')
  }
  redirect('/moderator/lawyers')
}
