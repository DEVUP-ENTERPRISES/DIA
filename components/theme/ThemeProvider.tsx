'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

/**
 * Wraps next-themes. Uses the `class` attribute strategy (adds `.dark` to
 * <html>), follows the OS preference by default, and allows a manual override
 * via the ThemeToggle.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
