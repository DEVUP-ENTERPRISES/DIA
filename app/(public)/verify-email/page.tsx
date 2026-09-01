import type { Metadata } from 'next'
import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Verify Your Email' }

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-2xl bg-primary/10 p-5">
            <MailCheck
              className="h-10 w-10 text-primary"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Check your email
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent a verification link to your email address. Click the link
            to verify your account and continue.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground space-y-1 text-left">
          <p className="font-medium text-foreground">Didn&apos;t get an email?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check your spam or junk folder.</li>
            <li>Make sure you entered the correct email address.</li>
            <li>Wait a few minutes - sometimes it takes a moment.</li>
          </ul>
        </div>

        <Link href="/login" className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
