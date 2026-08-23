'use client'

import Link from 'next/link'
import { 
  ArrowRight, Shield, ShieldCheck, Lock, CheckCircle2, 
  Users, Scale, FileText, Briefcase, HeartHandshake,
  ChevronRight, Activity
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-4 overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Digital Legal Aid Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
              Legal support should be <span className="text-primary">accessible</span> to everyone.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              DIA connects individuals and communities with verified legal professionals, helping people understand their options, access support, and move forward with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup/civilian" className={cn(buttonVariants({ size: 'lg' }), "gap-2 w-full sm:w-auto")}>
                Get Legal Help <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#how-it-works" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "w-full sm:w-auto")}>
                How DIA Works
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block h-[500px] w-full">
            {/* Abstract UI Composition */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] h-[400px] bg-card rounded-xl border shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-muted rounded-md mb-2"></div>
                    <div className="h-3 w-24 bg-muted/50 rounded-md"></div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Verified</div>
              </div>
              <div className="space-y-3 flex-1">
                <div className="h-20 w-full bg-muted/30 rounded-lg border border-dashed border-muted flex items-center justify-center text-muted-foreground text-sm">Secure Case Communication</div>
                <div className="h-12 w-full bg-muted/30 rounded-lg border border-dashed border-muted"></div>
                <div className="h-12 w-full bg-muted/30 rounded-lg border border-dashed border-muted"></div>
              </div>
            </div>
            
            <div className="absolute left-0 bottom-12 w-[60%] h-[180px] bg-[#10172A] rounded-xl shadow-2xl p-5 border border-slate-700 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/90 font-medium mb-2">
                <Activity className="w-4 h-4 text-[#D97706]" /> Case Progress
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-primary"></div>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-auto">Professional Assigned • 2 hours ago</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust and Credibility Strip */}
      <section className="bg-card border-b py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-3xl font-bold text-foreground mb-1">10,000+</div>
            <div className="text-sm text-muted-foreground font-medium">Support Requests Handled</div>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-3xl font-bold text-foreground mb-1">200+</div>
            <div className="text-sm text-muted-foreground font-medium">Verified Legal Professionals</div>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-3xl font-bold text-foreground mb-1">24/7</div>
            <div className="text-sm text-muted-foreground font-medium">Platform Availability</div>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-3xl font-bold text-foreground mb-1">98%</div>
            <div className="text-sm text-muted-foreground font-medium">Successful Resolution Rate</div>
          </div>
        </div>
      </section>

      {/* 3. How DIA Works Section */}
      <section id="how-it-works" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">How DIA Works</h2>
            <p className="text-lg text-muted-foreground">A secure, streamlined process connecting you with the right legal support when you need it most.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-muted -z-10"></div>
            
            {[
              { num: '01', title: 'Tell Us What You Need', desc: 'Securely describe your legal issue and provide relevant details in our protected portal.' },
              { num: '02', title: 'Get Connected', desc: 'DIA matches you with verified legal professionals or resources specialized in your needs.' },
              { num: '03', title: 'Track Your Case', desc: 'Follow progress, communicate securely, and manage case information in one place.' },
              { num: '04', title: 'Move Forward', desc: 'Receive expert guidance, actionable support, and clear next steps for resolution.' }
            ].map((step, i) => (
              <div key={i} className="relative bg-card rounded-xl p-6 border shadow-sm flex flex-col items-start mt-4 md:mt-0 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary text-primary-foreground font-bold flex items-center justify-center rounded-lg mb-6 -mt-10 md:mt-0 shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Real Product Preview Section */}
      <section className="py-24 px-4 bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Inside the Platform</h2>
            <p className="text-lg text-muted-foreground">DIA provides purpose-built interfaces designed for clarity, security, and action.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-card border rounded-2xl p-6 shadow-sm hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary"/> Citizen Dashboard</h3>
                <p className="text-muted-foreground mb-6">A clear, accessible view of active requests, case status, assigned professionals, and secure messages.</p>
                {/* Mockup */}
                <div className="border rounded-lg bg-background p-4 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-sm">Active Case #4928</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">Under Review</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><Scale className="w-4 h-4" /></div>
                    <div>
                      <div className="text-sm font-medium">Employment Dispute</div>
                      <div className="text-xs text-muted-foreground">Assigned to: Pending</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border rounded-2xl p-6 shadow-sm hover:border-primary/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Lawyer Dashboard</h3>
                <p className="text-muted-foreground mb-6">Professional workspace for managing assigned cases, reviewing new requests, and secure client communication.</p>
                {/* Mockup */}
                <div className="border rounded-lg bg-background p-4 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-sm">New Request Match</span>
                    <span className="text-xs text-muted-foreground">High Priority</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Family Law</span>
                    <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-md">Review Details</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#10172A] rounded-2xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <h3 className="text-2xl font-bold mb-8">Transparent Case Tracking</h3>
              <div className="space-y-6">
                {[
                  { title: "Request Submitted", active: true, done: true },
                  { title: "Under Review", active: true, done: true },
                  { title: "Professional Assigned", active: true, done: false },
                  { title: "Consultation / Assistance", active: false, done: false },
                  { title: "Resolved / Next Steps", active: false, done: false }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", step.done ? "bg-primary text-white" : step.active ? "border-2 border-primary text-primary" : "border-2 border-slate-600 text-slate-500")}>
                        {step.done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      {i < 4 && <div className={cn("w-0.5 h-8 mt-2", step.done ? "bg-primary" : "bg-slate-700")}></div>}
                    </div>
                    <div className={cn("pt-0.5 font-medium", step.active || step.done ? "text-white" : "text-slate-500")}>
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services / Legal Support Areas */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Areas of Support</h2>
              <p className="text-lg text-muted-foreground">Comprehensive assistance across critical legal domains.</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center text-primary font-medium hover:underline">
              View all services <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
              <HeartHandshake className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Family & Domestic Matters</h3>
              <p className="text-muted-foreground">Support for domestic disputes, custody arrangements, and domestic violence protection.</p>
            </div>
            <div className="bg-card border rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
              <Briefcase className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Employment Issues</h3>
              <p className="text-muted-foreground text-sm">Workplace disputes, unfair dismissal, and rights advocacy.</p>
            </div>
            <div className="bg-card border rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
              <Users className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Women's Rights</h3>
              <p className="text-muted-foreground text-sm">Specialized support prioritizing safety and empowerment.</p>
            </div>
            <div className="bg-card border rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
              <Scale className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Housing & Property</h3>
              <p className="text-muted-foreground text-sm">Eviction defense, tenant rights, and property disputes.</p>
            </div>
            <div className="bg-card border rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm">
              <FileText className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Documentation</h3>
              <p className="text-muted-foreground text-sm">Identity issues, visas, and critical record management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Verified Professional Network */}
      <section className="py-24 px-4 bg-[#0B1120] text-white border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center rounded-full border border-[#D97706]/30 bg-[#D97706]/10 px-3 py-1 text-sm font-medium text-[#D97706] mb-6">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Quality Assured
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">A network built on verification and accountability.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Every legal professional joining DIA undergoes rigorous verification. We ensure quality, credential authenticity, and ongoing accountability so you can trust the guidance you receive.
            </p>
            
            <div className="space-y-6">
              {[
                { step: "01", text: "Professional Registration & Identity Check" },
                { step: "02", text: "Bar Council Credential Review" },
                { step: "03", text: "Platform Background Verification" },
                { step: "04", text: "Ongoing Quality & Feedback Standards" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-slate-600 font-mono text-sm">{item.step}</div>
                  <div className="h-px flex-1 bg-slate-800"></div>
                  <div className="text-slate-300 text-sm font-medium">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Lawyer Profile Mockup */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative max-w-md ml-auto">
              <div className="absolute top-6 right-6 flex items-center gap-1 text-[#D97706] bg-[#D97706]/10 px-2 py-1 rounded-md text-xs font-bold">
                <ShieldCheck className="w-4 h-4" /> DIA Verified
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-primary">
                  <Users className="w-8 h-8 text-slate-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Adv. Sarah Jenkins</h4>
                  <p className="text-slate-400 text-sm">Family Law • 12 Yrs Experience</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Bar License</span>
                  <span className="text-slate-300 font-mono">#SJ-89244</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Availability</span>
                  <span className="text-green-400 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> Accepting Cases</span>
                </div>
                <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Security and Confidentiality */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border-4 border-dashed border-[#D97706]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <Shield className="w-24 h-24 text-primary relative z-10" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">Your legal information deserves protection.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We employ strict structural security principles to ensure your data remains confidential and your communications stay privileged.
            </p>
            <div className="space-y-4">
              {[
                "Confidential end-to-end case communication",
                "Strict document access controls and secure handling",
                "Privacy-focused workflows minimizing data exposure",
                "Professional accountability and mandatory compliance"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Partner / NGO / Institution */}
      <section className="py-24 px-4 border-y">
        <div className="max-w-7xl mx-auto bg-card border rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Extend legal access beyond individual cases.</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              DIA partners with NGOs, legal aid organizations, and community groups to coordinate legal assistance at scale, manage support programs, and track collective impact.
            </p>
            <div>
              <Link href="/partners" className={cn(buttonVariants({ size: 'lg', variant: 'default' }), "bg-[#0B1120] text-white hover:bg-slate-800")}>
                Partner with DIA
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 bg-muted p-12 lg:p-16 border-l flex flex-col justify-center">
            <h3 className="font-semibold text-lg mb-6 text-foreground">Ideal for:</h3>
            <ul className="space-y-4">
              {['NGOs & Non-profits', 'Legal Aid Organizations', 'Community Action Groups', 'Educational Institutions', 'CSR Programs'].map((item, i) => (
                <li key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <span className="font-medium">{item}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Impact / Human Story */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden relative border shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/90 backdrop-blur rounded-xl border text-sm shadow-sm">
                  <span className="block font-bold text-primary mb-1">Case #892-B</span>
                  <span className="text-muted-foreground">Housing & Eviction Defense</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Finding Support When It Mattered</h2>
              <blockquote className="text-xl leading-relaxed text-muted-foreground italic mb-6">
                "I didn't know where to turn when my landlord issued an illegal eviction notice. Through DIA, I connected with a verified property lawyer within 24 hours. They reviewed my documents securely, advised me on my rights, and intervened on my behalf. I kept my home."
              </blockquote>
              <div className="font-medium text-foreground">— Anonymized Platform User</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
