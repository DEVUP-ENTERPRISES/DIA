'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormAlert } from '@/components/auth/FormAlert'
import { FieldError } from '@/components/auth/FieldError'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { saveLawyerProfile } from '@/features/lawyer/actions'
import type { ActionState } from '@/features/auth/actions'
import type { LawyerProfileRow } from '@/types/database'

const PRACTICE_AREAS = [
  'Criminal Law', 'Family Law', 'Corporate Law', 'Civil Rights',
  'Immigration', 'Real Estate', 'Employment Law', 'Tax Law',
  'Intellectual Property', 'Environmental Law', 'Other',
]
const LANGUAGES = [
  'English', 'French', 'Arabic', 'Spanish', 'Portuguese',
  'Swahili', 'Hausa', 'Yoruba', 'Igbo', 'Amharic', 'Other',
]

interface LawyerProfileFormProps {
  existing: LawyerProfileRow | null
  userEmail: string
}

const initialState: ActionState = {}

export function LawyerProfileForm({ existing, userEmail }: LawyerProfileFormProps) {
  const [state, formAction] = useActionState(saveLawyerProfile, initialState)

  return (
    <div className="space-y-6">
      <FormAlert error={state.error} success={state.success} />

      <form action={formAction} className="space-y-5" noValidate>
        {/* Personal */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-foreground border-b pb-2 w-full">
            Personal Information
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="full_name">Full name</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={existing?.id ? undefined : ''}
                placeholder="As on official documents"
                required
              />
              <FieldError errors={state.fieldErrors?.full_name} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                required
              />
              <FieldError errors={state.fieldErrors?.phone} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={state.fieldErrors?.gender} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" name="dob" type="date" required />
              <FieldError errors={state.fieldErrors?.dob} />
            </div>
          </div>
        </fieldset>

        {/* Location */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-foreground border-b pb-2 w-full">
            Location
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" placeholder="Country" required />
              <FieldError errors={state.fieldErrors?.country} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">State / Province</Label>
              <Input id="state" name="state" placeholder="State" required />
              <FieldError errors={state.fieldErrors?.state} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="City" required />
              <FieldError errors={state.fieldErrors?.city} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="address">Office address</Label>
              <Input id="address" name="address" placeholder="Street address" required />
              <FieldError errors={state.fieldErrors?.address} />
            </div>
          </div>
        </fieldset>

        {/* Professional */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-foreground border-b pb-2 w-full">
            Professional Details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="bar_council_number">Bar council number</Label>
              <Input
                id="bar_council_number"
                name="bar_council_number"
                placeholder="e.g. SCN/2023/0001"
                required
              />
              <FieldError errors={state.fieldErrors?.bar_council_number} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state_bar_council">State bar council</Label>
              <Input
                id="state_bar_council"
                name="state_bar_council"
                placeholder="e.g. Lagos State Bar"
                required
              />
              <FieldError errors={state.fieldErrors?.state_bar_council} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="years_of_experience">Years of experience</Label>
              <Input
                id="years_of_experience"
                name="years_of_experience"
                type="number"
                min={0}
                max={60}
                placeholder="0"
                required
              />
              <FieldError errors={state.fieldErrors?.years_of_experience} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qualification">Highest qualification</Label>
              <Input
                id="qualification"
                name="qualification"
                placeholder="e.g. LLB, BL"
                required
              />
              <FieldError errors={state.fieldErrors?.qualification} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="law_firm">Law firm (optional)</Label>
              <Input
                id="law_firm"
                name="law_firm"
                placeholder="Name of your firm"
              />
            </div>
          </div>

          {/* Practice areas — multi-select via checkboxes */}
          <div className="space-y-2">
            <Label>Practice areas</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRACTICE_AREAS.map((area) => (
                <label key={area} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="practice_areas"
                    value={area}
                    className="rounded border-input"
                  />
                  {area}
                </label>
              ))}
            </div>
            <FieldError errors={state.fieldErrors?.practice_areas} />
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label>Languages spoken</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <label key={lang} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="languages"
                    value={lang}
                    className="rounded border-input"
                  />
                  {lang}
                </label>
              ))}
            </div>
            <FieldError errors={state.fieldErrors?.languages} />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="bio">Professional bio</Label>
            <Textarea
              id="bio"
              name="bio"
              rows={5}
              placeholder="Describe your experience, specialisations, and approach (50–1000 characters)"
              required
            />
            <FieldError errors={state.fieldErrors?.bio} />
          </div>
        </fieldset>

        <SubmitButton className="w-full" pendingLabel="Saving profile…">
          Save and continue
        </SubmitButton>
      </form>
    </div>
  )
}
