'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormAlert } from '@/components/auth/FormAlert'
import { FieldError } from '@/components/auth/FieldError'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { lawyerSignup, type ActionState } from '@/features/auth/actions'
import { ShieldCheck } from 'lucide-react'

const initialState: ActionState = {}

export function LawyerSignupForm() {
  const [state, formAction] = useActionState(lawyerSignup, initialState)

  return (
    <div className="space-y-4">
      <FormAlert error={state.error} />

      {/* Notice: no Google login for lawyers */}
      <div className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
        <ShieldCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          aria-hidden="true"
        />
        <span>
          Lawyer accounts require email and password. Google sign-in is not
          available for lawyer registration.
        </span>
      </div>

      <form action={formAction} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Professional email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@lawfirm.com"
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
    </div>
  )
}
