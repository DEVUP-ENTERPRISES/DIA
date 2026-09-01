'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Delay in seconds before the reveal starts. */
  delay?: number
}

/**
 * Fades and slides its children up the first time they scroll into view.
 * Respects prefers-reduced-motion (renders statically, no animation).
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
