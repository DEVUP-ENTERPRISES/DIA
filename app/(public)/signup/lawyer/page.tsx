import type { Metadata } from 'next'
import Link from 'next/link'
import { LawyerSignupForm } from './LawyerSignupForm'
import { ShieldCheck, UserCheck, FileText, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = { title: 'Join the DIA Professional Network' }

export default function LawyerSignupPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Side: Onboarding Info Panel */}
        <div className="w-full lg:w-5/12 bg-[#0B1120] text-white p-8 lg:p-16 flex flex-col border-r border-slate-800">
          <div className="mb-12">
            <div className="inline-flex items-center rounded-full bg-[#D97706]/10 px-3 py-1 text-sm font-medium text-[#D97706] mb-6">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verification Required
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Join the DIA Professional Network
            </h1>
            <p className="text-slate-400 text-lg">
              Partner with us to provide critical legal support. We maintain rigorous quality standards to protect our users.
            </p>
          </div>

          <div className="space-y-8 flex-1">
            <h3 className="text-xl font-semibold mb-6">Onboarding Process</h3>
            
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {/* Step 1: Current */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-[#10172A] text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-primary/30 bg-primary/10 shadow-sm ml-4 md:ml-0 md:mr-8 md:group-even:ml-8 md:group-odd:mr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <UserCheck className="w-4 h-4 text-primary" />
                    <h4 className="font-bold text-white text-sm">Create Account</h4>
                  </div>
                  <p className="text-slate-400 text-xs">Set up your secure login credentials.</p>
                </div>
              </div>

              {/* Step 2: Future */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-700 bg-[#10172A] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm ml-4 md:ml-0 md:mr-8 md:group-even:ml-8 md:group-odd:mr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <h4 className="font-bold text-slate-300 text-sm">Professional Profile</h4>
                  </div>
                  <p className="text-slate-500 text-xs">Credentials, areas of practice, and experience.</p>
                </div>
              </div>

              {/* Step 3: Future */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-700 bg-[#10172A] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm ml-4 md:ml-0 md:mr-8 md:group-even:ml-8 md:group-odd:mr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-slate-500" />
                    <h4 className="font-bold text-slate-300 text-sm">Verification</h4>
                  </div>
                  <p className="text-slate-500 text-xs">Bar registration and document review.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-sm text-slate-500">
            By applying, you agree to our stringent quality standards and ethical guidelines.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 flex items-center justify-center p-8 lg:p-16 bg-muted/10">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Step 1: Account Creation</h2>
              <p className="text-sm text-muted-foreground">
                Enter your professional email to begin the onboarding process. You will complete your professional profile inside the portal.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <LawyerSignupForm />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <p className="text-center text-sm text-muted-foreground">
                Already have an approved account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in to Lawyer Portal
                </Link>
              </p>
              <p className="text-center text-xs text-muted-foreground">
                Not a legal professional?{' '}
                <Link
                  href="/signup/civilian"
                  className="font-medium text-foreground hover:underline"
                >
                  Sign up as a citizen to get help
                </Link>
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
