import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function CivilianDashboardPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${session.full_name ?? session.email}`}
        description="You are signed in to DIA."
      />

      <Card>
        <CardContent className="py-12 text-center text-muted-foreground text-sm">
          More features coming in future phases.
        </CardContent>
      </Card>
    </div>
  )
}
