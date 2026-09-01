import Link from 'next/link'
import {
  ShieldCheck,
  Scale,
  Users,
  HeartHandshake,
  Home as HomeIcon,
  Briefcase,
  FileText,
  ArrowRight,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Areas of Legal Support',
  description:
    'The legal areas DIA can connect you with verified professionals for.',
}

const AREAS = [
  {
    icon: HeartHandshake,
    title: 'Family & domestic matters',
    desc: 'Divorce, maintenance, child custody, and guardianship. Handled with care and confidentiality.',
  },
  {
    icon: ShieldCheck,
    title: 'Women\u2019s safety & protection',
    desc: 'Protection under the Domestic Violence Act, harassment, and dowry-related matters, with trauma-informed support.',
  },
  {
    icon: Briefcase,
    title: 'Workplace & employment',
    desc: 'Unfair dismissal, unpaid wages, workplace harassment, and your rights as an employee.',
  },
  {
    icon: HomeIcon,
    title: 'Housing & tenancy',
    desc: 'Eviction, security deposits, rent disputes, and disagreements with landlords.',
  },
  {
    icon: Users,
    title: 'Civil rights & discrimination',
    desc: 'Standing up against discrimination and civil rights violations, and protecting your dignity.',
  },
  {
    icon: FileText,
    title: 'Documents & records',
    desc: 'Identity documents, certificates, affidavits, and official record corrections.',
  },
]

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 border-b bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Areas of legal support
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These are the areas we most often help with. Not sure where your
            situation fits? Ask anyway, we&apos;ll help you find the right kind of
            lawyer.
          </p>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {AREAS.map((area) => (
            <div
              key={area.title}
              className="bg-card border rounded-2xl p-8 shadow-sm hover:border-primary/50 transition-colors flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <area.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {area.title}
                </h3>
                <p className="text-muted-foreground">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Honest note */}
      <section className="px-4 pb-20 bg-background">
        <div className="max-w-3xl mx-auto bg-muted/40 border rounded-2xl p-6 text-center">
          <p className="text-sm text-muted-foreground">
            DIA connects you with independent, verified lawyers. We don&apos;t provide
            legal advice ourselves, and matching depends on lawyers available for
            your issue and area.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 bg-background">
        <div className="max-w-5xl mx-auto bg-[#0B1120] rounded-3xl p-10 md:p-14 text-center text-white">
          <Scale className="w-10 h-10 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Not sure who you need to talk to?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Describe your situation in plain words. We&apos;ll help match you with a
            verified lawyer suited to it.
          </p>
          <Link
            href="/signup?role=civilian"
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
          >
            Get legal help <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
