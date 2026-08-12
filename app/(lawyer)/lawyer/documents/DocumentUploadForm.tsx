'use client'

import { useActionState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormAlert } from '@/components/auth/FormAlert'
import { SubmitButton } from '@/components/auth/SubmitButton'
import { uploadLawyerDocuments } from '@/features/lawyer/actions'
import type { ActionState } from '@/features/auth/actions'
import { FileText, Image as ImageIcon, CreditCard, UserCircle } from 'lucide-react'

interface DocumentField {
  name: string
  label: string
  description: string
  icon: React.ElementType
}

const DOCUMENT_FIELDS: DocumentField[] = [
  {
    name: 'bar_certificate',
    label: 'Bar Council Certificate',
    description: 'Your current practising certificate. PDF, PNG or JPEG, max 10 MB.',
    icon: FileText,
  },
  {
    name: 'government_id',
    label: 'Government-issued ID',
    description: 'Passport, national ID or driver\'s licence. PDF, PNG or JPEG, max 10 MB.',
    icon: CreditCard,
  },
  {
    name: 'enrollment_certificate',
    label: 'Enrollment Certificate',
    description: 'Certificate of call to the bar or enrollment. PDF, PNG or JPEG, max 10 MB.',
    icon: ImageIcon,
  },
  {
    name: 'profile_photo',
    label: 'Profile Photo',
    description: 'A clear, recent photo of yourself. PNG or JPEG, max 10 MB.',
    icon: UserCircle,
  },
]

const initialState: ActionState = {}

interface DocumentUploadFormProps {
  lawyerProfileId: string
}

export function DocumentUploadForm({ lawyerProfileId }: DocumentUploadFormProps) {
  const [state, formAction] = useActionState(uploadLawyerDocuments, initialState)

  return (
    <div className="space-y-6">
      <FormAlert error={state.error} success={state.success} />

      <form action={formAction} className="space-y-5" encType="multipart/form-data" noValidate>
        {DOCUMENT_FIELDS.map(({ name, label, description, icon: Icon }) => (
          <div
            key={name}
            className="rounded-xl border bg-background p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <Label htmlFor={name} className="font-medium text-foreground">
                  {label}
                </Label>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            <Input
              id={name}
              name={name}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="cursor-pointer"
              required
            />
          </div>
        ))}

        <SubmitButton className="w-full" pendingLabel="Uploading documents…">
          Submit application
        </SubmitButton>
      </form>
    </div>
  )
}
