'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

export default function NotFoundContent() {
  return (
    <section className="flex min-h-[70vh] items-center px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive"
        >
          404 · ΔΕΝ ΒΡΕΘΗΚΕ
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-6 font-serif text-[clamp(80px,16vw,220px)] leading-[0.9] tracking-[-0.03em] text-mustard"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
          className="mt-8 max-w-[48ch] font-serif text-[clamp(22px,3vw,34px)] leading-[1.25] text-charcoal"
        >
          Αυτή η σελίδα χάθηκε στον δρόμο για τον καφέ.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          className="mt-4 font-sans text-[14px] uppercase tracking-[0.18em] text-concrete"
        >
          Ίσως ψάχνεις κάτι από αυτά:
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/"
            className="rounded-full bg-charcoal px-6 py-3 font-sans text-[13px] uppercase tracking-[0.18em] text-bone transition-all hover:-translate-y-0.5 hover:bg-olive"
          >
            Αρχική
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-charcoal/20 px-6 py-3 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all hover:-translate-y-0.5 hover:border-charcoal/40"
          >
            Το μενού μας
          </Link>
          <Link
            href="/actions"
            className="rounded-full border border-charcoal/20 px-6 py-3 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all hover:-translate-y-0.5 hover:border-charcoal/40"
          >
            Οι δράσεις μας
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
