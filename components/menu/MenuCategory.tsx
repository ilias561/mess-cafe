'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuCategory as MenuCategoryType } from '@/lib/menu-data'
import { extras } from '@/lib/menu-data'
import MenuItem from './MenuItem'

function ExtrasBox({ categoryId }: { categoryId: string }) {
  if (categoryId === 'brunch') {
    return (
      <div className="mt-8 grid gap-4 rounded-sm border border-line/40 p-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
            {extras.vegExtras.label} <span className="text-mustard">{extras.vegExtras.price}</span>
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.vegExtras.items}</p>
        </div>
        <div>
          <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
            {extras.proteinExtras.label} <span className="text-mustard">{extras.proteinExtras.price}</span>
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.proteinExtras.items}</p>
        </div>
      </div>
    )
  }
  if (categoryId === 'bowls' || categoryId === 'salads') {
    return (
      <div className="mt-8 rounded-sm border border-line/40 p-6">
        <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
          {extras.fruitExtras.label} <span className="text-mustard">{extras.fruitExtras.price}</span>
        </p>
        <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.fruitExtras.items}</p>
      </div>
    )
  }
  return null
}

export default function MenuCategory({
  category,
  index,
}: {
  category: MenuCategoryType
  index: number
}) {
  const bg = index % 2 === 0 ? 'bg-bone' : 'bg-bone-warm'

  return (
    <section id={category.id} className={`scroll-mt-14 ${bg} px-6 py-20 md:px-12`}>
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-12"
        >
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-olive">
            {category.title}
          </p>
          <h2 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.0] tracking-tight text-charcoal">
            {category.titleGr}
          </h2>
        </motion.div>

        <div>
          {category.items.map((item, i) => (
            <MenuItem key={item.name} item={item} index={i} />
          ))}
        </div>

        <ExtrasBox categoryId={category.id} />
      </div>
    </section>
  )
}
