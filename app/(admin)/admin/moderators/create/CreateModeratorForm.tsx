'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormAlert } from '@/components/auth/FormAlert'
import { FieldError } from '@/components/auth/FieldError'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { createModerator } from '@/features/admin/actions'
import type { ActionState } from '@/features/auth/actions'

const initialState: ActionState = {}

export function CreateModeratorForm() {
  const [state, formAction] = useActionState(createModerator, initialState)

  return (
    <div className="space-y-4">
      <FormAlert error={state.error} success={state.success} />

      <form action={formAction} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Jane Smith"
            required
          />
          <FieldError errors={state.fieldErrors?.full_name} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            placeholder="moderator@example.com"
            required
          />
          <FieldError errors={state.fieldErrors?.email} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Temporary password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            required
          />
          <FieldError errors={state.fieldErrors?.password} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm_password">Confirm password</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            required
          />
          <FieldError errors={state.fieldErrors?.confirm_password} />
        </div>

        <SubmitButton className="w-full" pendingLabel="Creating account…">
          Create moderator
        </SubmitButton>
      </form>
    </div>
  )
}
