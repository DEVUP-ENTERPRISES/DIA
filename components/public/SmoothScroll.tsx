'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Global smooth/eased scrolling via Lenis. Makes the whole page scroll feel
 * slower and more controlled instead of jumping per wheel notch.
 *
 * - Disabled when the user prefers reduced motion (falls back to native scroll).
 * - Framer Motion's useScroll reads window scroll, which Lenis still drives,
 *   so the pinned horizontal section keeps working.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const lenis = new Lenis({
      // Higher duration = slower, longer glide.
      duration: 1.4,
      // Gentle ease-out.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Slightly damp the wheel so each notch travels less.
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    })

    let frame = 0
    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
