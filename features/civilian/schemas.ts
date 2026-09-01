import { z } from 'zod'

// Reasons a civilian might be using DIA. 'Other' lets them describe freely.
export const CIVILIAN_PURPOSES = [
  'Family & domestic matters',
  "Women's safety & protection",
  'Workplace & employment',
  'Housing & tenancy',
  'Civil rights & discrimination',
  'Documents & records',
  'General legal guidance',
  'Other',
] as const

export const civilianOnboardingSchema = z
  .object({
    full_name: z
      .string()
      .min(2, 'Please enter your name (at least 2 characters).')
      .trim(),
    phone: z
      .string()
      .min(7, 'Please enter a valid phone number.')
      .trim(),
    purpose: z.enum(CIVILIAN_PURPOSES, {
      error: 'Please tell us what brings you to DIA.',
    }),
    // Optional free-text detail, required only when purpose is 'Other'.
    purpose_detail: z
      .string()
      .trim()
      .max(300, 'Please keep this under 300 characters.')
      .optional(),
  })
  .refine(
    (data) =>
      data.purpose !== 'Other' ||
      (data.purpose_detail && data.purpose_detail.length >= 3),
    {
      message: 'Please describe what you need help with.',
      path: ['purpose_detail'],
    },
  )

export type CivilianOnboardingValues = z.infer<typeof civilianOnboardingSchema>
