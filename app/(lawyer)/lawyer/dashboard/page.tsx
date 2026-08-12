import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile } from '@/features/lawyer/queries'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Lawyer Dashboard' }

export default async function LawyerDashboardPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const profile = await getLawyerProfile(session.id)

  // Only approved lawyers reach this page (proxy enforces it).
  if (!profile || profile.application_status !== 'approved') {
    redirect('/lawyer/status/pending')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${session.full_name ?? 'Lawyer'}`}
        description="Your application has been approved. Your dashboard is ready."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <CheckCircle2
              className="h-5 w-5 text-green-600"
              aria-hidden="true"
            />
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950 dark:text-green-200">
              Approved
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bar Council No.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-foreground">
              {profile.bar_council_number ?? '—'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Practice Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {profile.practice_areas?.join(', ') ?? '—'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for future features */}
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground text-sm">
          More features coming in future phases.
        </CardContent>
      </Card>
    </div>
  )
}
