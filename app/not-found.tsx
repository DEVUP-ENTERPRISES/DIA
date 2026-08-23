import Link from 'next/link'
import { Scale, ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Page Not Found' }

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10 text-foreground hover:opacity-80 transition-opacity">
        <Scale className="h-6 w-6 text-teal-500" aria-hidden="true" />
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-500">
          DIA
        </span>
      </Link>

      {/* 404 */}
      <p className="text-8xl font-extrabold text-muted-foreground/20 select-none leading-none mb-6">
        404
      </p>

      <h1 className="text-2xl font-bold text-foreground mb-2">
        Page not found
      </h1>
      <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Check the URL or head back home.
      </p>

      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'default' }), 'gap-2 rounded-full px-6')}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
    </div>
  )
}
