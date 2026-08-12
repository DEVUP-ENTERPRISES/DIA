'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormAlert } from '@/components/auth/FormAlert'
import { FieldError } from '@/components/auth/FieldError'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { forgotPassword, type ActionState } from '@/features/auth/actions'

const initialState: ActionState = {}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(forgotPassword, initialState)

  return (
    <div className="space-y-4">
      <FormAlert error={state.error} success={state.success} />

      {!state.success && (
        <form action={formAction} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            <FieldError errors={state.fieldErrors?.email} />
          </div>

          <SubmitButton className="w-full" pendingLabel="Sending…">
            Send reset link
          </SubmitButton>
        </form>
      )}
    </div>
  )
}
