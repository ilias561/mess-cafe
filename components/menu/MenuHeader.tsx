'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

function VeganDot() {
  return <span className="inline-block h-2 w-2 rounded-full bg-olive" aria-hidden />
}
function VegDot() {
  return <span className="inline-block h-2 w-2 rounded-full bg-mustard" aria-hidden />
}
function SignatureStar() {
  return (
    <svg viewBox="0 0 16 16" className="inline-block h-3 w-3 text-mustard" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 1l1.8 4.4L14 6.1l-3 2.9.7 4.1L8 11l-3.7 2.1.7-4.1-3-2.9 4.2-.7z" />
    </svg>
  )
}

export default function MenuHeader() {
  return (
    <div className="min-h-[70vh] bg-bone px-6 pb-20 pt-20 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="font-sans text-[11px] uppercase tracking-[0.22em] text-olive"
        >
          MENU · UPDATED 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.14 }}
          className="mt-4 font-serif text-[clamp(56px,8vw,120px)] leading-[0.95] tracking-tight text-charcoal"
        >
          Φαγητό ως φάρμακο.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.24 }}
          className="mt-8 max-w-xl font-sans text-[17px] leading-relaxed text-concrete"
        >
          Αγνές πρώτες ύλες, ακατέργαστα υλικά, ζύμωση γεύσεων. Κάθε πιάτο φτιαγμένο για να λειτουργεί καλύτερα ο εγκέφαλος, το πεπτικό και το σώμα μας.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.34 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <span className="flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.16em] text-concrete">
            <VeganDot /> Vegan
          </span>
          <span className="flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.16em] text-concrete">
            <VegDot /> Vegetarian
          </span>
          <span className="flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.16em] text-concrete">
            <SignatureStar /> Signature
          </span>
        </motion.div>
      </div>
    </div>
  )
}
