'use client'

import { useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

/**
 * Returns a stable browser Supabase client instance.
 * The underlying createClient() is already a singleton per tab,
 * but wrapping in useMemo documents the intent and prevents
 * accidental recreation on re-renders.
 */
export function useSupabase() {
  return useMemo(() => createClient(), [])
}
