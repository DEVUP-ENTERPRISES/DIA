// Mirrors the PostgreSQL enums defined in the Supabase schema.
// Never derive role from JWT claims alone — always validate server-side.

export type UserRole = 'admin' | 'moderator' | 'lawyer' | 'civilian'

export type ApplicationStatus = 'pending' | 'approved' | 'hold' | 'rejected'

export type GenderType =
  | 'male'
  | 'female'
  | 'other'
  | 'prefer_not_to_say'

export type DocumentType =
  | 'bar_certificate'
  | 'government_id'
  | 'enrollment_certificate'
  | 'profile_photo'
  | 'other'

// Shape of the session stored in Supabase Auth + our profiles table.
export interface UserSession {
  id: string
  email: string
  role: UserRole
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  is_active: boolean
  email_verified: boolean
}

// Lawyer-specific status, read alongside the profile.
export interface LawyerStatus {
  application_status: ApplicationStatus
  profile_complete: boolean
  documents_uploaded: boolean
}
