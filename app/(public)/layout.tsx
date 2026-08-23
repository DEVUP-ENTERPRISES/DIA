import Link from 'next/link'
import { Scale, Phone, Mail, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Redesigned Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <Scale className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-foreground">DIA</span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-foreground transition-colors hover:text-primary">Home</Link>
            <Link href="/signup/civilian" className="text-muted-foreground transition-colors hover:text-primary">Get Legal Help</Link>
            <Link href="/resources/find-lawyer" className="text-muted-foreground transition-colors hover:text-primary">Find a Lawyer</Link>
            <Link href="/resources" className="text-muted-foreground transition-colors hover:text-primary">Resources</Link>
            <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">About DIA</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/login" className="hidden md:block text-muted-foreground hover:text-primary transition-colors">
              Lawyer Portal
            </Link>
            <Link href="/login" className="hidden md:block text-muted-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup/civilian"
              className={cn(buttonVariants({ variant: 'default', size: 'sm' }), "bg-primary hover:bg-primary/90 text-white")}
            >
              Get Legal Help
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Structured Footer */}
      <footer className="bg-[#0B1120] text-slate-400 py-16 text-sm border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1 - Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Scale className="h-6 w-6 text-primary" aria-hidden="true" />
              <span>DIA</span>
            </Link>
            <p className="leading-relaxed">
              Digital Inclusive Aid is a secure legal infrastructure platform connecting individuals with verified legal professionals.
            </p>
          </div>

          {/* Column 2 - Get Help */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Get Help</h3>
            <ul className="space-y-3">
              <li><Link href="/signup/civilian" className="hover:text-white transition-colors">Request Assistance</Link></li>
              <li><Link href="/resources/find-lawyer" className="hover:text-white transition-colors">Find a Professional</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track a Request</Link></li>
            </ul>
          </div>

          {/* Column 3 - Professionals */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Professionals</h3>
            <ul className="space-y-3">
              <li><Link href="/signup/lawyer" className="hover:text-white transition-colors">Join DIA</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Lawyer Portal</Link></li>
              <li><Link href="/about/verification" className="hover:text-white transition-colors">Verification Process</Link></li>
            </ul>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/resources/guides" className="hover:text-white transition-colors">Legal Guides</Link></li>
              <li><Link href="/resources/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/resources/community" className="hover:text-white transition-colors">Community Resources</Link></li>
            </ul>
          </div>

          {/* Column 5 - Organization */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Organization</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About DIA</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Partnerships</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mx-auto max-w-7xl px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Digital Inclusive Aid. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="/legal-disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
