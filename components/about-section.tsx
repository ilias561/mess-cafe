'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from '@/lib/motion'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const

/* ── M.E.S.S. acronym rows ── */
const acronym = [
  { letter: 'M', word: 'Mindful', sub: 'Φαγητό φτιαγμένο με πρόθεση' },
  { letter: 'E', word: 'Elevating', sub: 'Εμπειρία που σε ανυψώνει' },
  { letter: 'S', word: 'Specialty', sub: 'Καφές ανώτατης ποιότητας' },
  { letter: 'S', word: 'Social', sub: 'Χώρος για αληθινή σύνδεση' },
]

/* ── 4 pillars ── */
const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" />
        <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" />
        <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
      </svg>
    ),
    title: 'Specialty Coffee',
    body: 'Single-origin, μικρά ψητήρια, χειροποίητα φλιτζάνια. Κάθε κόκκος έχει ιστορία.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="5" r="3" />
      </svg>
    ),
    title: 'Healthy Brunch',
    body: 'Poke bowls, acai, smoothies και γλυκά χωρίς ζάχαρη. Τροφή που σε κρατά ζωντανό.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" strokeLinecap="round" />
      </svg>
    ),
    title: 'Lake Views',
    body: 'Στον 1ο όροφο του ΚΕΠΑΒΙ, με θέα στη λίμνη Ιωαννίνων. Ένα σκηνικό για ήσυχα πρωινά.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-mustard" strokeWidth="1.5" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Community',
    body: 'Events, workshops, open mics. Ένα μέρος για να γνωριστείς με ανθρώπους που αξίζει.',
  },
]

/* ── Letter + word row ── */
function AcronymRow({
  letter,
  word,
  sub,
  index,
}: {
  letter: string
  word: string
  sub: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <div
      ref={ref}
      className="flex items-baseline gap-4 border-t border-line/30 py-5 first:border-t-0 md:gap-8"
    >
      {/* Letter */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_TUPLE, delay: index * 0.07 }}
        className="w-12 shrink-0 font-serif text-[clamp(48px,7vw,80px)] leading-none tracking-tight text-mustard"
        aria-hidden
      >
        {letter}
      </motion.span>

      {/* Word + sub */}
      <div className="min-w-0 overflow-hidden">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_TUPLE, delay: index * 0.07 + 0.1 }}
          className="font-serif text-[clamp(22px,3.5vw,38px)] leading-none tracking-tight text-charcoal"
        >
          {word}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 + 0.22 }}
          className="mt-1.5 font-sans text-[13px] text-concrete"
        >
          {sub}
        </motion.p>
      </div>
    </div>
  )
}

/* ── Pillar card ── */
function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE_TUPLE, delay: index * 0.08 }}
      className="flex flex-col gap-4 rounded-2xl border border-line/40 bg-bone-warm/60 p-6"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-olive/8">
        {pillar.icon}
      </div>
      <div>
        <p className="font-serif text-[18px] leading-snug tracking-tight text-charcoal">
          {pillar.title}
        </p>
        <p className="mt-2 font-sans text-[13px] leading-relaxed text-concrete">
          {pillar.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-line/30 bg-cream px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ── Top header ── */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
          <div>
            <motion.p
              className="eyebrow mb-4 font-sans text-olive"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              ΠΟΙΟΙ ΕΙΜΑΣΤΕ
            </motion.p>
            <motion.h2
              className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-tight text-charcoal"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.06 }}
            >
              Ένας χώρος που μένει στο μυαλό.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
            className="max-w-md font-sans text-[16px] leading-relaxed text-concrete md:text-right"
          >
            Δύο επίπεδα, άφθονο πράσινο και θέα στη λίμνη Ιωαννίνων. Ανοιχτά{' '}
            <span className="text-charcoal">08:00–22:00</span>, 7 μέρες.
          </motion.p>
        </div>

        {/* ── M.E.S.S. acronym ── */}
        <div className="mb-20 max-w-[720px]" aria-label="Τι σημαίνει M.E.S.S.">
          {acronym.map((row, i) => (
            <AcronymRow key={row.letter + i} {...row} index={i} />
          ))}
        </div>

        {/* ── 4 pillars ── */}
        <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* ── Heraclitus MODULAR quote card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-16 overflow-hidden rounded-2xl bg-olive-deep px-8 py-10 md:px-12 md:py-14"
        >
          <div className="mx-auto max-w-[780px]">
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.22em] text-mustard/70">
              ΦΙΛΟΣΟΦΙΑ
            </p>
            <blockquote>
              <p className="font-serif text-[clamp(28px,4.5vw,52px)] leading-[1.12] tracking-tight text-bone">
                &ldquo;Τα πάντα ρεῖ.&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-bone/15" />
                <cite className="font-sans text-[12px] not-italic uppercase tracking-[0.18em] text-bone/45">
                  Ηράκλειτος, 535–475 π.Χ.
                </cite>
              </footer>
            </blockquote>
            <p className="mt-6 max-w-[52ch] font-sans text-[15px] leading-relaxed text-bone/60">
              Όλα κυλούν. Κι εμείς μαζί τους — μέσα από κάθε πρωινό, κάθε φλιτζάνι, κάθε στιγμή που επιλέγεις να ζεις πιο συνειδητά.
            </p>
          </div>
        </motion.div>

        {/* ── #keeprising stamp ── */}
        <div className="flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, rotate: -6, scale: 0.88 }}
            whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: EASE_TUPLE }}
            className="relative inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-olive/40 md:h-28 md:w-28"
            aria-label="#keeprising"
          >
            {/* Circular text path */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <path
                  id="stamp-circle"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text
                className="fill-olive/60"
                style={{ fontSize: '9.5px', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}
              >
                <textPath href="#stamp-circle">
                  #KEEPRISING · #KEEPRISING ·{' '}
                </textPath>
              </text>
            </svg>
            {/* Centre mark */}
            <span
              className="font-serif text-[22px] leading-none tracking-tight text-olive/70"
              aria-hidden
            >
              ↑
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
