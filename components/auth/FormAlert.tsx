import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface FormAlertProps {
  error?: string
  success?: string
}

/**
 * Displays a top-level error or success banner returned from a Server Action.
 */
export function FormAlert({ error, success }: FormAlertProps) {
  if (error) {
    return (
      <Alert variant="destructive" role="alert" aria-live="assertive">
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (success) {
    return (
      <Alert
        className="border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
        <AlertDescription>{success}</AlertDescription>
      </Alert>
    )
  }

  return null
}
