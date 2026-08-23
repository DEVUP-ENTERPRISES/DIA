'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Scale, RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to server monitoring in production
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10 text-foreground hover:opacity-80 transition-opacity">
        <Scale className="h-6 w-6 text-teal-500" aria-hidden="true" />
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-500">
          DIA
        </span>
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-2">
        Something went wrong
      </h1>
      <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
        An unexpected error occurred. You can try again or return to the home page.
        If this keeps happening, please contact support.
      </p>

      {process.env.NODE_ENV === 'development' && error.message && (
        <div className="mb-6 max-w-md rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-xs text-destructive font-mono break-all">
          {error.message}
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={reset}
          variant="default"
          className="gap-2 rounded-full px-6"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'outline' }), 'gap-2 rounded-full px-6')}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </div>
  )
}
