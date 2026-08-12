'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormAlert } from '@/components/auth/FormAlert'
import { FieldError } from '@/components/auth/FieldError'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { resetPassword, type ActionState } from '@/features/auth/actions'

const initialState: ActionState = {}

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(resetPassword, initialState)

  return (
    <div className="space-y-4">
      <FormAlert error={state.error} />

      <form action={formAction} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
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
          <Label htmlFor="confirm_password">Confirm new password</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            required
          />
          <FieldError errors={state.fieldErrors?.confirm_password} />
        </div>

        <SubmitButton className="w-full" pendingLabel="Saving…">
          Save new password
        </SubmitButton>
      </form>
    </div>
  )
}
