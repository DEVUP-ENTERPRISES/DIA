import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { DashboardShell } from '@/components/shared/DashboardShell'

export default async function ModeratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session || session.role !== 'moderator') {
    redirect('/login')
  }

  return (
    <DashboardShell role="moderator" fullName={session.full_name}>
      {children}
    </DashboardShell>
  )
}
