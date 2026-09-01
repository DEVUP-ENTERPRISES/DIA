// Zod-inferred form types, re-exported for use in components.
// Schema definitions live in the individual feature action files
// and are re-exported here for components that need the types only.

export type {
  LoginFormValues,
  SignupFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from '@/features/auth/schemas'
export type { LawyerProfileFormValues } from '@/features/lawyer/schemas'
export type { DocumentUploadFormValues } from '@/features/lawyer/schemas'
export type { CivilianOnboardingValues } from '@/features/civilian/schemas'
export type { CreateModeratorFormValues } from '@/features/admin/schemas'
