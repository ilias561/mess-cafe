'use client'

import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuCategory as MenuCategoryType, MenuItem as MenuItemType, MenuLayout } from '@/lib/menu-data'
import { extras, getCategoryLayout } from '@/lib/menu-data'
import { MenuFeatureRow, MenuGridItem, MenuListRow, MenuCardItem } from './MenuItem'

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

function resolveLayout(category: MenuCategoryType): MenuLayout {
  return category.layout ?? (getCategoryLayout(category) === 'visual' ? 'feature' : 'list')
}

function CategoryHeader({ category, index }: { category: MenuCategoryType; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: EASE }}
      className="border-b border-line/40 pb-8"
    >
      <div className="md:flex md:items-end md:justify-between md:gap-8">
        <div className="min-w-0">
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">
            <span className="tabular-nums text-olive/50">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-olive/40">·</span>
            {category.title}
          </p>
          <h2 className="type-category u-balance mt-2 font-serif italic tracking-tight text-charcoal">
            {category.titleGr}
          </h2>
        </div>
      </div>
      {editorialIntro[category.id] && (
        <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-relaxed text-concrete">
          {editorialIntro[category.id]}
        </p>
      )}
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
  layout,
  showNutrition,
}: {
  category: MenuCategoryType
  layout: MenuLayout
  showNutrition: boolean
}) {
  if (layout === 'list') {
    return <ListGroup items={category.items} className="mt-12" showNutrition={showNutrition} />
  }

  if (layout === 'card') {
    const media = category.items.filter(hasMedia)
    const noMedia = category.items.filter((i) => !hasMedia(i))
    return (
      <>
        {media.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
            {media.map((item, i) => (
              <MenuCardItem key={item.name} item={item} index={i} />
            ))}
          </div>
        )}
        {noMedia.length > 0 && (
          <ListGroup
            items={noMedia}
            showNutrition={showNutrition}
            className={media.length > 0 ? 'mt-12 border-t border-line/40 pt-10 md:mt-16' : 'mt-12'}
          />
        )}
      </>
    )
  }

  const media = category.items.filter(hasMedia)
  const noMedia = category.items.filter((i) => !hasMedia(i))

  return (
    <>
      {media.length > 0 &&
        (layout === 'feature' ? (
          <div className="mt-12 flex flex-col gap-16 md:mt-16 md:gap-24">
            {media.map((item, i) => (
              <MenuFeatureRow key={item.name} item={item} index={i} showNutrition={showNutrition} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
            {media.map((item, i) => (
              <MenuGridItem key={item.name} item={item} index={i} showNutrition={showNutrition} />
            ))}
          </div>
        ))}

      {noMedia.length > 0 && (
        <ListGroup
          items={noMedia}
          showNutrition={showNutrition}
          className={media.length > 0 ? 'mt-12 border-t border-line/40 pt-10 md:mt-16' : 'mt-12'}
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
  const backgrounds = ['bg-bone', 'bg-bone-warm', 'bg-bone'] as const
  const bg = backgrounds[index % backgrounds.length]
  const layout = resolveLayout(category)
  const showNutrition = !category.hideNutrition

  return (
    <section id={category.id} className={`scroll-mt-[140px] ${bg} px-6 py-20 md:scroll-mt-[120px] md:px-12 md:py-32`}>
      <div className="mx-auto max-w-[1400px]">
        <CategoryHeader category={category} index={index} />
        <CategoryBody category={category} layout={layout} showNutrition={showNutrition} />
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
