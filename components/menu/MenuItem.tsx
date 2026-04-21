'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuItem as MenuItemType } from '@/lib/menu-data'

const BADGE_STYLES: Record<string, string> = {
  vegan: 'bg-olive text-bone',
  vegetarian: 'bg-mustard text-charcoal',
  signature: 'bg-charcoal text-mustard',
  gf: 'bg-line text-charcoal',
}

const BADGE_LABELS: Record<string, string> = {
  vegan: 'VEGAN',
  vegetarian: 'VEG',
  signature: 'SIGNATURE',
  gf: 'GF',
}

export default function MenuItem({ item, index }: { item: MenuItemType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
      className="group relative grid grid-cols-[1fr_auto] gap-6 border-b border-line/40 py-5 pl-3 transition-colors hover:bg-bone-warm/40"
    >
      <motion.span
        className="absolute left-0 top-0 h-full w-0.5 origin-top bg-mustard"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="font-serif text-[22px] leading-snug tracking-tight text-charcoal">
            {item.name}
          </h3>
          {item.badges?.map((badge) => (
            <span
              key={badge}
              className={`inline-block rounded-full px-2 py-0.5 font-sans text-[9px] font-medium tracking-[0.12em] uppercase ${BADGE_STYLES[badge]}`}
            >
              {BADGE_LABELS[badge]}
            </span>
          ))}
        </div>
        <p className="mt-1.5 max-w-prose font-sans text-[14px] leading-relaxed text-concrete">
          {item.desc}
        </p>
      </div>
      <p className="shrink-0 font-serif text-[20px] text-mustard">{item.price}</p>
    </motion.div>
  )
}
