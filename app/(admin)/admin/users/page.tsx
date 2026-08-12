import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getAllUsers } from '@/features/admin/queries'
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
import { formatDistanceToNow } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'All Users' }

const ROLE_STYLES: Record<string, string> = {
  admin:     'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200',
  moderator: 'bg-blue-100   text-blue-800   dark:bg-blue-950   dark:text-blue-200',
  lawyer:    'bg-amber-100  text-amber-800  dark:bg-amber-950  dark:text-amber-200',
  civilian:  'bg-muted      text-muted-foreground',
}

export default async function AdminUsersPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const users = await getAllUsers()

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Users"
        description={`${users.length} registered user${users.length !== 1 ? 's' : ''}`}
      />

      <div className="rounded-xl border bg-background overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.full_name ?? '—'}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${ROLE_STYLES[user.role] ?? ''} hover:opacity-90 capitalize`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDistanceToNow(new Date(user.created_at))} ago
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.is_active
                        ? 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950 dark:text-green-200'
                        : 'bg-muted text-muted-foreground'
                    }
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
