'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuItem as MenuItemType } from '@/lib/menu-data'

const BADGE_LABELS: Record<string, string> = {
  vegan: 'vegan',
  gf: 'gluten-free',
}

export default function MenuItem({ item, index }: { item: MenuItemType; index: number }) {
  const chips = item.badges?.filter((badge) => badge === 'vegan' || badge === 'gf') ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
      className="group border-b border-charcoal/10 py-5 transition-colors hover:bg-bone-warm/40 md:grid md:grid-cols-[minmax(0,1fr)_240px] md:gap-8"
    >
      <div className="min-w-0">
        <div className="flex items-end">
          <h3 className="font-serif text-[23px] leading-snug tracking-tight italic text-charcoal">
            {item.name}
          </h3>
          <span className="mx-2 mb-[5px] hidden flex-1 border-b border-dotted border-charcoal/20 md:block" />
        </div>
        <p className="mt-1.5 max-w-prose font-sans text-[14px] leading-relaxed text-concrete">
          {item.desc}
        </p>
        {chips.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-bone-warm px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-olive"
              >
                {BADGE_LABELS[badge]}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 flex items-end md:mt-0 md:justify-end">
        <span className="mr-2 mb-[5px] flex-1 border-b border-dotted border-charcoal/20 md:hidden" />
        <p className="shrink-0 font-serif text-[22px] text-charcoal">{item.price}</p>
      </div>
    </motion.div>
  )
}
