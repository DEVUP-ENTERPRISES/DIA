import { z } from 'zod'

const PRACTICE_AREAS = [
  'Criminal Law',
  'Family Law',
  'Corporate Law',
  'Civil Rights',
  'Immigration',
  'Real Estate',
  'Employment Law',
  'Tax Law',
  'Intellectual Property',
  'Environmental Law',
  'Other',
] as const

const LANGUAGES = [
  'English',
  'French',
  'Arabic',
  'Spanish',
  'Portuguese',
  'Swahili',
  'Hausa',
  'Yoruba',
  'Igbo',
  'Amharic',
  'Other',
] as const

// ---------------------------------------------------------------------------
// Lawyer professional profile form
// ---------------------------------------------------------------------------

export const lawyerProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters.')
    .trim(),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number.')
    .trim(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    error: 'Please select a gender.',
  }),
  dob: z
    .string()
    .refine((v) => !isNaN(Date.parse(v)), { message: 'Invalid date of birth.' }),
  country: z.string().min(2, 'Country is required.').trim(),
  state: z.string().min(2, 'State is required.').trim(),
  city: z.string().min(2, 'City is required.').trim(),
  address: z.string().min(5, 'Address is required.').trim(),
  bar_council_number: z
    .string()
    .min(3, 'Bar council number is required.')
    .trim(),
  state_bar_council: z
    .string()
    .min(2, 'State bar council is required.')
    .trim(),
  years_of_experience: z
    .number({ error: 'Years of experience must be a number.' })
    .int()
    .min(0, 'Cannot be negative.')
    .max(60, 'Please enter a realistic value.'),
  qualification: z.string().min(2, 'Qualification is required.').trim(),
  practice_areas: z
    .array(z.enum(PRACTICE_AREAS))
    .min(1, 'Select at least one practice area.'),
  languages: z
    .array(z.enum(LANGUAGES))
    .min(1, 'Select at least one language.'),
  law_firm: z.string().trim().optional(),
  bio: z
    .string()
    .min(50, 'Bio must be at least 50 characters.')
    .max(1000, 'Bio must be 1000 characters or fewer.')
    .trim(),
})

export type LawyerProfileFormValues = z.infer<typeof lawyerProfileSchema>

// ---------------------------------------------------------------------------
// Document upload form
// ---------------------------------------------------------------------------

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg']

const fileSchema = z
  .instanceof(File, { message: 'Please select a file.' })
  .refine((f) => f.size <= MAX_FILE_SIZE, 'File must be 10 MB or smaller.')
  .refine(
    (f) => ALLOWED_TYPES.includes(f.type),
    'Only PDF, PNG, and JPEG files are accepted.',
  )

export const documentUploadSchema = z.object({
  bar_certificate: fileSchema,
  government_id: fileSchema,
  enrollment_certificate: fileSchema,
  profile_photo: fileSchema,
})

export type DocumentUploadFormValues = z.infer<typeof documentUploadSchema>
