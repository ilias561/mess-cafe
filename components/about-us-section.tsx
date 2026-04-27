'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import MaskReveal from '@/components/mask-reveal'
import { EASE } from '@/lib/motion'
import { images } from '@/lib/images'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const

/* ── Scrolling photos ── */
const aboutImages = [
  {
    key: 'aboutInterior',
    src: images.aboutInterior,
    alt: 'Café interior with plants and natural light',
    aspect: 'aspect-[4/5]',
    caption: 'Ο ΠΡΩΤΟΣ ΟΡΟΦΟΣ',
  },
  {
    key: 'aboutBar',
    src: images.aboutBar,
    alt: 'Coffee bar and service area',
    aspect: 'aspect-[3/2]',
    caption: 'ΤΟ BAR',
  },
  {
    key: 'aboutStairs',
    src: images.aboutStairs,
    alt: 'Stairs and workspace seating',
    aspect: 'aspect-square',
    caption: 'ΣΚΑΛΑ ΠΡΟΣ ΜΕΖΟΝΙ',
  },
  {
    key: 'aboutPlants',
    src: images.aboutPlants,
    alt: 'Dense plants against concrete',
    aspect: 'aspect-[4/5]',
    caption: 'ΦΥΤΑ & ΦΩΣ',
  },
] as const

/* ── CountUp for the rating badge ── */
function CountUp({ to, duration = 1.2, decimals = 0 }: { to: number; duration?: number; decimals?: number }) {
  const [display, setDisplay] = useState('0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : ''))
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, to, {
      duration,
      ease: EASE_TUPLE,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => ctrl.stop()
  }, [inView, to, duration, decimals])

  return <span ref={ref}>{display}</span>
}

/* ── Stats ── */
const stats = [
  {
    id: 'rating',
    renderValue: () => (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE_TUPLE }}
      >
        4.8★
      </motion.span>
    ),
    label: '165 κριτικές Google',
  },
  {
    id: 'hours',
    renderValue: () => <>08—22</>,
    label: '7 ημέρες την εβδομάδα',
  },
  {
    id: 'location',
    renderValue: () => <>Ιωάννινα</>,
    label: 'ΚΕΠΑΒΙ · 1ος όροφος',
  },
] as const

