import Link from 'next/link'
import { Scale } from 'lucide-react'
import { LogoutButton } from './LogoutButton'
import type { UserRole } from '@/types/auth'

interface NavItem {
  href: string
  label: string
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  admin: [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/lawyers', label: 'Lawyers' },
    { href: '/admin/moderators', label: 'Moderators' },
    { href: '/admin/users', label: 'Users' },
  ],
  moderator: [
    { href: '/moderator/dashboard', label: 'Dashboard' },
    { href: '/moderator/lawyers', label: 'Applications' },
  ],
  lawyer: [
    { href: '/lawyer/dashboard', label: 'Dashboard' },
  ],
  civilian: [
    { href: '/dashboard', label: 'Dashboard' },
  ],
}

interface DashboardShellProps {
  role: UserRole
  fullName: string | null
  children: React.ReactNode
}

export function DashboardShell({ role, fullName, children }: DashboardShellProps) {
  const navItems = NAV_ITEMS[role] ?? []

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav bar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground shrink-0"
          >
            <Scale className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>DIA</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-1 flex-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User + logout */}
          <div className="flex items-center gap-3 shrink-0">
            {fullName && (
              <span className="hidden sm:block text-sm text-muted-foreground truncate max-w-[160px]">
                {fullName}
              </span>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8">
        {children}
      </main>
    </div>
  )
}
