'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

export default function NotFoundContent() {
  return (
    <section className="flex min-h-[70vh] items-center px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1400px] text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-serif text-[clamp(64px,12vw,128px)] leading-[0.95] tracking-[-0.03em] text-charcoal"
        >
          Λάθος διεύθυνση
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mx-auto mt-6 max-w-[48ch] font-sans text-[16px] leading-relaxed text-concrete md:mx-0 md:text-[17px]"
        >
          Η σελίδα που ψάχνεις δεν υπάρχει. Ίσως μετακινήθηκε ή πληκτρολογήθηκε λάθος.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 md:justify-start"
        >
          <Link
            href="/"
            className="ui-interactive rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal hover:bg-amber hover:shadow-lg"
          >
            Επιστροφή στην αρχική
          </Link>
          <Link
            href="/menu"
            className="ui-interactive rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal hover:bg-amber hover:shadow-lg"
          >
            Δες το μενού
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
