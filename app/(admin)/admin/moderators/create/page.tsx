import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { PageHeader } from '@/components/shared/PageHeader'
import { CreateModeratorForm } from './CreateModeratorForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Add Moderator' }

export default async function CreateModeratorPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  return (
    <div className="max-w-md space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <PageHeader
            title="Add Moderator"
            description="Create a new moderator account. They will be able to review lawyer applications."
          />
        </div>
        <Link
          href="/admin/moderators"
          className="text-sm text-muted-foreground hover:text-foreground shrink-0"
        >
          ← Back
        </Link>
      </div>
      <CreateModeratorForm />
    </div>
  )
}
