import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getAllLawyerApplications } from '@/features/admin/queries'
import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { formatDistanceToNow } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Lawyer Applications' }

const STATUS_STYLES: Record<string, string> = {
  approved: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
  hold:     'bg-blue-100  text-blue-800  dark:bg-blue-950  dark:text-blue-200',
  rejected: 'bg-red-100   text-red-800   dark:bg-red-950   dark:text-red-200',
  pending:  'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
}

export default async function AdminLawyersPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const applications = await getAllLawyerApplications()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lawyer Applications"
        description={`${applications.length} total application${applications.length !== 1 ? 's' : ''}`}
      />

      {applications.length === 0 ? (
        <div className="rounded-xl border bg-background p-12 text-center text-muted-foreground text-sm">
          No applications yet.
        </div>
      ) : (
        <div className="rounded-xl border bg-background overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lawyer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => {
                const profile = Array.isArray(app.profiles)
                  ? app.profiles[0]
                  : app.profiles
                return (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">
                      {profile?.full_name ?? '—'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {profile?.email ?? '—'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(
                        new Date(app.application_submitted_at),
                      )}{' '}
                      ago
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${STATUS_STYLES[app.application_status] ?? ''} hover:opacity-90 capitalize`}
                      >
                        {app.application_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/lawyers/${app.id}`}
                        className="text-sm text-primary underline-offset-2 hover:underline"
                      >
                        View →
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
