import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo/dia_logo.png"
              alt="DIA logo"
              width={96}
              height={96}
              quality={100}
              className="h-8 w-8 object-contain"
              priority
            />
            <span className="text-foreground">DIA</span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            <Link href="/" className="text-foreground transition-colors hover:text-primary">Home</Link>
            <Link href="/signup?role=civilian" className="text-muted-foreground transition-colors hover:text-primary">Get Legal Help</Link>
            <Link href="/resources/find-lawyer" className="text-muted-foreground transition-colors hover:text-primary">Find a Lawyer</Link>
            <Link href="/resources" className="text-muted-foreground transition-colors hover:text-primary">Resources</Link>
            <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">About DIA</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link href="/login" className="hidden md:block text-muted-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup?role=civilian"
              className={cn(buttonVariants({ variant: 'default', size: 'sm' }), "rounded-md px-4")}
            >
              Get Legal Help
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t border-stone-300 bg-[#292938] py-14 text-sm text-slate-300">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 md:grid-cols-3 md:px-8 lg:grid-cols-5 lg:gap-12">
          {/* Column 1 - Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Image
                src="/logo/dia_logo.png"
                alt="DIA logo"
                width={96}
                height={96}
                quality={100}
                className="h-8 w-8 object-contain"
              />
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
              <li><Link href="/signup?role=civilian" className="hover:text-white transition-colors">Request Assistance</Link></li>
              <li><Link href="/resources/find-lawyer" className="hover:text-white transition-colors">Find a Professional</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track a Request</Link></li>
            </ul>
          </div>

          {/* Column 3 - Professionals */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Professionals</h3>
            <ul className="space-y-3">
              <li><Link href="/signup?role=lawyer" className="hover:text-white transition-colors">Join DIA</Link></li>
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
        <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-700 px-5 pt-8 text-xs md:flex-row md:px-8">
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
