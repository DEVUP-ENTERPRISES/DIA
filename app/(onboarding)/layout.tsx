import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { LogoutButton } from '@/components/shared/LogoutButton'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

/**
 * Layout for the onboarding flow. Requires an authenticated civilian or lawyer.
 * Admins/moderators never onboard, and fully-onboarded users are sent home.
 * (Per-role completion checks live in the onboarding page itself.)
 */
export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) redirect('/login')

  if (session.role === 'admin') redirect('/admin/dashboard')
  if (session.role === 'moderator') redirect('/moderator/dashboard')

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/logo/dia_logo.png"
              alt="DIA logo"
              width={72}
              height={72}
              quality={100}
              className="h-6 w-6 object-contain"
            />
            <span>DIA</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-10">
        {children}
      </main>
    </div>
  )
}
