'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { MenuLegendInline } from './MenuItem'

const HERO_IMAGE = '/images/menu/piata-0022.jpg'

export default function MenuHeader() {
  return (
    <header className="bg-bone px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-44">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14 lg:gap-20">
        <div className="max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-sans text-[11px] uppercase tracking-[0.24em] text-olive"
          >
            M.E.S.S. · Ο κατάλογος
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="mt-4 font-serif text-[clamp(44px,6.5vw,92px)] leading-[0.95] tracking-tight text-charcoal"
          >
            Το μενού μας.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-[52ch] font-sans text-[16px] leading-relaxed text-concrete md:text-[17px]"
          >
            Αγνές πρώτες ύλες, ακατέργαστα υλικά και μικρές εποχικές παρεμβάσεις. Το μενού μας διαβάζεται σαν ημερολόγιο της κουζίνας: καφές, brunch και
            πιάτα που υπηρετούν την ενέργεια της ημέρας.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
            className="mt-8"
          >
            <MenuLegendInline />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="overflow-hidden rounded-[8px] bg-bone-warm"
        >
          <div className="aspect-[16/11] w-full md:aspect-[4/5]">
            <img
              src={HERO_IMAGE}
              alt="Poke bowl από το μενού του M.E.S.S."
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </header>
  )
}
