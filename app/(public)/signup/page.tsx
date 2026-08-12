import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Users } from 'lucide-react'

export const metadata: Metadata = { title: 'Create an Account' }

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Join DIA</h1>
          <p className="text-sm text-muted-foreground">
            Choose how you&apos;d like to get started
          </p>
        </div>

        <div className="grid gap-4">
          {/* Civilian card */}
          <Link href="/signup/civilian" className="group block">
            <div className="rounded-xl border bg-background p-6 transition-all hover:border-primary hover:shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 mt-0.5">
                  <Users
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    I need legal help
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sign up as a citizen. Instant access — no approval needed.
                    Use email or Google.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Lawyer card */}
          <Link href="/signup/lawyer" className="group block">
            <div className="rounded-xl border bg-background p-6 transition-all hover:border-primary hover:shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 mt-0.5">
                  <Scale
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    I am a lawyer
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Apply to join as a verified legal professional. Requires
                    profile completion and document upload.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
