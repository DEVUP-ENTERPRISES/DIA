import Link from 'next/link'
import { Scale, Phone, Mail } from 'lucide-react'
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
      <header className="border-b bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <Scale className="h-6 w-6 text-teal-500" aria-hidden="true" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-500">DIA</span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-teal-600 border-b-2 border-teal-600 py-1">Home</Link>
            <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              Legal
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
            </Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/signup/lawyer"
              className={cn(buttonVariants({ variant: 'default' }), "bg-green-600 hover:bg-green-700 text-white shadow-sm")}
            >
              Register as Lawyer
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: 'default' }), "bg-blue-600 hover:bg-blue-700 text-white shadow-sm")}
            >
              Lawyer Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Redesigned Footer */}
      <footer className="bg-[#10172A] text-slate-300 py-16 text-sm">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side */}
          <div className="space-y-6 max-w-md">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Scale className="h-6 w-6 text-teal-400" aria-hidden="true" />
              <span>DIA</span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Digital Inclusive Aid provides premium, accessible, and uncompromisingly secure legal support for all, specializing in empowering women and vulnerable groups.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-400" />
                <span>24/7 Helpline: 8522951739</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-400" />
                <span>support@dia-legal.org</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:ml-auto">
            <h3 className="font-semibold text-white mb-4 text-base">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/legal" className="hover:text-white transition-colors">Legal Support</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Find a Lawyer</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Safe Zones</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mx-auto max-w-7xl px-4 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Digital Inclusive Aid. All rights reserved.</p>
          <p>Elevating the standard of <span className="text-pink-500 font-medium">justice</span> for everyone.</p>
        </div>
      </footer>
    </div>
  )
}
