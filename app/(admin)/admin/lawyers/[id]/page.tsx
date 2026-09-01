import { redirect, notFound } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfileById, getLawyerDocumentsWithUrls } from '@/features/lawyer/queries'
import { PageHeader } from '@/components/shared/PageHeader'
import { ReviewPanel } from '@/components/shared/ReviewPanel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Lawyer Details' }

export default async function AdminLawyerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession()
  if (!session) redirect('/login')

  const [lawyerData, documents] = await Promise.all([
    getLawyerProfileById(id),
    getLawyerDocumentsWithUrls(id),
  ])

  if (!lawyerData) notFound()

  const profile = Array.isArray(lawyerData.profiles)
    ? lawyerData.profiles[0]
    : lawyerData.profiles

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <PageHeader
            title={profile?.full_name ?? 'Lawyer Detail'}
            description={profile?.email ?? ''}
          />
        </div>
        <Link
          href="/admin/lawyers"
          className="text-sm text-muted-foreground hover:text-foreground shrink-0"
        >
          ← Back
        </Link>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 text-sm">
          <Detail label="Bar Council No." value={lawyerData.bar_council_number} />
          <Detail label="State Bar Council" value={lawyerData.state_bar_council} />
          <Detail label="Qualification" value={lawyerData.qualification} />
          <Detail label="Experience" value={lawyerData.years_of_experience != null ? `${lawyerData.years_of_experience} years` : null} />
          <Detail label="Law Firm" value={lawyerData.law_firm} />
          <Detail label="Location" value={[lawyerData.city, lawyerData.state, lawyerData.country].filter(Boolean).join(', ')} />
          <div className="sm:col-span-2">
            <Detail label="Practice Areas" value={lawyerData.practice_areas?.join(', ')} />
          </div>
          <div className="sm:col-span-2">
            <Detail label="Languages" value={lawyerData.languages?.join(', ')} />
          </div>
          {lawyerData.bio && (
            <div className="sm:col-span-2 space-y-1">
              <p className="text-muted-foreground font-medium">Bio</p>
              <p className="text-foreground leading-relaxed">{lawyerData.bio}</p>
            </div>
          )}
          {lawyerData.review_notes && (
            <div className="sm:col-span-2 space-y-1">
              <p className="text-muted-foreground font-medium">Previous Review Notes</p>
              <p className="text-foreground">{lawyerData.review_notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No documents uploaded.</p>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium capitalize">
                    {doc.document_type?.replace(/_/g, ' ') ?? 'Document'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {doc.file_name}
                  </p>
                </div>
                {doc.signed_url && (
                  <a
                    href={doc.signed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-2"
                  >
                    View
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Review decision */}
      <ReviewPanel
        lawyerProfileId={id}
        currentStatus={lawyerData.application_status}
      />
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="space-y-0.5">
      <p className="text-muted-foreground font-medium">{label}</p>
      <p className="text-foreground">{value ?? '-'}</p>
    </div>
  )
}
