import type { Metadata } from 'next'
import Link from 'next/link'
import { CivilianSignupForm } from './CivilianSignupForm'
import { Lock, Shield, EyeOff, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Get Legal Help | DIA' }

export default function CivilianSignupPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-muted/10">
      
      {/* Top Progress Bar */}
      <div className="bg-background border-b px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between text-sm font-medium">
            <div className="flex items-center text-primary">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">1</div>
              Account Creation
            </div>
            <div className="h-px bg-border flex-1 mx-4"></div>
            <div className="flex items-center text-muted-foreground">
              <div className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center text-xs mr-2">2</div>
              Legal Need
            </div>
            <div className="h-px bg-border flex-1 mx-4"></div>
            <div className="flex items-center text-muted-foreground hidden sm:flex">
              <div className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center text-xs mr-2">3</div>
              Details
            </div>
            <div className="h-px bg-border flex-1 mx-4 hidden sm:block"></div>
            <div className="flex items-center text-muted-foreground hidden sm:flex">
              <div className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center text-xs mr-2">4</div>
              Review
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full p-4 lg:p-8 gap-8">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-7/12 order-2 lg:order-1">
          <div className="bg-background border rounded-2xl p-6 md:p-10 shadow-sm">
            <div className="space-y-2 mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Create your secure account</h1>
              <p className="text-muted-foreground">
                Before you tell us about your situation, we need to create a secure account to keep your information confidential.
              </p>
            </div>

            <CivilianSignupForm />

            <div className="space-y-4 pt-8 mt-8 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Already have an account?</span>
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in securely
                </Link>
              </div>
              <div className="flex items-center justify-between text-xs pt-4">
                <span className="text-muted-foreground">Are you a lawyer?</span>
                <Link
                  href="/signup/lawyer"
                  className="font-medium text-foreground hover:underline"
                >
                  Join the Professional Network
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
            <button className="flex items-center hover:text-foreground transition-colors">
              Save and continue later <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Right Side: Privacy Panel */}
        <div className="w-full lg:w-5/12 order-1 lg:order-2 space-y-6">
          <div className="bg-[#10172A] text-white rounded-2xl p-8 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Your Privacy is Protected</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Confidential Environment</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Everything you share with DIA is encrypted and strictly confidential. Your information is never sold or shared publicly.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <EyeOff className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Safe Exit Feature</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">If you need to leave this page quickly for your safety, use the "Quick Exit" button located in your browser, or close the tab.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h4 className="font-semibold text-primary text-sm mb-2">Why do we need an account?</h4>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              Legal issues require continuity. An account allows you to safely track your case progress, communicate securely with matched professionals, and upload necessary documents without risking exposure.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
