'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

type Area = readonly [title: string, description: string]

interface HorizontalAreasProps {
  areas: readonly Area[]
}

/**
 * "Areas of assistance" as individual boxes that scroll horizontally, driven
 * by vertical page scroll. The section is taller than the viewport; while it's
 * pinned, scrolling down translates the row of cards to the left.
 *
 * Degrades gracefully:
 *  - reduced motion / small screens → a normal horizontal swipe rail.
 */
export function HorizontalAreas({ areas }: HorizontalAreasProps) {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Move the track left as the section scrolls. The travel completes at ~90%
  // of the section so the last card settles before the pin releases, avoiding
  // a stretch of idle scrolling at the end. Tuned for 5 cards.
  const x = useTransform(scrollYProgress, [0, 0.9], ['0%', '-66%'])

  const header = (
    <div className="flex items-baseline justify-between border-b border-border py-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
      <span className="flex items-center gap-2 font-semibold text-foreground">
        <span className="h-1.5 w-1.5 bg-accent-amber" aria-hidden="true" />
        Areas of assistance
      </span>
      <Link href="/legal" className="hover:text-primary">
        View all
      </Link>
    </div>
  )

  const cards = areas.map(([title, description], index) => (
    <Link
      key={title}
      href="/signup?role=civilian"
      className="group relative flex w-[78vw] shrink-0 flex-col gap-3 overflow-hidden border border-border bg-card p-7 transition-colors hover:border-primary/50 hover:bg-accent sm:w-[380px] md:w-[420px]"
    >
      {/* Ghost numeral - editorial motif */}
      <span
        className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[7rem] font-semibold leading-none text-accent-amber/10"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="font-mono text-xs font-semibold text-accent-amber">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-serif text-2xl font-semibold text-foreground group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-muted-foreground group-hover:text-primary">
        Request help <ChevronRight className="size-3.5" />
      </span>
    </Link>
  ))

  // Fallback: simple horizontal swipe rail (no scroll-jacking).
  if (reduceMotion) {
    return (
      <section className="border-b border-border bg-background px-5 md:px-8">
        <div className="mx-auto max-w-7xl">
          {header}
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto py-8">
            {cards.map((card) => (
              <div key={card.key} className="snap-start">
                {card}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] border-b border-border bg-background"
      aria-label="Areas of assistance"
    >
      {/* Pinned viewport-height stage */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 md:px-8">
        <div className="mx-auto w-full max-w-7xl">{header}</div>
        <div className="mx-auto mt-10 w-full max-w-7xl">
          <motion.div style={{ x }} className="flex gap-6">
            {cards}
          </motion.div>
        </div>
        <p className="mx-auto mt-8 w-full max-w-7xl text-xs text-muted-foreground">
          Keep scrolling to browse all areas.
        </p>
      </div>
    </section>
  )
}
