export const metadata = {
  title: 'About DIA',
  description:
    'Why Digital Inclusive Aid exists and how we connect people with verified legal help.',
}

import {
  ShieldCheck,
  Scale,
  Lock,
  UserCheck,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 border-b bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Legal help shouldn&apos;t depend on who you know.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Digital Inclusive Aid (DIA) helps people find verified legal
            professionals, understand their rights, and take the next step, with
            a focus on women and communities who are too often left out.
          </p>
        </div>
      </section>

      {/* Why DIA exists */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Why we built this
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            When something goes wrong, most people don&apos;t know where to start.
            Lawyers feel expensive. The process feels intimidating. And it&apos;s hard
            to know who to trust online. So people wait, or give up, on problems
            that a qualified lawyer could help resolve.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DIA exists to remove that first, hardest barrier: finding someone
            qualified and trustworthy. We verify every lawyer on the platform, keep
            your information private, and make it free to ask for help.
          </p>
        </div>
      </section>

      {/* The barriers we address */}
      <section className="py-20 px-4 bg-muted/30 border-y">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            The barriers we&apos;re working against
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Cost',
                desc: 'Legal advice often feels out of reach before you even start. Asking DIA for help is free.',
              },
              {
                title: 'Not knowing your rights',
                desc: 'Many people simply aren\u2019t aware of the protections and options available to them.',
              },
              {
                title: 'A confusing process',
                desc: 'Legal procedures are hard to navigate alone, so people abandon valid cases.',
              },
              {
                title: 'Feeling unsafe or unheard',
                desc: 'Vulnerable people need support that is private, respectful, and trauma-informed.',
              },
            ].map((barrier) => (
              <div
                key={barrier.title}
                className="bg-card border rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {barrier.title}
                </h3>
                <p className="text-muted-foreground">{barrier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works, honestly */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
            How DIA actually works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 text-center">
            No black boxes. Here is what happens between you asking for help and
            talking to a lawyer.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: UserCheck,
                title: 'You ask',
                desc: 'Describe your situation through a simple, private form.',
              },
              {
                icon: Lock,
                title: 'We keep it private',
                desc: 'Your details and documents are stored securely and access-controlled.',
              },
              {
                icon: ShieldCheck,
                title: 'We match you',
                desc: 'You\u2019re connected with a verified lawyer suited to your issue.',
              },
              {
                icon: Scale,
                title: 'You move forward',
                desc: 'You get clear guidance and a realistic sense of next steps.',
              },
            ].map((item, i) => (
              <div key={item.title} className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-2">
                  Step {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 px-4 bg-muted/30 border-y">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            What we hold ourselves to
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Access',
                desc: 'Cost and location shouldn\u2019t decide who gets legal help.',
              },
              {
                title: 'Privacy',
                desc: 'What you share is protected and seen only by those who need to.',
              },
              {
                title: 'Accountability',
                desc: 'Every lawyer is verified and answerable for their conduct.',
              },
              {
                title: 'Honesty',
                desc: 'We\u2019d rather tell you the truth than oversell what we can do.',
              },
            ].map((principle) => (
              <div
                key={principle.title}
                className="p-6 bg-card border rounded-xl hover:border-primary/50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Whether you need help or want to give it
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            DIA is built for people seeking legal support and for the lawyers
            ready to provide it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup?role=civilian"
              className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'gap-2')}
            >
              Get legal help <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signup?role=lawyer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
              )}
            >
              Register as a lawyer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
