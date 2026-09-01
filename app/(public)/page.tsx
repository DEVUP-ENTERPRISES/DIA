import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnchorLink } from '@/components/shared/AnchorLink'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { HorizontalAreas } from '@/components/public/HorizontalAreas'

const supportAreas = [
  ['Family & domestic matters', 'Divorce, maintenance, child custody, and protection under the Domestic Violence Act.'],
  ['Workplace & employment', 'Unfair dismissal, unpaid wages, and workplace harassment.'],
  ["Women’s safety & rights", 'Trauma-informed support that prioritises your safety first.'],
  ['Housing & tenancy', 'Eviction, deposits, and disputes with landlords.'],
  ['Documents & records', 'Identity documents, certificates, and official records.'],
] as const

const verificationSteps = [
  ['Identity', 'Government-issued identification is confirmed.'],
  ['Registration', 'Bar Council enrolment and registration are verified.'],
  ['Documentation', 'Certificates and required documents are reviewed.'],
  ['Approval', 'A DIA moderator signs off before the profile goes live.'],
] as const

const processSteps = [
  ['Describe what is happening', 'Share the situation in your own words. Attach documents only when you are ready.'],
  ['DIA reviews your request', 'We identify the support and legal experience best suited to your issue.'],
  ['Meet a verified lawyer', 'Connect with a professional whose credentials have passed our review.'],
  ['Decide what comes next', 'Receive clear guidance on your options and the steps you can take.'],
] as const

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ---------------------------------------------------------------- */}
      {/* HERO - full-height masthead, amber rule motif                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-border px-5 pt-10 md:px-8 md:pt-14 lg:flex lg:min-h-[calc(100vh-4.5rem)] lg:flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-1">
          <div className="flex items-center justify-between border-b border-border pb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="font-semibold text-foreground">Digital Inclusive Aid</span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 bg-accent-amber" aria-hidden="true" />
              Verified legal assistance · India
            </span>
          </div>

          <div className="grid gap-10 py-14 md:grid-cols-[1.15fr_.85fr] md:gap-16 md:py-20 lg:flex-1 lg:content-center lg:py-0">
            <div>
              <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl">
                Access to legal counsel, on a foundation of{' '}
                <span className="relative whitespace-nowrap text-primary">
                  verified trust
                  <span
                    className="absolute -bottom-1 left-0 h-1 w-full bg-accent-amber/70"
                    aria-hidden="true"
                  />
                </span>
                .
              </h1>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/signup?role=civilian"
                  className={cn(buttonVariants({ size: 'lg' }), 'gap-2 rounded-md px-6')}
                >
                  Request legal help <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/signup?role=lawyer"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'gap-2 rounded-md px-6',
                  )}
                >
                  Register as a lawyer
                </Link>
              </div>
            </div>

            <div className="md:border-l md:border-border md:pl-16">
              <p className="text-lg leading-8 text-muted-foreground lg:text-xl lg:leading-9">
                DIA connects individuals with legal professionals whose Bar
                Council credentials have been independently reviewed. Describe
                your matter, and we direct you to counsel qualified to advise on
                it - privately, and at no cost to begin.
              </p>
              <AnchorLink
                targetId="how-it-works"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4"
              >
                How the process works <ChevronRight className="size-4" />
              </AnchorLink>
            </div>
          </div>

          <dl className="grid gap-x-10 gap-y-6 border-t border-border py-8 sm:grid-cols-3 lg:py-7">
            {[
              ['Bar Council verified', 'Credentials checked before any lawyer can take a case.'],
              ['Free to begin', 'Requesting help and understanding your options costs nothing.'],
              ['Private by default', 'Your details are shared only with your matched lawyer.'],
            ].map(([term, desc]) => (
              <div key={term} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent-amber" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-foreground">{term}</dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground">{desc}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* AREAS - horizontal scroll                                        */}
      {/* ---------------------------------------------------------------- */}
      <HorizontalAreas areas={supportAreas} />

      {/* ---------------------------------------------------------------- */}
      {/* PROCESS - numbered ledger, four columns                          */}
      {/* ---------------------------------------------------------------- */}
      <ScrollReveal>
        <section id="how-it-works" className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
                A clear route from concern to next step.
              </h2>
              <p className="mt-4 text-lg leading-7 text-muted-foreground">
                No legal jargon required. Start where you are; we make the route
                forward understandable.
              </p>
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
              {processSteps.map(([title, description], i) => (
                <li key={title} className="bg-background p-7">
                  <span className="font-mono text-sm font-semibold text-accent-amber">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 font-semibold leading-6 text-foreground">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </ScrollReveal>

      {/* ---------------------------------------------------------------- */}
      {/* VERIFICATION - dark statement band, ledger list (no fake card)   */}
      {/* ---------------------------------------------------------------- */}
      <ScrollReveal>
        <section className="bg-[#16151c] px-5 py-20 text-stone-100 md:px-8 md:py-28 dark:bg-[#0f0e14]">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-accent-amber">
              <span className="h-1.5 w-1.5 bg-accent-amber" aria-hidden="true" />
              Professional verification
            </div>
            <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <h2 className="font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.025em] md:text-5xl">
                A real review process, not a badge you can buy.
              </h2>
              <p className="max-w-lg self-end text-lg leading-8 text-stone-400">
                Anyone can claim to be a lawyer online. Before a professional can
                accept requests through DIA, their identity, registration, and
                documentation are reviewed by our team - and approved by a person,
                not a form.
              </p>
            </div>

            <ol className="mt-16 grid gap-x-12 gap-y-10 border-t border-stone-700 pt-12 sm:grid-cols-2 lg:grid-cols-4">
              {verificationSteps.map(([title, description], i) => (
                <li key={title} className="border-l-2 border-accent-amber pl-5">
                  <span className="font-mono text-sm text-accent-amber">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-12 border-t border-stone-700 pt-6 text-xs leading-5 text-stone-500">
              A verified status reflects DIA&apos;s completed credential review. It
              is not a ranking, endorsement, or recommendation of any lawyer.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ---------------------------------------------------------------- */}
      {/* PRIVACY - plain statement + honest list (no fake card)           */}
      {/* ---------------------------------------------------------------- */}
      <ScrollReveal>
        <section className="border-b border-border px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="max-w-md font-serif text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
                Your case is not a public profile.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
                Reaching out for legal help can feel exposing. DIA is built so
                sensitive details travel no further than they must.
              </p>
            </div>
            <ul className="grid content-center gap-px overflow-hidden rounded-md border border-border bg-border">
              {[
                ['Stored privately', 'Documents are never publicly searchable or indexed.'],
                ['Seen only by the right people', 'Access is limited to verified reviewers and your matched lawyer.'],
                ['Controlled and logged', 'Every access is tied to a specific role and purpose.'],
              ].map(([term, desc]) => (
                <li key={term} className="bg-background p-6">
                  <p className="font-semibold text-foreground">{term}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* ---------------------------------------------------------------- */}
      {/* FOR LAWYERS - two column, checklist                              */}
      {/* ---------------------------------------------------------------- */}
      <ScrollReveal>
        <section className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-1.5 w-1.5 bg-accent-amber" aria-hidden="true" />
                For legal professionals
              </div>
              <h2 className="mt-6 font-serif text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
                Put your practice within reach of people who need it.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                Create a professional profile, complete DIA&apos;s verification
                once, and receive requests that relate to your practice.
              </p>
              <Link
                href="/signup?role=lawyer"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'mt-8 gap-2 rounded-md px-6',
                )}
              >
                Register as a lawyer <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="lg:pt-2">
              <p className="text-sm font-semibold text-foreground">
                Prepare your registration
              </p>
              <ul className="mt-4 divide-y divide-border border-t border-border">
                {[
                  'Bar Council enrolment number',
                  'Government-issued identification',
                  'Enrolment or Bar certificate',
                  'A concise professional profile',
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 py-4 text-sm text-foreground"
                  >
                    <span className="font-mono text-xs text-accent-amber">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ---------------------------------------------------------------- */}
      {/* CTA                                                              */}
      {/* ---------------------------------------------------------------- */}
      <ScrollReveal>
        <section className="bg-primary px-5 py-16 text-primary-foreground md:px-8 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-serif text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
              You do not have to work this out alone.
            </h2>
            <Link
              href="/signup?role=civilian"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'secondary' }),
                'shrink-0 gap-2 rounded-md px-6',
              )}
            >
              Request legal help <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
