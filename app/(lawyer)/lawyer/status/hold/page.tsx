import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile } from '@/features/lawyer/queries'
import { PauseCircle } from 'lucide-react'
import { LogoutButton } from '@/components/shared/LogoutButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Application On Hold' }

export default async function HoldPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const profile = await getLawyerProfile(session.id)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-950">
            <PauseCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Application On Hold</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your application has been placed on hold pending additional information or
            clarification from our review team.
          </p>
        </div>

        {profile?.review_notes && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-left dark:border-blue-800 dark:bg-blue-950">
            <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              Notes from the review team:
            </p>
            <p className="text-blue-800 dark:text-blue-200">{profile.review_notes}</p>
          </div>
        )}

        <div className="rounded-lg border bg-muted/50 p-4 text-sm text-left space-y-1 text-muted-foreground">
          <p className="font-medium text-foreground">What should you do?</p>
          <p>
            Please check the email associated with your account for further instructions
            from our team. You may be asked to resubmit documents or provide additional
            information.
          </p>
        </div>

        <div className="pt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
