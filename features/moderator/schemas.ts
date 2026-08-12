// Moderator feature schemas.
// The review action schema is defined in features/admin/schemas.ts
// (shared by both admin and moderator) and re-exported here so the
// moderator feature has a consistent schema file like every other feature.

export {
  reviewApplicationSchema,
  type ReviewApplicationFormValues,
} from '@/features/admin/schemas'
