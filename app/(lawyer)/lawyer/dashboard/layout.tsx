import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile, getLawyerDocuments } from '@/features/lawyer/queries'

const REQUIRED_DOCS = 4

/**
 * Hard approval gate for the lawyer dashboard.
 * A lawyer reaches the dashboard ONLY when their application is approved.
 * Everyone else is routed to onboarding or the relevant status page.
 */
export default async function LawyerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session || session.role !== 'lawyer') redirect('/login')

  const profile = await getLawyerProfile(session.id)

  // No profile / incomplete profile → onboarding.
  const profileComplete = !!(profile?.bar_council_number && profile?.bio)
  if (!profile || !profileComplete) redirect('/onboarding')

  // Profile done but documents not submitted → finish onboarding.
  const docs = await getLawyerDocuments(profile.id)
  if (docs.length < REQUIRED_DOCS) redirect('/onboarding?step=documents')

  // Submitted but not approved → status pages only.
  if (profile.application_status !== 'approved') {
    if (profile.application_status === 'hold') redirect('/lawyer/status/hold')
    if (profile.application_status === 'rejected') {
      redirect('/lawyer/status/rejected')
    }
    redirect('/lawyer/status/pending')
  }

  return <>{children}</>
}
