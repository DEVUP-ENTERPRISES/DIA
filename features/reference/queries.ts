import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { CountryRow } from '@/types/database'

/**
 * Returns the list of countries (name + international dialling code) for the
 * onboarding selectors. Ordered by sort_order (India first) then name.
 */
export async function getCountries(): Promise<CountryRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('countries')
    .select('code, name, dial_code, sort_order')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (error || !data) return []
  return data as CountryRow[]
}
