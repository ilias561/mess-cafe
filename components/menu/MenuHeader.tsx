'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

type MenuHeaderProps = {
  updatedAt: string
}

export default function MenuHeader({ updatedAt }: MenuHeaderProps) {
  return (
    <div className="bg-bone px-6 pb-14 pt-20 md:px-12 md:pb-16">
      <div className="mx-auto max-w-[1400px]">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          className="font-serif text-[clamp(52px,9vw,128px)] leading-[0.93] tracking-tight text-charcoal"
        >
          Το μενού μας.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mt-8 max-w-[68ch] font-sans text-[16px] leading-relaxed text-concrete md:text-[17px]"
        >
          Αγνές πρώτες ύλες, ακατέργαστα υλικά και μικρές εποχικές παρεμβάσεις. Το μενού μας διαβάζεται σαν ημερολόγιο
          της κουζίνας: καφές, brunch και πιάτα που υπηρετούν την ενέργεια της ημέρας.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-10 border-b border-charcoal/15 pb-6"
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-concrete">
            Ενημερώθηκε: {updatedAt}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
