'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { FormAlert } from '@/components/auth/FormAlert'
import { FieldError } from '@/components/auth/FieldError'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { OAuthButton } from '@/components/auth/OAuthButton'
import { login, type ActionState } from '@/features/auth/actions'

const initialState: ActionState = {}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState)

  return (
    <div className="space-y-4">
      <FormAlert error={state.error} />

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
            aria-describedby="email-error"
          />
          <FieldError errors={state.fieldErrors?.email} />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            aria-describedby="password-error"
          />
          <FieldError errors={state.fieldErrors?.password} />
        </div>

        <SubmitButton className="w-full" pendingLabel="Signing in…">
          Sign in
        </SubmitButton>
      </form>

      {/* Google OAuth - civilian path only */}
      <div className="relative">
        <Separator />
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            or
          </span>
        </span>
      </div>

      <OAuthButton />

      <p className="text-center text-xs text-muted-foreground">
        Are you a lawyer?{' '}
        <Link
          href="/signup?role=lawyer"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Apply here
        </Link>
      </p>
    </div>
  )
}
