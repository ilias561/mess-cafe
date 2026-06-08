'use client'

import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { scrollToId } from '@/lib/lenis'
import {
  AnaglyphHeading,
  CornerTicks,
  NumberedCaption,
} from '@/components/decor/ornaments'
import { FadeImage } from '@/components/fade-image'
import { EASE } from '@/lib/motion'

type Door = {
  index: '01' | '02'
  href: '#menu' | '#tips'
  target: 'menu' | 'tips'
  eyebrow: string
  title: string
  blurb: string
  cta: string
  image: string
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
    image: '/images/menu/piata-0028.jpg',
  },
  {
    index: '02',
    href: '#tips',
    target: 'tips',
    eyebrow: 'ΑΠΟ ΤΗΝ ΚΟΥΖΙΝΑ ΜΑΣ',
    title: 'Tips & κόλπα κουζίνας',
    blurb: 'Κόλπα κουζίνας και tips από το M.E.S.S. για να τα φτιάξεις στο σπίτι.',
    cta: 'Προς τα tips →',
    image: '/images/recipes-door.jpg',
  },
]

/**
 * Fullscreen split chooser: two photo "doors" fill the viewport (side by side on
 * desktop, stacked halves on mobile). Each previews where it leads; hovering one
 * brightens + zooms its photo and dims the other. Picking one scrolls to it.
 */
export default function ChoiceDoors() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      aria-label="Επιλογές πλοήγησης"
      className="relative grid h-[100svh] grid-cols-1 grid-rows-2 bg-forest md:grid-cols-2 md:grid-rows-1"
    >
      <h1 className="sr-only">Φαγητό ως Φάρμακο — M.E.S.S.</h1>

      {DOORS.map((door, i) => {
        const isFirst = i === 0
        const dimmed = hovered !== null && hovered !== i
        return (
          <a
            key={door.target}
            href={door.href}
            onClick={(e) => {
              e.preventDefault()
              scrollToId(door.target)
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            className="ui-focus-ring group relative block h-full w-full overflow-hidden"
          >
            {/* full-bleed photo — zooms when this door is hovered. FadeImage serves
                the pre-generated avif/webp derivatives (static export) + blur-up,
                instead of the multi-hundred-KB raw JPEG. Both doors are above the
                fold, so load eagerly; the first is the LCP candidate (priority). */}
            <m.div
              aria-hidden
              className="absolute inset-0"
              initial={false}
              animate={{ scale: !reduce && hovered === i ? 1.06 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <FadeImage
                src={door.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={isFirst}
                loading={isFirst ? undefined : 'eager'}
                className="object-cover"
              />
            </m.div>

            {/* dark scrim for legibility — lifts a touch on hover, deepens when dimmed */}
            <m.div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(14,34,8,0.88) 0%, rgba(14,34,8,0.5) 50%, rgba(14,34,8,0.8) 100%)',
              }}
              initial={false}
              animate={{ opacity: hovered === i ? 0.82 : 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            />

            {/* dim wash on the non-hovered door */}
            <m.div
              aria-hidden
              className="absolute inset-0 bg-canopy-night"
              initial={false}
              animate={{ opacity: dimmed ? 0.5 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            />

            {/* mustard seam between the two doors */}
            {isFirst && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-mustard/50 md:inset-x-auto md:inset-y-0 md:right-0 md:h-auto md:w-px"
              />
            )}

            <CornerTicks />

            <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center gap-3 px-5 py-4 text-center md:gap-6 md:p-16">
              <NumberedCaption index={door.index} label={door.eyebrow} className="mt-0" />

              <AnaglyphHeading
                as="h2"
                tone="dark"
                className="font-serif text-[clamp(24px,4vw,56px)] leading-[1.08] tracking-tight"
              >
                {door.title}
              </AnaglyphHeading>

              <p className="max-w-[32ch] font-serif text-[clamp(13px,1.2vw,18px)] italic leading-snug text-charcoal/80 md:leading-relaxed max-md:line-clamp-2">
                {door.blurb}
              </p>

              <span className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-2 px-3 font-sans text-[12px] uppercase tracking-[0.16em] text-mustard transition-colors duration-250 group-hover:text-charcoal md:mt-2 md:min-h-0 md:px-0">
                {door.cta}
              </span>
            </div>
          </a>
        )
      })}
    </section>
  )
}
