'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { createAdminClient } from '@/lib/supabase/admin'
import { logActivity } from '@/lib/activity-log'
import { createModeratorSchema } from './schemas'
import type { ActionState } from '@/features/auth/actions'

// ---------------------------------------------------------------------------
// Create a moderator account (admin only)
// ---------------------------------------------------------------------------

export async function createModerator(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getServerSession()

  if (!session || session.role !== 'admin') {
    return { error: 'Unauthorised.' }
  }

  const parsed = createModeratorSchema.safeParse({
    full_name: formData.get('full_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = createAdminClient()

  // Create the auth user via the admin API (bypasses email confirmation).
  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      email_confirm: true, // skip email verification for admin-created accounts
      user_metadata: {
        role: 'moderator',
        full_name: parsed.data.full_name,
      },
    })

  if (authError || !authData.user) {
    if (authError?.message?.toLowerCase().includes('already registered')) {
      return { error: 'An account with this email already exists.' }
    }
    return { error: authError?.message ?? 'Failed to create account.' }
  }

  const userId = authData.user.id

  // Ensure the profiles row has the correct role and full_name.
  // The handle_new_user trigger will have already inserted a row —
  // update it to be safe.
  await supabase
    .from('profiles')
    .update({ role: 'moderator', full_name: parsed.data.full_name })
    .eq('id', userId)

  // Insert moderator_profiles row.
  const { error: mpError } = await supabase.from('moderator_profiles').insert({
    user_id: userId,
    created_by: session.id,
  })

  if (mpError) {
    return { error: mpError.message }
  }

  logActivity({
    actor: session.id,
    target: userId,
    action: 'moderator_created',
    metadata: { email: parsed.data.email, full_name: parsed.data.full_name },
  })

  redirect('/admin/moderators')
}
