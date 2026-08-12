import 'server-only'
import { createAdminClient } from '@/lib/supabase/admin'

// All activity types tracked in Phase 1.
export type ActivityAction =
  | 'lawyer_registered'
  | 'profile_updated'
  | 'document_uploaded'
  | 'application_approved'
  | 'application_hold'
  | 'application_rejected'
  | 'moderator_created'
  | 'user_login'
  | 'password_reset'

interface LogActivityParams {
  actor: string | null
  target?: string | null
  action: ActivityAction
  metadata?: Record<string, unknown>
}

/**
 * Writes a record to the activity_logs table using the service-role client
 * so it is never blocked by RLS policies.
 *
 * Fire-and-forget — errors are swallowed to avoid blocking the main flow.
 * Use after() in Server Actions if you want true fire-and-forget semantics.
 */
export async function logActivity({
  actor,
  target = null,
  action,
  metadata = {},
}: LogActivityParams): Promise<void> {
  try {
    const supabase = createAdminClient()
    await supabase.from('activity_logs').insert({
      actor,
      target,
      action,
      metadata,
    })
  } catch (err) {
    // Log to server console but never surface to the caller.
    console.error('[activity-log] Failed to write activity log:', err)
  }
}
