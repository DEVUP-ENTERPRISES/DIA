import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile, getLawyerDocuments } from '@/features/lawyer/queries'
import { getCountries } from '@/features/reference/queries'
import { CivilianOnboardingForm } from '@/components/onboarding/CivilianOnboardingForm'
import { LawyerProfileForm } from '@/components/onboarding/LawyerProfileForm'
import { DocumentUploadForm } from '@/components/onboarding/DocumentUploadForm'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Onboarding' }

const REQUIRED_DOCS = 4

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>
}) {
  const session = await getServerSession()
  if (!session) redirect('/login')

  // -------------------------------------------------------------------------
  // Civilian: name + purpose. Already done → dashboard.
  // -------------------------------------------------------------------------
  if (session.role === 'civilian') {
    if (session.purpose) redirect('/dashboard')

    const countries = await getCountries()

    return (
      <div className="w-full max-w-md">
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome to DIA</h1>
          <p className="text-sm text-muted-foreground">
            A few quick things before we get started.
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <CivilianOnboardingForm
            countries={countries}
            defaultName={session.full_name}
          />
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Lawyer: profile step, then documents step.
  // -------------------------------------------------------------------------
  if (session.role === 'lawyer') {
    const profile = await getLawyerProfile(session.id)

    // Profile considered complete once the core credential fields are set.
    const profileComplete = !!(profile?.bar_council_number && profile?.bio)

    // If the application has already been submitted, leave onboarding.
    if (profile) {
      const docs = await getLawyerDocuments(profile.id)
      if (docs.length >= REQUIRED_DOCS) {
        // Application complete - route by status.
        const status = profile.application_status
        if (status === 'approved') redirect('/lawyer/dashboard')
        if (status === 'hold') redirect('/lawyer/status/hold')
        if (status === 'rejected') redirect('/lawyer/status/rejected')
        redirect('/lawyer/status/pending')
      }
    }

    const { step } = await searchParams
    // Show the documents step only once the profile is complete.
    const showDocuments = profileComplete && step === 'documents'

    const countries = showDocuments ? [] : await getCountries()

    return (
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Lawyer application
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete your profile and upload your documents. Our team reviews
            every application before approval.
          </p>
        </div>

        {/* Step indicator */}
        <ol className="mb-8 flex items-center gap-4 text-sm">
          <StepPill
            index={1}
            label="Professional profile"
            done={profileComplete}
            active={!showDocuments}
          />
          <div className="h-px flex-1 bg-border" />
          <StepPill
            index={2}
            label="Documents"
            done={false}
            active={showDocuments}
          />
        </ol>

        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          {showDocuments ? (
            <DocumentUploadForm lawyerProfileId={profile!.id} />
          ) : (
            <LawyerProfileForm
              existing={profile}
              userEmail={session.email}
              countries={countries}
            />
          )}
        </div>
      </div>
    )
  }

  // Any other role shouldn't be here.
  redirect('/login')
}

function StepPill({
  index,
  label,
  done,
  active,
}: {
  index: number
  label: string
  done: boolean
  active: boolean
}) {
  return (
    <li className="flex items-center gap-2">
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
      ) : (
        <Circle
          className={cn(
            'h-5 w-5',
            active ? 'text-primary' : 'text-muted-foreground/40',
          )}
          aria-hidden="true"
        />
      )}
      <span
        className={cn(
          'font-medium',
          active || done ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {index}. {label}
      </span>
    </li>
  )
}
