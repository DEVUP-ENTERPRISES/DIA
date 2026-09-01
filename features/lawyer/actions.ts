'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { createClient } from '@/lib/supabase/server'
import { uploadLawyerDocument } from '@/lib/storage'
import { logActivity } from '@/lib/activity-log'
import { sendLawyerApplicationReceivedEmail } from '@/lib/email'
import { lawyerProfileSchema } from './schemas'
import type { ActionState } from '@/features/auth/actions'
import type { DocumentType } from '@/types/auth'

// ---------------------------------------------------------------------------
// Save / update lawyer professional profile
// ---------------------------------------------------------------------------

export async function saveLawyerProfile(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getServerSession()
  if (!session || session.role !== 'lawyer') {
    return { error: 'Unauthorised.' }
  }

  // Multi-value fields come through as multiple entries with the same key.
  const rawPracticeAreas = formData.getAll('practice_areas') as string[]
  const rawLanguages = formData.getAll('languages') as string[]

  const parsed = lawyerProfileSchema.safeParse({
    full_name: formData.get('full_name'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    dob: formData.get('dob'),
    country: formData.get('country'),
    state: formData.get('state'),
    city: formData.get('city'),
    address: formData.get('address'),
    bar_council_number: formData.get('bar_council_number'),
    state_bar_council: formData.get('state_bar_council'),
    years_of_experience: Number(formData.get('years_of_experience')),
    qualification: formData.get('qualification'),
    practice_areas: rawPracticeAreas,
    languages: rawLanguages,
    law_firm: formData.get('law_firm') || undefined,
    bio: formData.get('bio'),
  })

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const supabase = await createClient()

  // Update profile full_name + phone in profiles table.
  await supabase
    .from('profiles')
    .update({ full_name: parsed.data.full_name, phone: parsed.data.phone })
    .eq('id', session.id)

  // Upsert the lawyer_profiles row.
  const { error } = await supabase
    .from('lawyer_profiles')
    .upsert(
      {
        user_id: session.id,
        gender: parsed.data.gender,
        dob: parsed.data.dob,
        country: parsed.data.country,
        state: parsed.data.state,
        city: parsed.data.city,
        address: parsed.data.address,
        bar_council_number: parsed.data.bar_council_number,
        state_bar_council: parsed.data.state_bar_council,
        years_of_experience: parsed.data.years_of_experience,
        qualification: parsed.data.qualification,
        practice_areas: parsed.data.practice_areas,
        languages: parsed.data.languages,
        law_firm: parsed.data.law_firm ?? null,
        bio: parsed.data.bio,
      },
      { onConflict: 'user_id' },
    )

  if (error) {
    if (error.message.includes('bar_council_number')) {
      return { error: 'This Bar Council number is already registered.' }
    }
    return { error: error.message }
  }

  logActivity({
    actor: session.id,
    action: 'profile_updated',
    metadata: { role: 'lawyer' },
  })

  // Continue to the documents step of onboarding.
  redirect('/onboarding?step=documents')
}

// ---------------------------------------------------------------------------
// Upload lawyer documents
// ---------------------------------------------------------------------------

const DOCUMENT_FIELDS: DocumentType[] = [
  'bar_certificate',
  'government_id',
  'enrollment_certificate',
  'profile_photo',
]

export async function uploadLawyerDocuments(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getServerSession()
  if (!session || session.role !== 'lawyer') {
    return { error: 'Unauthorised.' }
  }

  // Get the lawyer_profiles row to find its id.
  const supabase = await createClient()
  const { data: lp, error: lpError } = await supabase
    .from('lawyer_profiles')
    .select('id')
    .eq('user_id', session.id)
    .single()

  if (lpError || !lp) {
    return { error: 'Please complete your professional profile first.' }
  }

  const errors: string[] = []

  for (const docType of DOCUMENT_FIELDS) {
    const file = formData.get(docType)
    if (!(file instanceof File) || file.size === 0) {
      errors.push(`${docType.replace(/_/g, ' ')} is required.`)
      continue
    }

    try {
      const storagePath = await uploadLawyerDocument(session.id, docType, file)

      // Upsert the document record - overwrite if previously uploaded.
      await supabase.from('lawyer_documents').upsert(
        {
          lawyer_id: lp.id,
          document_type: docType,
          file_name: file.name,
          file_url: storagePath,
        },
        { onConflict: 'lawyer_id,document_type' },
      )

      logActivity({
        actor: session.id,
        action: 'document_uploaded',
        metadata: { document_type: docType },
      })
    } catch (err) {
      errors.push(
        err instanceof Error
          ? err.message
          : `Failed to upload ${docType}.`,
      )
    }
  }

  if (errors.length > 0) {
    return { error: errors.join(' ') }
  }

  // Application is now complete and pending review. Notify the lawyer.
  // (Email is a stub until a real provider is wired up - see lib/email.ts.)
  await sendLawyerApplicationReceivedEmail(session.email, session.full_name)

  redirect('/lawyer/status/pending')
}
