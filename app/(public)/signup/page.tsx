import type { Metadata } from 'next'
import { SignupTabs } from './SignupTabs'

export const metadata: Metadata = { title: 'Create an Account' }

type Role = 'civilian' | 'lawyer'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  const { role } = await searchParams
  const initialRole: Role = role === 'lawyer' ? 'lawyer' : 'civilian'

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <SignupTabs initialRole={initialRole} />
    </div>
  )
}
