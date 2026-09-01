'use client'

import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
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

interface PhoneFieldProps {
  countries: CountryRow[]
  /** Name of the hidden field that receives the combined "+<code> <number>". */
  name?: string
  label?: string
  errors?: string[]
  /** Default dial code to preselect (e.g. '+91'). */
  defaultDialCode?: string
  required?: boolean
}

/**
 * Phone input with a DB-backed dialling-code selector. Submits a single
 * combined value ("+91 9876543210") under `name`, so it drops into the
 * existing profiles.phone column with no schema change.
 */
export function PhoneField({
  countries,
  name = 'phone',
  label = 'Phone number',
  errors,
  defaultDialCode,
  required,
}: PhoneFieldProps) {
  // Unique dial codes, keeping the DB order (India first).
  const dialOptions = useMemo(() => {
    const seen = new Set<string>()
    const out: { dial_code: string; label: string }[] = []
    for (const c of countries) {
      if (seen.has(c.dial_code)) continue
      seen.add(c.dial_code)
      out.push({ dial_code: c.dial_code, label: `${c.code} ${c.dial_code}` })
    }
    return out
  }, [countries])

  const initialDial =
    defaultDialCode ?? dialOptions[0]?.dial_code ?? ''

  const [dialCode, setDialCode] = useState(initialDial)
  const [number, setNumber] = useState('')

  const combined = number.trim() ? `${dialCode} ${number.trim()}`.trim() : ''

  return (
    <div className="space-y-1.5">
      <Label htmlFor={`${name}_number`}>{label}</Label>
      {/* Combined value submitted with the form. */}
      <input type="hidden" name={name} value={combined} />

      <div className="flex gap-2">
        <div className="w-28 shrink-0">
          <Select
            value={dialCode}
            onValueChange={(value) => setDialCode(value ?? '')}
          >
            <SelectTrigger aria-label="Country code">
              <SelectValue placeholder="Code" />
            </SelectTrigger>
            <SelectContent>
              {dialOptions.map((opt) => (
                <SelectItem key={opt.dial_code} value={opt.dial_code}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          id={`${name}_number`}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="9876543210"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required={required}
          className="flex-1"
        />
      </div>
      <FieldError errors={errors} />
    </div>
  )
}
