import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile } from '@/features/lawyer/queries'
import { XCircle } from 'lucide-react'
import { LogoutButton } from '@/components/shared/LogoutButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Application Not Approved' }

export default async function RejectedPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const profile = await getLawyerProfile(session.id)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-2xl bg-red-50 p-5 dark:bg-red-950">
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Application Not Approved</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            After careful review, we were unable to approve your application at this time.
          </p>
        </div>

        {profile?.review_notes && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-left dark:border-red-800 dark:bg-red-950">
            <p className="font-medium text-red-900 dark:text-red-100 mb-1">
              Reason provided:
            </p>
            <p className="text-red-800 dark:text-red-200">{profile.review_notes}</p>
          </div>
        )}

        <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground text-left">
          If you believe this is an error or wish to appeal, please contact
          our support team at{' '}
          <a
            href="mailto:support@dia.example.com"
            className="text-foreground underline underline-offset-2"
          >
            support@dia.example.com
          </a>
          .
        </div>

        <div className="pt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
