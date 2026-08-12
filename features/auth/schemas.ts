import { z } from 'zod'

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.').trim(),
  password: z.string().min(1, 'Password is required.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// ---------------------------------------------------------------------------
// Civilian signup
// ---------------------------------------------------------------------------

export const civilianSignupSchema = z
  .object({
    email: z.string().email('Please enter a valid email address.').trim(),
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

export type CivilianSignupFormValues = z.infer<typeof civilianSignupSchema>

// ---------------------------------------------------------------------------
// Lawyer signup
// ---------------------------------------------------------------------------

export const lawyerSignupSchema = z
  .object({
    email: z.string().email('Please enter a valid email address.').trim(),
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

export type LawyerSignupFormValues = z.infer<typeof lawyerSignupSchema>

// ---------------------------------------------------------------------------
// Forgot password
// ---------------------------------------------------------------------------

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.').trim(),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

// ---------------------------------------------------------------------------
// Reset password
// ---------------------------------------------------------------------------

export const resetPasswordSchema = z
  .object({
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

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
