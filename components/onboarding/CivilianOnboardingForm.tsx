'use client'

import { useActionState, useState } from 'react'
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
import { saveCivilianOnboarding } from '@/features/civilian/actions'
import { CIVILIAN_PURPOSES } from '@/features/civilian/schemas'
import { PhoneField } from '@/components/onboarding/PhoneField'
import type { ActionState } from '@/features/auth/actions'
import type { CountryRow } from '@/types/database'

const initialState: ActionState = {}

interface CivilianOnboardingFormProps {
  countries: CountryRow[]
  defaultName?: string | null
}

export function CivilianOnboardingForm({
  countries,
  defaultName,
}: CivilianOnboardingFormProps) {
  const [state, formAction] = useActionState(
    saveCivilianOnboarding,
    initialState,
  )
  const [purpose, setPurpose] = useState<string>('')

  return (
    <div className="space-y-6">
      <FormAlert error={state.error} />

      <form action={formAction} className="space-y-5" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Your name</Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={defaultName ?? ''}
            placeholder="How should we address you?"
            autoComplete="name"
            required
          />
          <FieldError errors={state.fieldErrors?.full_name} />
        </div>

        <PhoneField
          countries={countries}
          errors={state.fieldErrors?.phone}
          required
        />

        <div className="space-y-1.5">
          <Label htmlFor="purpose">What brings you to DIA?</Label>
          {/* Hidden field carries the Select value into the form submission. */}
          <input type="hidden" name="purpose" value={purpose} />
          <Select
            value={purpose}
            onValueChange={(value) => setPurpose(value ?? '')}
          >
            <SelectTrigger id="purpose">
              <SelectValue placeholder="Choose the closest fit" />
            </SelectTrigger>
            <SelectContent>
              {CIVILIAN_PURPOSES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.fieldErrors?.purpose} />
        </div>

        {purpose === 'Other' && (
          <div className="space-y-1.5">
            <Label htmlFor="purpose_detail">Tell us a little more</Label>
            <Textarea
              id="purpose_detail"
              name="purpose_detail"
              rows={3}
              placeholder="Briefly describe what you need help with."
            />
            <FieldError errors={state.fieldErrors?.purpose_detail} />
          </div>
        )}

        <SubmitButton className="w-full" pendingLabel="Saving…">
          Continue to dashboard
        </SubmitButton>
      </form>
    </div>
  )
}
