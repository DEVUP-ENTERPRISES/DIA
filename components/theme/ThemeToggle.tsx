'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

/**
 * Manual light/dark toggle. Follows the system preference until the user picks
 * one. Renders a stable placeholder before mount to avoid hydration mismatch.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={
        mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'
      }
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
        className,
      )}
    >
      {/* Render both and toggle visibility only after mount to stay SSR-safe. */}
      <Sun
        className={cn('size-4', !mounted || isDark ? 'hidden' : 'block')}
        aria-hidden="true"
      />
      <Moon
        className={cn('size-4', mounted && isDark ? 'block' : 'hidden')}
        aria-hidden="true"
      />
    </button>
  )
}
