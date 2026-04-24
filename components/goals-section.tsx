'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

export default function GoalsSection() {
  return (
    <section
      id="goals"
      className="scroll-mt-28 bg-olive-deep px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard/80"
        >
          ΔΡΑΣΕΙΣ
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
          className="mt-6 max-w-[16ch] font-serif text-[clamp(36px,5.5vw,72px)] leading-[1.02] tracking-tight text-bone"
        >
          Ό,τι κάνουμε, το κάνουμε με λόγο.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
          className="mt-6 max-w-[56ch] font-sans text-[16px] leading-[1.75] text-bone/65 md:text-[17px]"
        >
          Από open mic βραδιές και workshops μέχρι community dinners — κάθε δράση του M.E.S.S. είναι μια πρόσκληση να συναντηθούμε γύρω από κάτι ουσιαστικό.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/actions"
            className="inline-flex items-center gap-2.5 rounded-full bg-mustard px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber hover:shadow-lg"
          >
            Δες τις δράσεις μας
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5" aria-hidden>
              <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
