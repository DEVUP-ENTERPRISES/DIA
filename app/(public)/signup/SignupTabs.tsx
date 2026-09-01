'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Scale, Lock, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SignupForm } from '@/components/auth/SignupForm'

type Role = 'civilian' | 'lawyer'

interface SignupTabsProps {
  initialRole?: Role
}

const TABS: { role: Role; label: string; icon: typeof Users }[] = [
  { role: 'civilian', label: 'I need legal help', icon: Users },
  { role: 'lawyer', label: 'I am a lawyer', icon: Scale },
]

export function SignupTabs({ initialRole = 'civilian' }: SignupTabsProps) {
  const [role, setRole] = useState<Role>(initialRole)

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Choose how you&apos;d like to get started
        </p>
      </div>

      {/* Role toggle */}
      <div
        role="tablist"
        aria-label="Account type"
        className="grid grid-cols-2 gap-1 rounded-xl border bg-muted/50 p-1"
      >
        {TABS.map((tab) => {
          const active = role === tab.role
          return (
            <button
              key={tab.role}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setRole(tab.role)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Context line for the selected role */}
      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        {role === 'civilian' ? (
          <>
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            Instant, confidential access. No approval needed. Everything you share stays private.
          </>
        ) : (
          <>
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            After creating your account, you&apos;ll complete a profile and upload documents for verification.
          </>
        )}
      </p>

      {/* Active form */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <SignupForm role={role} />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
