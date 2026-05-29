'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { scrollToId } from '@/lib/lenis'
import {
  AnaglyphHeading,
  CornerTicks,
  Eyebrow,
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

export default function ChoiceDoors() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Επιλογές πλοήγησης"
      className="relative bg-forest px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center md:mb-16">
          <h1 className="sr-only">Φαγητό ως Φάρμακο — M.E.S.S.</h1>
          <Eyebrow tone="light">ΦΑΓΗΤΟ ΩΣ ΦΑΡΜΑΚΟ</Eyebrow>
          <AnaglyphHeading
            as="h2"
            tone="dark"
            className="mt-4 font-serif text-[clamp(34px,5vw,64px)] leading-[1.05] tracking-tight"
          >
            Τι θέλεις να δεις;
          </AnaglyphHeading>
          <p className="mx-auto mt-5 max-w-[52ch] font-serif text-[clamp(15px,1.3vw,18px)] italic leading-relaxed text-charcoal/75">
            Διάλεξε μία από τις δύο πόρτες. Μπορείς πάντα να γυρίσεις πίσω.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {DOORS.map((door, i) => {
            const side = i === 0 ? 'left' : 'right'
            return (
              <a
                key={door.target}
                href={door.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(door.target)
                }}
                className="group relative block aspect-[3/4] md:aspect-[4/5]"
                style={{ perspective: '1200px' }}
              >
                <motion.div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    background:
                      side === 'left'
                        ? 'linear-gradient(120deg, #0e2208 0%, #1d3a16 60%, #2d5a27 100%)'
                        : 'linear-gradient(240deg, #0e2208 0%, #1d3a16 60%, #2d5a27 100%)',
                    transformOrigin: side === 'left' ? 'left center' : 'right center',
                  }}
                  initial={false}
                  whileHover={reduce ? undefined : { rotateY: side === 'left' ? -4 : 4 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-y-0 ${
                      side === 'left' ? 'right-0' : 'left-0'
                    } w-px bg-mustard/60`}
                  />

                  <CornerTicks />

                  <div className="relative z-10 flex h-full flex-col items-center justify-between p-8 text-center md:p-12">
                    <NumberedCaption index={door.index} label={door.eyebrow} className="mt-0" />

                    <div className="flex flex-col items-center gap-5">
                      <AnaglyphHeading
                        as="h2"
                        tone="dark"
                        className="font-serif text-[clamp(26px,3vw,38px)] leading-[1.1] tracking-tight"
                      >
                        {door.title}
                      </AnaglyphHeading>
                      <p className="max-w-[28ch] font-serif text-[clamp(14px,1.1vw,16px)] italic leading-relaxed text-charcoal/80">
                        {door.blurb}
                      </p>
                    </div>

                    <span className="font-sans text-[12px] uppercase tracking-[0.28em] text-mustard transition-colors duration-300 group-hover:text-charcoal">
                      {door.cta}
                    </span>
                  </div>
                </motion.div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
