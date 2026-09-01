import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getAllModerators } from '@/features/admin/queries'
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
import { buttonVariants } from '@/components/ui/button'
import { cn, formatDistanceToNow } from '@/lib/utils'
import { Plus } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Moderators' }

export default async function AdminModeratorsPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const moderators = await getAllModerators()

  return (
    <div className="space-y-6">
      <PageHeader title="Moderators" description={`${moderators.length} moderator${moderators.length !== 1 ? 's' : ''}`}>
        <Link
          href="/admin/moderators/create"
          className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Moderator
        </Link>
      </PageHeader>

      {moderators.length === 0 ? (
        <div className="rounded-xl border bg-background p-12 text-center text-muted-foreground text-sm">
          No moderators yet.{' '}
          <Link href="/admin/moderators/create" className="text-primary hover:underline">
            Add the first one
          </Link>
          .
        </div>
      ) : (
        <div className="rounded-xl border bg-background overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moderators.map((mod) => {
                const profile = Array.isArray(mod.profiles)
                  ? mod.profiles[0]
                  : mod.profiles
                return (
                  <TableRow key={mod.id}>
                    <TableCell className="font-medium">
                      {profile?.full_name ?? '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {profile?.email ?? '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(mod.created_at))} ago
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          profile?.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950 dark:text-green-200'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {profile?.is_active ? 'Active' : 'Inactive'}
                      </Badge>
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
