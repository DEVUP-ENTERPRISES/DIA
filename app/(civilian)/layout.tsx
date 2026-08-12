import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { DashboardShell } from '@/components/shared/DashboardShell'

export default async function CivilianLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session || session.role !== 'civilian') {
    redirect('/login')
  }

  return (
    <DashboardShell role="civilian" fullName={session.full_name}>
      {children}
    </DashboardShell>
  )
}
