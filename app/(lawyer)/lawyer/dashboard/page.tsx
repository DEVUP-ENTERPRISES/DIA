import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth/session'
import { getLawyerProfile } from '@/features/lawyer/queries'
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  MessageSquare,
  Search,
  Filter,
  MoreHorizontal,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Lawyer Dashboard | Professional Workspace' }

export default async function LawyerDashboardPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const profile = await getLawyerProfile(session.id)

  if (!profile || profile.application_status !== 'approved') {
    redirect('/lawyer/status/pending')
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Welcome, {session.full_name ?? 'Counsel'}
            <ShieldCheck className="w-5 h-5 text-green-600" aria-label="Verified Profile" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bar Council No: {profile.bar_council_number ?? '—'} •{' '}
            {profile.practice_areas?.join(', ') ?? 'General Practice'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-800 border border-green-200 px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
            Approved
          </div>
        </div>
      </div>

      {/* Case Overview Metrics — placeholder data for Phase 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Cases', value: '—' },
          { label: 'Pending Requests', value: '—' },
          { label: 'Unread Messages', value: '—' },
          { label: 'Resolved (YTD)', value: '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-background border rounded-lg p-5 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
            <div className="text-3xl font-bold text-foreground">{value}</div>
          </div>
        ))}
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Col: Case Tables */}
        <div className="lg:col-span-2 space-y-8">

          {/* Pending Requests placeholder */}
          <div className="bg-background border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b bg-muted/30 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">New Case Requests</h2>
            </div>
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              Case management features are coming in a future phase.
            </div>
          </div>

          {/* Active Cases placeholder */}
          <div className="bg-background border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-foreground">Active Cases</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search cases…"
                    className="pl-9 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-48"
                    disabled
                  />
                </div>
                <button className="p-1.5 border rounded-md hover:bg-muted text-muted-foreground" disabled>
                  <Filter className="w-4 h-4" aria-hidden="true" />
                </button>
                <button className="p-1.5 border rounded-md hover:bg-muted text-muted-foreground" disabled>
                  <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              Case tracking will be available in a future phase.
            </div>
          </div>
        </div>

        {/* Right Col: Activity Feed & Messages */}
        <div className="space-y-8">

          <div className="bg-background border rounded-xl shadow-sm p-5">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4" aria-hidden="true" /> Recent Messages
            </h2>
            <p className="text-sm text-muted-foreground">
              Messaging features are coming in a future phase.
            </p>
          </div>

          <div className="bg-background border rounded-xl shadow-sm p-5">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4" aria-hidden="true" /> Activity Feed
            </h2>
            <p className="text-sm text-muted-foreground">
              Your activity will appear here once case management is available.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
