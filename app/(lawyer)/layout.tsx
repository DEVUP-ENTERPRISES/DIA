import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { DashboardShell } from '@/components/shared/DashboardShell'

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
