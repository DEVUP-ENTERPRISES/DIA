import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getAdminDashboardStats } from '@/features/admin/queries'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Scale, CheckCircle2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboardPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const stats = await getAdminDashboardStats()

  const cards = [
    {
      title: 'Total Lawyers',
      value: stats.totalLawyers,
      icon: Scale,
      href: '/admin/lawyers',
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: Users,
      href: '/admin/lawyers',
    },
    {
      title: 'Approved Lawyers',
      value: stats.approvedLawyers,
      icon: CheckCircle2,
      href: '/admin/lawyers',
    },
    {
      title: 'Moderators',
      value: stats.moderators,
      icon: ShieldCheck,
      href: '/admin/moderators',
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description={`Signed in as ${session.email}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, href }) => (
          <Link key={title} href={href} className="group block">
            <Card className="transition-shadow group-hover:shadow-md">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Placeholder */}
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground text-sm">
          More admin features coming in future phases.
        </CardContent>
      </Card>
    </div>
  )
}
