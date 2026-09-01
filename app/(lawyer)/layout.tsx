import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { DashboardShell } from '@/components/shared/DashboardShell'

/**
 * Shell for all lawyer routes. Only checks that the user is a lawyer.
 * Approval gating for protected areas (the dashboard) lives in
 * app/(lawyer)/lawyer/dashboard/layout.tsx so the status pages
 * (pending/hold/rejected) remain reachable for non-approved lawyers.
 */
export default async function LawyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session || session.role !== 'lawyer') {
    redirect('/login')
  }

  return (
    <DashboardShell role="lawyer" fullName={session.full_name}>
      {children}
    </DashboardShell>
  )
}
