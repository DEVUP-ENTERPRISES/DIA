import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile } from '@/features/lawyer/queries'
import { PageHeader } from '@/components/shared/PageHeader'
import { LawyerProfileForm } from './LawyerProfileForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Complete Your Profile' }

export default async function LawyerProfilePage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const existing = await getLawyerProfile(session.id)

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Professional Profile"
        description="Complete your profile to submit your application for review."
      />
      <LawyerProfileForm existing={existing} userEmail={session.email} />
    </div>
  )
}
