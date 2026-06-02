'use client'

import { m, useReducedMotion } from 'framer-motion'
import { scrollToId } from '@/lib/lenis'
import {
  AnaglyphHeading,
  CornerTicks,
  NumberedCaption,
} from '@/components/decor/ornaments'

type Door = {
  index: '01' | '02'
  href: '#menu' | '#recipes'
  target: 'menu' | 'recipes'
  eyebrow: string
  title: string
  blurb: string
  cta: string
}

const DOORS: Door[] = [
  {
    index: '01',
    href: '#menu',
    target: 'menu',
    eyebrow: 'ΤΟ ΜΕΝΟΥ',
    title: 'Δες το Μενού',
    blurb: 'Όλα τα πιάτα και ροφήματα — με τα υλικά, την ιστορία και τη φιλοσοφία τους.',
    cta: 'Προς το μενού →',
  },
  {
    index: '02',
    href: '#recipes',
    target: 'recipes',
    eyebrow: 'ΑΠΟ ΤΗΝ ΚΟΥΖΙΝΑ ΜΑΣ',
    title: 'Συνταγές & κόλπα με M.E.S.S.',
    blurb: 'Κόλπα κουζίνας και συνταγές M.E.S.S. για να τα φτιάξεις στο σπίτι.',
    cta: 'Προς συνταγές →',
  },
]

/**
 * Fullscreen split chooser: two doors fill the viewport (side by side on
 * desktop, stacked halves on mobile). Picking one scrolls to that section.
 */
export default function ChoiceDoors() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Επιλογές πλοήγησης"
      className="relative grid h-[100svh] grid-cols-1 grid-rows-2 bg-forest md:grid-cols-2 md:grid-rows-1"
    >
      <h1 className="sr-only">Φαγητό ως Φάρμακο — M.E.S.S.</h1>

      {DOORS.map((door, i) => {
        const side = i === 0 ? 'left' : 'right'
        const isFirst = i === 0
        return (
          <a
            key={door.target}
            href={door.href}
            onClick={(e) => {
              e.preventDefault()
              scrollToId(door.target)
            }}
            className="ui-focus-ring group relative block h-full w-full overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  side === 'left'
                    ? 'linear-gradient(120deg, #0e2208 0%, #1d3a16 60%, #2d5a27 100%)'
                    : 'linear-gradient(240deg, #0e2208 0%, #1d3a16 60%, #2d5a27 100%)',
              }}
            />

            {/* hover wash — brightens the chosen half */}
            <m.span
              aria-hidden
              className="absolute inset-0 bg-white"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={reduce ? undefined : { opacity: 0.06 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* mustard seam between the two doors */}
            {isFirst && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-mustard/50 md:inset-x-auto md:inset-y-0 md:right-0 md:h-auto md:w-px"
              />
            )}

            <CornerTicks />

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 p-10 text-center md:p-16">
              <NumberedCaption index={door.index} label={door.eyebrow} className="mt-0" />

              <AnaglyphHeading
                as="h2"
                tone="dark"
                className="font-serif text-[clamp(30px,4vw,56px)] leading-[1.08] tracking-tight"
              >
                {door.title}
              </AnaglyphHeading>

              <p className="max-w-[32ch] font-serif text-[clamp(15px,1.2vw,18px)] italic leading-relaxed text-charcoal/70">
                {door.blurb}
              </p>

              <span className="mt-2 inline-flex items-center font-sans text-[12px] uppercase tracking-[0.18em] text-mustard transition-colors duration-300 group-hover:text-charcoal">
                {door.cta}
              </span>
            </div>
          </a>
        )
      })}
    </section>
  )
}
