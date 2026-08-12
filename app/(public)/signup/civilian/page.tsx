import type { Metadata } from 'next'
import Link from 'next/link'
import { CivilianSignupForm } from './CivilianSignupForm'

export const metadata: Metadata = { title: 'Sign Up — Civilian' }

export default function CivilianSignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
          <p className="text-sm text-muted-foreground">
            Get instant access to legal resources
          </p>
        </div>

        <CivilianSignupForm />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Are you a lawyer?{' '}
          <Link
            href="/signup/lawyer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Apply here
          </Link>
        </p>
      </div>
    </div>
  )
}
