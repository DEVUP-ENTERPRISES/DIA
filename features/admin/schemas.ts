import { z } from 'zod'

// ---------------------------------------------------------------------------
// Create moderator form (admin only)
// ---------------------------------------------------------------------------

export const createModeratorSchema = z
  .object({
    full_name: z
      .string()
      .min(2, 'Full name must be at least 2 characters.')
      .trim(),
    email: z
      .string()
      .email('Please enter a valid email address.')
      .trim(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
      .regex(/[0-9]/, 'Password must contain at least one number.'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match.',
    path: ['confirm_password'],
  })

export type CreateModeratorFormValues = z.infer<typeof createModeratorSchema>

// ---------------------------------------------------------------------------
// Lawyer review action form (approve / hold / reject + notes)
// ---------------------------------------------------------------------------

export const reviewApplicationSchema = z.object({
  lawyer_profile_id: z.string().uuid(),
  action: z.enum(['approved', 'hold', 'rejected']),
  review_notes: z.string().trim().optional(),
})

export type ReviewApplicationFormValues = z.infer<typeof reviewApplicationSchema>
