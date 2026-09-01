'use client'

import { useCallback } from 'react'

interface AnchorLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** The id of the target element to scroll to, without the leading '#'. */
  targetId: string
}

/**
 * A same-page anchor link that scrolls smoothly to a target element and
 * updates the URL hash exactly once.
 *
 * Using next/link for in-page hashes can append the hash to an existing one
 * (e.g. `#how-it-works#how-it-works`). This handles the scroll and hash
 * ourselves to keep the URL clean.
 */
export function AnchorLink({ targetId, children, ...props }: AnchorLinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Let modified clicks (new tab, etc.) behave normally.
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = document.getElementById(targetId)
      if (!target) return

      event.preventDefault()

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })

      // Set the hash once, without adding a new history entry that stacks hashes.
      history.replaceState(null, '', `#${targetId}`)
    },
    [targetId],
  )

  return (
    <a href={`#${targetId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
