'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FieldError } from '@/components/auth/FieldError'
import type { CountryRow } from '@/types/database'

interface CountrySelectProps {
  countries: CountryRow[]
  name?: string
  label?: string
  errors?: string[]
  defaultValue?: string
}

/**
 * Country name dropdown backed by the DB countries table. Submits the country
 * name (matching the existing free-text `country` column) under `name`.
 */
export function CountrySelect({
  countries,
  name = 'country',
  label = 'Country',
  errors,
  defaultValue,
}: CountrySelectProps) {
  const [value, setValue] = useState(defaultValue ?? '')

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={(v) => setValue(v ?? '')}>
        <SelectTrigger id={name}>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((c) => (
            <SelectItem key={c.code} value={c.name}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={errors} />
    </div>
  )
}
