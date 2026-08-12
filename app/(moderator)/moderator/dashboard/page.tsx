import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getPendingApplications, getRecentlyReviewed } from '@/features/moderator/queries'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { formatDistanceToNow } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Moderator Dashboard' }

export default async function ModeratorDashboardPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const [pending, recent] = await Promise.all([
    getPendingApplications(),
    getRecentlyReviewed(5),
  ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Moderator Dashboard"
        description={`Signed in as ${session.email}`}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pending.length}</p>
            {pending.length > 0 && (
              <Link
                href="/moderator/lawyers"
                className="mt-1 text-xs text-primary underline-offset-2 hover:underline"
              >
                Review now →
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recently Reviewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{recent.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recently Reviewed</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          ) : (
            <ul className="divide-y">
              {recent.map((item) => {
                const profile = Array.isArray(item.profiles)
                  ? item.profiles[0]
                  : item.profiles
                return (
                  <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {profile?.full_name ?? profile?.email ?? 'Unknown'}
                      </p>
                      {item.reviewed_at && (
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(item.reviewed_at))} ago
                        </p>
                      )}
                    </div>
                    <StatusBadge status={item.application_status} />
                  </li>
                )
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
    hold: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  }
  return (
    <Badge className={`${map[status] ?? ''} hover:opacity-90 capitalize shrink-0`}>
      {status}
    </Badge>
  )
}
