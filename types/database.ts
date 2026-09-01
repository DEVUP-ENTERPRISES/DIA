import type {
  UserRole,
  ApplicationStatus,
  GenderType,
  DocumentType,
} from './auth'

// ---------------------------------------------------------------------------
// Row types - mirror the Supabase schema exactly.
// Use these for typed query results; never mutate them directly.
// ---------------------------------------------------------------------------

export interface ProfileRow {
  id: string
  email: string
  role: UserRole
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  purpose: string | null
  is_active: boolean
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface LawyerProfileRow {
  id: string
  user_id: string
  gender: GenderType | null
  dob: string | null
  country: string | null
  state: string | null
  city: string | null
  address: string | null
  bar_council_number: string | null
  state_bar_council: string | null
  years_of_experience: number | null
  law_firm: string | null
  bio: string | null
  qualification: string | null
  languages: string[] | null
  practice_areas: string[] | null
  application_status: ApplicationStatus
  application_submitted_at: string
  reviewed_by: string | null
  reviewed_at: string | null
  review_notes: string | null
  created_at: string
  updated_at: string
}

export interface LawyerDocumentRow {
  id: string
  lawyer_id: string
  document_type: DocumentType | null
  file_name: string | null
  file_url: string | null
  uploaded_at: string
}

export interface ModeratorProfileRow {
  id: string
  user_id: string
  created_by: string | null
  created_at: string
}

export interface AdminProfileRow {
  id: string
  user_id: string
  created_at: string
}

export interface ActivityLogRow {
  id: string
  actor: string | null
  target: string | null
  action: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface CountryRow {
  code: string
  name: string
  dial_code: string
  sort_order: number
}

// ---------------------------------------------------------------------------
// Insert types - used when writing to the database.
// ---------------------------------------------------------------------------

export type ProfileInsert = Omit<ProfileRow, 'created_at' | 'updated_at'>

export type LawyerProfileInsert = Omit<
  LawyerProfileRow,
  'id' | 'created_at' | 'updated_at' | 'application_submitted_at'
>

export type LawyerDocumentInsert = Omit<LawyerDocumentRow, 'id' | 'uploaded_at'>

export type ActivityLogInsert = Omit<ActivityLogRow, 'id' | 'created_at'>
