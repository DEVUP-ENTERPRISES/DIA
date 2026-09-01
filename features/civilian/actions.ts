'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { createClient } from '@/lib/supabase/server'
import { civilianOnboardingSchema } from './schemas'
import type { ActionState } from '@/features/auth/actions'

// ---------------------------------------------------------------------------
// Civilian onboarding - name + purpose
// ---------------------------------------------------------------------------

export async function saveCivilianOnboarding(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getServerSession()
  if (!session || session.role !== 'civilian') {
    return { error: 'Unauthorised.' }
  }

  const parsed = civilianOnboardingSchema.safeParse({
    full_name: formData.get('full_name'),
    phone: formData.get('phone'),
    purpose: formData.get('purpose'),
    purpose_detail: formData.get('purpose_detail') || undefined,
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  // Store the chosen purpose; for 'Other', keep the free-text detail instead.
  const purpose =
    parsed.data.purpose === 'Other' && parsed.data.purpose_detail
      ? parsed.data.purpose_detail
      : parsed.data.purpose

  const supabase = await createClient()
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      purpose,
    })
    .eq('id', session.id)

  if (error) {
    return { error: 'Could not save your details. Please try again.' }
  }

  redirect('/dashboard')
}
