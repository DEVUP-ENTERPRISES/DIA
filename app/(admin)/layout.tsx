import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { DashboardShell } from '@/components/shared/DashboardShell'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session || session.role !== 'admin') {
    redirect('/login')
  }

  return (
    <DashboardShell role="admin" fullName={session.full_name}>
      {children}
    </DashboardShell>
  )
}
