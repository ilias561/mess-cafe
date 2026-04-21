'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const segments = [
  'SPECIALTY COFFEE',
  'BRUNCH',
  'VEGAN OPTIONS',
  'ACAI BOWLS',
  'MATCHA',
  'POKE BOWLS',
  'LAKE VIEW',
  'ΚΕΠΑΒΙ 211',
]

function Strip({ stripId }: { stripId: string }) {
  return (
    <div className="flex shrink-0 items-center gap-6 whitespace-nowrap px-3">
      {segments.map((label, i) => (
        <span key={`${stripId}-${label}-${i}`} className="flex items-center gap-6">
          {i > 0 ? <span className="font-serif text-[28px] italic leading-none text-mustard">•</span> : null}
          <span className="font-serif text-[28px] italic leading-none text-bone">{label}</span>
        </span>
      ))}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <motion.section
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex h-[80px] items-center overflow-hidden border-y border-olive-deep bg-olive text-bone"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        <Strip stripId="a" />
        <Strip stripId="b" />
      </motion.div>
    </motion.section>
  )
}
