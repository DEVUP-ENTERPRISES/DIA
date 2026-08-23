export const metadata = {
  title: 'About DIA | Digital Legal Infrastructure',
}

import { ShieldCheck, Scale, Globe, Lock, HeartHandshake, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 border-b bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Building the Infrastructure for <span className="text-primary">Accessible Justice</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Digital Inclusive Aid (DIA) is a purpose-built platform dedicated to removing the barriers between citizens and the legal support they deserve.
          </p>
        </div>
      </section>

      {/* Our Mission & Why DIA Exists */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              To create a secure, equitable digital ecosystem where anyone—regardless of their background or resources—can access verified legal professionals, understand their rights, and navigate complex legal systems with confidence.
            </p>
            
            <h2 className="text-3xl font-bold tracking-tight mb-6 mt-16">Why DIA Exists</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The justice system is often opaque and intimidating. We built DIA to directly address the systemic barriers that prevent people from seeking help:
            </p>
            <ul className="space-y-4">
              {[
                { title: "Cost & Accessibility", desc: "Legal representation is often prohibitively expensive and hard to find." },
                { title: "Lack of Awareness", desc: "Many individuals are unaware of their fundamental rights or the remedies available." },
                { title: "Systemic Complexity", desc: "Navigating legal procedures without guidance leads to procedural abandonment." },
                { title: "Vulnerability", desc: "Marginalized communities often face bias and lack trauma-informed support." }
              ].map((barrier, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">{barrier.title}:</span> <span className="text-muted-foreground">{barrier.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Visual */}
          <div className="bg-[#0B1120] rounded-3xl p-8 lg:p-12 text-white border border-slate-800 shadow-xl flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8">The DIA Ecosystem</h3>
            <div className="space-y-6 relative">
              <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-700"></div>
              
              <div className="relative flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shrink-0 z-10">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-lg">1. Accessible Entry</h4>
                  <p className="text-slate-400 text-sm mt-1">Multi-platform, inclusive portals for citizens to request help.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shrink-0 z-10">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-lg">2. Secure Triage</h4>
                  <p className="text-slate-400 text-sm mt-1">Encrypted processing and intelligent matching algorithms.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shrink-0 z-10">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-lg">3. Verified Network</h4>
                  <p className="text-slate-400 text-sm mt-1">Direct connection to vetted, accountable legal professionals.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-center shrink-0 z-10">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-lg">4. Resolution & Impact</h4>
                  <p className="text-slate-400 text-sm mt-1">Ongoing case tracking, structural support, and systemic change.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 px-4 bg-muted/30 border-y">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Approach</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            We combine modern civic technology with a rigorous professional network to create a scalable infrastructure for legal aid.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-background p-8 rounded-2xl border shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-primary">Purpose-Built Tech</h3>
              <p className="text-muted-foreground">Secure dashboards, encrypted communication, and streamlined case management tools designed specifically for legal workflows.</p>
            </div>
            <div className="bg-background p-8 rounded-2xl border shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-primary">Verified Professionals</h3>
              <p className="text-muted-foreground">A curated network of lawyers who undergo strict identity and credential verification before joining the platform.</p>
            </div>
            <div className="bg-background p-8 rounded-2xl border shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-primary">Accessible Information</h3>
              <p className="text-muted-foreground">Plain-language guides, template documents, and "Know Your Rights" resources available freely to the public.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Guiding Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Access", desc: "Breaking down financial and geographical barriers." },
              { title: "Inclusion", desc: "Building systems for the most vulnerable first." },
              { title: "Privacy", desc: "Uncompromising data security and confidentiality." },
              { title: "Accountability", desc: "Rigorous standards for platform professionals." },
              { title: "Trust", desc: "Transparent, reliable, and consistent operations." }
            ].map((principle, i) => (
              <div key={i} className="p-6 bg-card border rounded-xl hover:border-primary/50 transition-colors">
                <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
        <h2 className="text-3xl font-bold mb-6">Join the DIA Network</h2>
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Whether you need legal assistance or you are a professional ready to provide it, our platform is built for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup/civilian" className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}>
            Get Legal Help
          </Link>
          <Link href="/signup/lawyer" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground")}>
            Register as a Lawyer
          </Link>
        </div>
      </section>
    </div>
  )
}
