import { Clock } from 'lucide-react'
import { LogoutButton } from '@/components/shared/LogoutButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Application Pending' }

export default function PendingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-2xl bg-amber-50 p-5 dark:bg-amber-950">
            <Clock className="h-10 w-10 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Application Under Review</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your application has been submitted and is currently being reviewed by
            our team. This typically takes 1–3 business days.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4 text-sm text-left space-y-2">
          <p className="font-medium text-foreground">What happens next?</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Our team reviews your profile and documents.</li>
            <li>You will be notified by email when a decision is made.</li>
            <li>Once approved, you will gain full access to your dashboard.</li>
          </ul>
        </div>

        <div className="pt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
