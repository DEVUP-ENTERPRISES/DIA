'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { FormAlert } from '@/components/auth/FormAlert'
import { FieldError } from '@/components/auth/FieldError'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { OAuthButton } from '@/components/auth/OAuthButton'
import { signup, type ActionState } from '@/features/auth/actions'

const initialState: ActionState = {}

interface SignupFormProps {
  role: 'civilian' | 'lawyer'
}

/**
 * Shared signup form for both roles. The role is submitted via a hidden field
 * and also used to label the Google button so OAuth signups get the right role.
 */
export function SignupForm({ role }: SignupFormProps) {
  const [state, formAction] = useActionState(signup, initialState)

  return (
    <div className="space-y-4">
      <FormAlert error={state.error} />

      <form action={formAction} className="space-y-4" noValidate>
        <input type="hidden" name="role" value={role} />

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={role === 'lawyer' ? 'you@lawfirm.com' : 'you@example.com'}
            required
          />
          <FieldError errors={state.fieldErrors?.email} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
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
            placeholder="Repeat your password"
            required
          />
          <FieldError errors={state.fieldErrors?.confirm_password} />
        </div>

        <SubmitButton className="w-full" pendingLabel="Creating account…">
          Create account
        </SubmitButton>
      </form>

      <div className="relative">
        <Separator />
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <span className="bg-card px-2 text-xs text-muted-foreground">or</span>
        </span>
      </div>

      <OAuthButton role={role} />
    </div>
  )
}
