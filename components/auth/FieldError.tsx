interface FieldErrorProps {
  errors?: string[]
}

/**
 * Renders per-field validation error messages from Server Action state.
 */
export function FieldError({ errors }: FieldErrorProps) {
  if (!errors?.length) return null
  return (
    <ul className="mt-1 space-y-0.5" role="alert" aria-live="polite">
      {errors.map((e) => (
        <li key={e} className="text-sm text-destructive">
          {e}
        </li>
      ))}
    </ul>
  )
}
