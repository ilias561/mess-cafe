'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuCategory as MenuCategoryType } from '@/lib/menu-data'
import { extras, getCategoryLayout } from '@/lib/menu-data'
import { MenuItemList, MenuItemVisual } from './MenuItem'

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
  const backgrounds = ['bg-bone', 'bg-bone-warm', 'bg-bone'] as const
  const bg = backgrounds[index % backgrounds.length]
  const layout = getCategoryLayout(category)
  const editorialIntro: Partial<Record<string, string>> = {
    brunch: 'Άνετο πρωινό με πιάτα που στηρίζουν την ημέρα χωρίς περιττή ένταση.',
    bowls: 'Πλήρη bowls με ισορροπία υφών, θερμοκρασιών και καθαρών πρωτεϊνών.',
    salads: 'Σαλάτες με εποχικό χαρακτήρα, ζωντανή οξύτητα και χορταστικό τελείωμα.',
    coffee: 'Single origin εκχυλίσεις και ήπιες επιλογές για όλη τη διάρκεια της ημέρας.',
    smoothies: 'Μείγματα με πραγματικό φρούτο, φυσική γλυκύτητα και καθαρή ενέργεια.',
    treats: 'Γλυκά και snacks με ελαφριά σύσταση και ισορροπημένη γεύση.',
  }

  return (
    <section id={category.id} className={`scroll-mt-28 ${bg} px-6 py-16 md:px-12 md:py-32`}>
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-12"
        >
          <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            {category.title}
          </p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-tight text-charcoal">
            {category.titleGr}
          </h2>
          {editorialIntro[category.id] && (
            <p className="mt-4 max-w-[64ch] font-sans text-[15px] leading-relaxed text-concrete">
              {editorialIntro[category.id]}
            </p>
          )}
        </motion.div>

        {layout === 'visual' ? (
          <motion.div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:gap-x-14 lg:gap-y-14">
            {category.items.map((item, i) => (
              <MenuItemVisual key={item.name} item={item} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div className="mx-auto max-w-[720px]">
            <div className="flex flex-col gap-7 md:gap-8">
              {category.items.map((item, i) => (
                <MenuItemList key={item.name} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        <ExtrasBox categoryId={category.id} />
      </div>
    </section>
  )
}
