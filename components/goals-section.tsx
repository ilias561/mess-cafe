'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { images } from '@/lib/images'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const

const goals = [
  {
    num: '01',
    title: 'Κοινότητα',
    body: 'Open mic βραδιές, community dinners, workshops που δίνουν σκηνή στους νέους δημιουργούς των Ιωαννίνων.',
  },
  {
    num: '02',
    title: 'Αλληλεγγύη',
    body: 'Δωρεάν γεύματα σε ανθρώπους που το χρειάζονται. Συνεργασίες με τοπικούς φορείς και οργανώσεις.',
  },
  {
    num: '03',
    title: 'Τέχνη',
    body: 'Εκθέσεις, παρουσιάσεις βιβλίων, μουσικές βραδιές. Ο χώρος γίνεται σκηνή για τις ιστορίες της πόλης.',
  },
]

/* ── #KEEPRISING circular seal ── */
function KeepRisingSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -6, scale: 0.88 }}
      whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE_TUPLE }}
      className="relative inline-flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-bone/25 md:h-[160px] md:w-[160px]"
      aria-label="#keeprising"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <path
            id="seal-circle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill="rgba(245,241,232,0.45)"
          style={{ fontSize: '9.5px', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}
        >
          <textPath href="#seal-circle">
            #KEEPRISING · #KEEPRISING ·{' '}
          </textPath>
        </text>
      </svg>
      <span
        className="font-serif text-[28px] leading-none tracking-tight text-bone/50"
        aria-hidden
      >
        ↑
      </span>
    </motion.div>
  )
}

export default function GoalsSection() {
  return (
    <section
      id="goals"
      className="relative scroll-mt-28 overflow-hidden bg-olive-deep px-6 py-24 md:px-12 md:py-32"
    >
      {/* Thin terracotta rule at top */}
      <div className="mx-auto mb-20 max-w-[1400px]">
        <div className="h-px w-[60px] bg-terracotta/50" />
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">

        {/* ── LEFT: 7 cols ── */}
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard"
          >
            ΟΙ ΣΤΟΧΟΙ ΜΑΣ · #KEEPRISING
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
            className="mt-6 max-w-[16ch] font-serif text-[clamp(48px,6vw,88px)] leading-[1.02] tracking-tight text-bone"
          >
            Περισσότερα από ένα μενού.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-[560px] font-sans text-[17px] leading-[1.75] text-bone/80"
          >
            Θέλουμε το M.E.S.S. να κινείται με στόχο. Όχι μόνο να σερβίρει καφέ και φαγητό — αλλά να δημιουργεί χώρο για ανθρώπους, ιδέες και πράξεις που έχουν σημασία.
          </motion.p>

          {/* Numbered goals */}
          <div className="mt-12 flex flex-col gap-8">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE_TUPLE, delay: i * 0.1 }}
                className="flex gap-6 border-t border-bone/10 pt-6"
              >
                <span className="shrink-0 font-sans text-[13px] font-medium tabular-nums text-mustard/70">
                  {goal.num}.
                </span>
                <div>
                  <p className="font-serif text-[22px] leading-snug tracking-tight text-bone">
                    {goal.title}
                  </p>
                  <p className="mt-2 font-sans text-[15px] leading-relaxed text-bone/65">
                    {goal.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing italic line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-8 font-serif text-[17px] italic text-bone/60"
          >
            Η κίνηση δεν είναι μόνο έννοια. Είναι πράξη.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.36 }}
            className="mt-10"
          >
            <Link
              href="/actions"
              className="inline-flex items-center gap-2.5 rounded-full bg-mustard px-10 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber hover:shadow-lg"
            >
              Δες τις δράσεις μας
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5" aria-hidden>
                <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: 5 cols — photo ── */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE_TUPLE }}
          >
            <Link href="/actions" aria-label="Δράσεις της κοινότητας M.E.S.S.">
              <div className="group relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={images.gallery3}
                  alt="Δράσεις της κοινότητας M.E.S.S."
                  fill
                  unoptimized
                  className="object-cover transition-all duration-500 group-hover:saturate-50 group-hover:sepia-[0.3]"
                />
              </div>
            </Link>
            <p className="mt-3 font-sans text-[12px] italic text-bone/50">
              Από κάθε workshop. Κάθε κοινή στιγμή.
            </p>
          </motion.div>
        </div>

      </div>

      {/* ── #KEEPRISING seal — bottom-right, overlapping boundary ── */}
      <div className="absolute bottom-0 right-6 translate-y-1/2 md:right-12">
        <KeepRisingSeal />
      </div>
    </section>
  )
}
