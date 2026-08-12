import type { Metadata } from 'next'
import Link from 'next/link'
import { LawyerSignupForm } from './LawyerSignupForm'

export const metadata: Metadata = { title: 'Apply as a Lawyer' }

export default function LawyerSignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Apply as a lawyer
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account, then complete your professional profile and
            upload your credentials for review.
          </p>
        </div>

        <LawyerSignupForm />

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
          Not a lawyer?{' '}
          <Link
            href="/signup/civilian"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign up as a citizen
          </Link>
        </p>
      </div>
    </div>
  )
}
