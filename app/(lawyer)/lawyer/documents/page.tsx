import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile } from '@/features/lawyer/queries'
import { PageHeader } from '@/components/shared/PageHeader'
import { DocumentUploadForm } from './DocumentUploadForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Upload Documents' }

export default async function LawyerDocumentsPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  // Must have a completed profile first.
  const profile = await getLawyerProfile(session.id)
  if (!profile) redirect('/lawyer/profile')

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Upload Your Documents"
        description="All four documents are required to submit your application."
      />
      <DocumentUploadForm lawyerProfileId={profile.id} />
    </div>
  )
}