/* ── MESS pillar cards (correct acronym: Modular · Events · Sustainable · Space) ── */
const messPillars = [
  {
    letter: 'M.',
    word: 'Modular',
    body: 'Τα πάντα κινούνται. Η κίνηση είναι η βασικότερη αρχή της ζωής.',
    footnote: 'τα πάντα ρεί — Ηράκλειτος',
  },
  {
    letter: 'E.',
    word: 'Events',
    body: 'Ο χώρος μετασχηματίζεται. Από καφέ, σε workshop, σε σκηνή για events. Κάθε μέρα μπορεί να πάρει άλλο σχήμα.',
    footnote: undefined,
  },
  {
    letter: 'S.',
    word: 'Sustainable',
    body: 'Επιλογές που σέβονται το σώμα, τον άνθρωπο, τη λίμνη.',
    footnote: undefined,
  },
  {
    letter: 'S.',
    word: 'Space',
    body: '1ος όροφος, ΚΕΠΑΒΙ. Ιωάννινα. Μπροστά στη λίμνη.',
    footnote: undefined,
  },
]

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="scroll-mt-28 border-t border-line/30 bg-cream px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12">

        {/* ── LEFT: sticky text column ── */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24">

            <motion.p
              className="mb-6 font-sans text-[11px] uppercase tracking-[0.22em] text-olive"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              ΠΟΙΟΙ ΕΙΜΑΣΤΕ · #KEEPRISING
            </motion.p>

            <MaskReveal className="mb-8" delay={0.06}>
              <h2 className="font-serif text-[clamp(44px,5vw,72px)] leading-[1.02] tracking-tight text-balance text-charcoal">
                Δεν είναι καφέ. Είναι μια ιδέα.
              </h2>
            </MaskReveal>

            {/* Body paragraphs */}
            <div className="flex flex-col gap-5">
              {[
                'Το M.E.S.S. γεννήθηκε από την ανάγκη για έναν πιο ήσυχο ρυθμό ζωής — σε μια καθημερινότητα που πιέζει. Ένας χώρος που αγκαλιάζει την πόλη χωρίς να την ακολουθεί βιαστικά.',
                'Φτιάχνουμε πιάτα και ροφήματα με γνώμονα την υγεία και τη σωστή λειτουργία του οργανισμού. Κάθε επιλογή υπηρετεί το ίδιο αίτημα: ποιότητα με καθαρή πρόθεση.',
                'Χτίζουμε κοινότητα — κάτι που, στις μέρες μας, φθίνει. Ενότητα, δημιουργικότητα, ευεξία. Αρμονικά δεμένα στον ίδιο χώρο.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.08 + i * 0.06 }}
                  className="max-w-md font-sans text-[17px] leading-relaxed text-charcoal/80"
                >
                  {text}
                </motion.p>
              ))}

              {/* Pull-quote — Heraclitus */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.26 }}
              >
                <p className="max-w-md font-serif text-[clamp(24px,3.5vw,32px)] italic leading-snug tracking-tight text-charcoal">
                  &ldquo;Τα πάντα ρεί.&rdquo;
                </p>
                <p className="mt-1.5 font-sans text-[12px] uppercase tracking-[0.16em] text-concrete">
                  — Ηράκλειτος, 535–475 π.Χ.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.32 }}
                className="max-w-md font-sans text-[17px] leading-relaxed text-charcoal/80"
              >
                Για εμάς αυτό σημαίνει ότι ο χώρος κινείται μαζί σου. Από καφέ σε workshop, σε σκηνή για events. Από πρωινό brunch σε low beverage cocktails και crafted beers. Το M.E.S.S. αλλάζει σχήμα — εσύ αλλάζεις μαζί του.
              </motion.p>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  className="min-w-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.22 + i * 0.08 }}
                >
                  <p className="font-serif text-[clamp(30px,6vw,42px)] leading-none tracking-tight text-charcoal">
                    {stat.renderValue()}
                  </p>
                  <p className="mt-2 font-sans text-[10px] uppercase leading-snug tracking-[0.16em] text-olive sm:text-[11px]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Δες το μενού → */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="mt-10"
            >
              <Link
                href="/menu"
                className="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-charcoal transition-colors hover:text-mustard"
              >
                Δες το μενού
                <span
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ── RIGHT: scrolling photos column ── */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {aboutImages.map((img, i) => (
            <div key={img.key}>
              <motion.div
                initial={{ opacity: 0, y: 64, scale: 1.04 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
                transition={{ duration: 1.1, ease: EASE_TUPLE, delay: i * 0.12 }}
                className={`relative w-full overflow-hidden ${img.aspect}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 + 0.3 }}
                className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-olive"
              >
                {img.caption}
              </motion.p>
            </div>
          ))}
        </div>

      </div>

      {/* ── MESS pillar cards ── */}
      <div className="mx-auto max-w-[1400px] mt-24">
        {/* Terracotta divider */}
        <div className="flex justify-center">
          <div className="h-px w-[60px] bg-terracotta/50" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {messPillars.map((pillar, i) => (
            <motion.div
              key={pillar.word}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE_TUPLE, delay: i * 0.08 }}
              className="flex flex-col gap-4 rounded-[3px] border border-line/40 bg-bone-warm p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-sm"
            >
              <p
                className="font-serif leading-none tracking-tight text-mustard"
                style={{ fontSize: 'clamp(48px,7vw,72px)' }}
                aria-hidden
              >
                {pillar.letter}
              </p>
              <div>
                <p className="font-serif text-[24px] leading-snug tracking-tight text-charcoal">
                  {pillar.word}
                </p>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-concrete">
                  {pillar.body}
                </p>
                {pillar.footnote && (
                  <p className="mt-3 font-serif text-[12px] italic text-concrete/60">
                    {pillar.footnote}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
