'use client'

import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '@/lib/menu-data'
import { extras } from '@/lib/menu-data'
import { MenuDishCard, MenuListRow } from './MenuItem'

function ExtrasBox({ categoryId }: { categoryId: string }) {
  if (categoryId === 'brunch') {
    return (
      <div className="ui-card-elevated mt-8 grid gap-4 rounded-sm border border-line/40 p-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
            {extras.vegExtras.label}
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.vegExtras.items}</p>
        </div>
        <div>
          <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
            {extras.proteinExtras.label}
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.proteinExtras.items}</p>
        </div>
      </div>
    )
  }
  if (categoryId === 'bowls' || categoryId === 'salads') {
    return (
      <div className="ui-card-elevated mt-8 rounded-sm border border-line/40 p-6">
        <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
          {extras.fruitExtras.label}
        </p>
        <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.fruitExtras.items}</p>
      </div>
    )
  }
  return null
}

const editorialIntro: Partial<Record<string, string>> = {
  brunch: 'Άνετο πρωινό με πιάτα που στηρίζουν την ημέρα χωρίς περιττή ένταση.',
  bowls: 'Πλήρη bowls με ισορροπία υφών, θερμοκρασιών και καθαρών πρωτεϊνών.',
  salads: 'Σαλάτες με εποχικό χαρακτήρα, ζωντανή οξύτητα και χορταστικό τελείωμα.',
  coffee: 'Single origin εκχυλίσεις και ήπιες επιλογές για όλη τη διάρκεια της ημέρας.',
  smoothies: 'Μείγματα με πραγματικό φρούτο, φυσική γλυκύτητα και καθαρή ενέργεια.',
  treats: 'Γλυκά και snacks με ελαφριά σύσταση και ισορροπημένη γεύση.',
}

function CategoryHeader({ category, index }: { category: MenuCategoryType; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="flex items-end gap-5 border-b border-line/50 pb-5 md:gap-7"
    >
      <span className="font-serif text-[clamp(40px,6vw,68px)] font-light leading-[0.8] text-mustard/30">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-olive">{category.title}</p>
        <h2 className="type-category u-balance font-serif italic leading-[1.05] tracking-tight text-charcoal">
          {category.titleGr}
        </h2>
      </div>
    </m.div>
  )
}

function hasMedia(i: MenuItemType) {
  return Boolean(i.image || i.video)
}

function ListGroup({
  items,
  className = '',
  showNutrition = true,
}: {
  items: MenuItemType[]
  className?: string
  showNutrition?: boolean
}) {
  return (
    <div className={`grid grid-cols-1 gap-x-16 gap-y-6 md:grid-cols-2 ${className}`}>
      {items.map((item, i) => (
        <MenuListRow key={item.name} item={item} index={i} showNutrition={showNutrition} />
      ))}
    </div>
  )
}

function CategoryBody({
  category,
  showNutrition,
}: {
  category: MenuCategoryType
  showNutrition: boolean
}) {
  const media = category.items.filter(hasMedia)
  const noMedia = category.items.filter((i) => !hasMedia(i))

  if (media.length === 0) {
    return <ListGroup items={category.items} className="mt-10" showNutrition={showNutrition} />
  }

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {media.map((item, i) => (
          <MenuDishCard key={item.name} item={item} index={i} showNutrition={showNutrition} />
        ))}
      </div>
      {noMedia.length > 0 && (
        <ListGroup
          items={noMedia}
          showNutrition={showNutrition}
          className="mt-12 border-t border-line/40 pt-10"
        />
      )}
    </>
  )
}

export default function MenuCategory({
  category,
  index,
  showFooterBeat = true,
}: {
  category: MenuCategoryType
  index: number
  showFooterBeat?: boolean
}) {
  const showNutrition = !category.hideNutrition

  return (
    <section
      id={category.id}
      className="scroll-mt-[140px] bg-bone px-6 py-20 md:scroll-mt-[120px] md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <CategoryHeader category={category} index={index} />
        {editorialIntro[category.id] && (
          <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-relaxed text-concrete">
            {editorialIntro[category.id]}
          </p>
        )}
        <CategoryBody category={category} showNutrition={showNutrition} />
        <ExtrasBox categoryId={category.id} />

        {showFooterBeat && (
          <div className="mt-16 flex items-center justify-center gap-4 md:mt-24">
            <span className="h-px w-10 bg-line" />
            <span className="font-serif text-[15px] italic tracking-[0.15em] text-olive/40">M.E.S.S.</span>
            <span className="h-px w-10 bg-line" />
          </div>
        )}
      </div>
    </section>
  )
}
