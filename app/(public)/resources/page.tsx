import { BookOpen, Scale, ShieldCheck, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Know Your Rights',
  description:
    'Plain-language legal information and guidance from DIA. Understand your rights and your options.',
}

const TOPICS = [
  {
    icon: ShieldCheck,
    title: 'Protection & safety',
    desc: 'Understanding protection orders, the Domestic Violence Act, and where to turn in an emergency.',
  },
  {
    icon: BookOpen,
    title: 'Your rights at work',
    desc: 'What the law says about wages, dismissal, and harassment in the workplace.',
  },
  {
    icon: Scale,
    title: 'Housing & tenancy',
    desc: 'Your rights around eviction, deposits, and disputes with a landlord.',
  },
]

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 bg-muted/30 border-b">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Know your rights
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Clear, plain-language information to help you understand your
            situation before you talk to anyone. No jargon, no cost.
          </p>
        </div>
      </section>

      {/* Honest early-stage note + topics */}
      <section className="py-20 px-4 flex-1 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 mb-12 text-center">
            <p className="text-sm text-foreground">
              We&apos;re building this library of guides now. Below are the first
              topics we&apos;re working on. In the meantime, you can always{' '}
              <Link href="/signup?role=civilian" className="text-primary font-medium hover:underline">
                ask for help directly
              </Link>
              .
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Topics we&apos;re starting with
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TOPICS.map((topic) => (
              <div
                key={topic.title}
                className="bg-card border rounded-xl p-6 shadow-sm"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <topic.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {topic.desc}
                </p>
                <span className="inline-flex items-center text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  Guide coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency / direct help */}
      <section className="px-4 pb-24 bg-background">
        <div className="max-w-5xl mx-auto bg-card border rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center shadow-sm">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Need help now, not a guide?
            </h2>
            <p className="text-muted-foreground">
              If you&apos;re facing something urgent, don&apos;t wait for a written guide.
              Reach out and we&apos;ll help you find a verified lawyer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:justify-end gap-4">
            <Link
              href="/signup?role=civilian"
              className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
            >
              Get legal help <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'gap-2')}
            >
              <Phone className="w-4 h-4" /> How DIA works
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
