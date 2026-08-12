'use client'

import { useActionState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/auth/FormAlert'
import { reviewApplication } from '@/features/moderator/actions'
import type { ActionState } from '@/features/auth/actions'
import { CheckCircle2, PauseCircle, XCircle } from 'lucide-react'

interface ReviewPanelProps {
  lawyerProfileId: string
  currentStatus: string
}

const initialState: ActionState = {}

export function ReviewPanel({ lawyerProfileId, currentStatus }: ReviewPanelProps) {
  const [state, formAction] = useActionState(reviewApplication, initialState)

  return (
    <div className="rounded-xl border bg-background p-6 space-y-5">
      <div>
        <h2 className="font-semibold text-foreground">Review Decision</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Current status:{' '}
          <span className="font-medium capitalize text-foreground">{currentStatus}</span>
        </p>
      </div>

      <FormAlert error={state.error} success={state.success} />

      <form action={formAction} className="space-y-4" noValidate>
        {/* Hidden lawyer profile id */}
        <input type="hidden" name="lawyer_profile_id" value={lawyerProfileId} />

        {/* Notes */}
        <div className="space-y-1.5">
          <Label htmlFor="review_notes">
            Notes{' '}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Textarea
            id="review_notes"
            name="review_notes"
            rows={3}
            placeholder="Add a note visible to the lawyer if held or rejected…"
          />
        </div>

        {/* Action buttons — each sets a hidden action value via formAction override */}
        <div className="flex flex-wrap gap-3">
          <ActionButton
            formAction={formAction}
            actionValue="approved"
            icon={CheckCircle2}
            label="Approve"
            className="bg-green-600 hover:bg-green-700 text-white border-green-600"
          />
          <ActionButton
            formAction={formAction}
            actionValue="hold"
            icon={PauseCircle}
            label="Hold"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
          />
          <ActionButton
            formAction={formAction}
            actionValue="rejected"
            icon={XCircle}
            label="Reject"
            className="bg-red-600 hover:bg-red-700 text-white border-red-600"
          />
        </div>
      </form>
    </div>
  )
}

// Individual action button — includes a hidden `action` input so the server
// knows which decision was made when clicked.
function ActionButton({
  formAction,
  actionValue,
  icon: Icon,
  label,
  className,
}: {
  formAction: (payload: FormData) => void
  actionValue: string
  icon: React.ElementType
  label: string
  className?: string
}) {
  return (
    <button
      type="submit"
      formAction={(fd) => {
        fd.set('action', actionValue)
        formAction(fd)
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${className}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}
