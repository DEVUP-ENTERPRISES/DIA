'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel?: string
}

/**
 * A submit button that disables itself and shows a spinner while
 * a parent form's Server Action is in flight (via useFormStatus).
 */
export function SubmitButton({
  children,
  pendingLabel,
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={className}
      aria-disabled={pending}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          <span>{pendingLabel ?? 'Please wait…'}</span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
