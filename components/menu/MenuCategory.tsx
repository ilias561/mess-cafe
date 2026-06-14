'use client'

import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '@/lib/menu-data'
import { extras } from '@/lib/menu-data'
import { BenefitNote, DietaryTags, MenuDishCard, MenuItemMedia, MenuListRow } from './MenuItem'

function ExtrasBox({ categoryId }: { categoryId: string }) {
  if (categoryId === 'brunch') {
    return (
      <div className="ui-card-elevated mt-8 grid gap-4 rounded-sm border border-line/40 p-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.16em] text-olive">
            {extras.vegExtras.label}
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.vegExtras.items}</p>
        </div>
        <div>
          <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.16em] text-olive">
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
        <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.16em] text-olive">
          {extras.fruitExtras.label}
        </p>
        <p className="font-sans text-[13px] leading-relaxed text-concrete">{extras.fruitExtras.items}</p>
      </div>
    )
  }
  return null
}

const editorialIntro: Partial<Record<string, string>> = {
  brunch: 'Θρεπτικό πρωινό που παρέχει ό,τι χρειάζεται ο εγκέφαλος για τη σωστή λειτουργία.',
  bowls: 'Πλήρη bowls με ισορροπία υφών, θερμοκρασιών και καθαρών πρωτεϊνών.',
  salads: 'Σαλάτες με εποχικό χαρακτήρα, ζωντανή οξύτητα και χορταστικό τελείωμα.',
  coffee: 'Single origin εκχυλίσεις και ήπιες επιλογές για όλη τη διάρκεια της ημέρας.',
  smoothies: 'Μείγματα με πραγματικό φρούτο, φυσική γλυκύτητα και καθαρή ενέργεια.',
  cocktails: 'Classic, signature spritz και mocktails — με φρέσκα υλικά και μεράκι.',
  treats: 'Γλυκά και snacks με ελαφριά σύσταση και ισορροπημένη γεύση.',
}

function CategoryHeader({ category, index }: { category: MenuCategoryType; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="flex items-end gap-4 border-b border-line/50 pb-4 md:gap-7 md:pb-5"
    >
      <span className="font-serif text-[clamp(32px,6vw,68px)] font-light leading-[0.8] text-mustard/30">
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

/** Full-width editorial band for the one item that carries a video: the clip
 *  plays once when scrolled into view, the rest of the category stays photos. */
function FeaturedDrink({ item }: { item: MenuItemType }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="ui-card-elevated mt-8 overflow-hidden rounded-[2px] border border-line/60 bg-canopy-night md:mt-10 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:min-h-[440px] lg:min-h-[520px]">
        {/* The drink sits in the lower third of the clip — bias the crop there. */}
        <MenuItemMedia item={item} className="absolute inset-0 h-full w-full object-cover object-[50%_72%]" />
      </div>
      <div className="flex flex-col justify-center gap-4 p-7 sm:p-9 md:gap-5 md:p-12 lg:p-16">
        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard">✦ Signature</p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <h3 className="u-balance min-w-0 font-serif text-[clamp(26px,4.5vw,46px)] italic leading-[1.05] tracking-tight text-charcoal">
            {item.name}
          </h3>
          <DietaryTags badges={item.badges} />
        </div>
        {item.desc && (
          <p className="max-w-[48ch] font-sans text-[15px] leading-relaxed text-concrete">{item.desc}</p>
        )}
        {item.benefit && (
          <div className="border-t border-line/60 pt-4 md:pt-5">
            <BenefitNote text={item.benefit} className="max-w-[52ch] text-[14px]" />
          </div>
        )}
      </div>
    </m.div>
  )
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
    <div className={`grid grid-cols-1 gap-x-16 gap-y-4 md:grid-cols-2 md:gap-y-6 ${className}`}>
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

  // One item with a video becomes the category's featured introduction;
  // everything else renders as photo cards.
  const featured = media.find((i) => i.video)
  const cards = featured ? media.filter((i) => i !== featured) : media

  // Breakfast: 1-up on phones, 2-up from sm; on desktop a 4-3 with the second row
  // offset half a card (8-col grid, each card spans 2, the 5th card starts at col
  // 2) so the bottom three nestle between the top four. A 5-card category gets the
  // 3-2 version of the same trick (6-col grid, the 4th card starts at col 2) so
  // the bottom two nestle between the top three. Other categories: a 3-col grid,
  // bumped to 4 when count % 3 === 1 to avoid a lone orphan in the last row.
  const isBrunch = category.id === 'brunch'
  const isThreeTwo = !isBrunch && cards.length === 5
  const baseCols = 'grid-cols-1 sm:grid-cols-2'
  const lgCols = isBrunch
    ? 'lg:grid-cols-8'
    : isThreeTwo
      ? 'lg:grid-cols-6'
      : cards.length % 3 === 1
        ? 'lg:grid-cols-4'
        : 'lg:grid-cols-3'

  return (
    <>
      {featured && <FeaturedDrink item={featured} />}
      {cards.length > 0 && (
        <div
          className={`grid items-stretch gap-5 md:gap-8 ${baseCols} ${lgCols} ${
            featured ? 'mt-5 md:mt-8' : 'mt-8 md:mt-10'
          }`}
        >
          {cards.map((item, i) => {
            // Brunch nestles the 5th card (start of the 3-row); the 3-2 nestles
            // the 4th card (start of the 2-row). Both span 2 cols of their grid.
            const nestled = isBrunch || isThreeTwo
            const offsetStart = isBrunch ? i === 4 : i === 3
            return nestled ? (
              <div
                key={item.name}
                className={`h-full lg:col-span-2 ${offsetStart ? 'lg:col-start-2' : ''}`}
              >
                <MenuDishCard item={item} index={i} showNutrition={showNutrition} />
              </div>
            ) : (
              <MenuDishCard key={item.name} item={item} index={i} showNutrition={showNutrition} />
            )
          })}
        </div>
      )}
      {noMedia.length > 0 && (
        <ListGroup
          items={noMedia}
          showNutrition={showNutrition}
          className="mt-10 border-t border-line/40 pt-8 md:mt-12 md:pt-10"
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
      className="scroll-mt-[180px] bg-bone px-6 py-14 md:px-12 md:py-20 lg:scroll-mt-[120px] lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <CategoryHeader category={category} index={index} />
        {editorialIntro[category.id] && (
          <p className="mt-3 max-w-[60ch] font-sans text-[15px] leading-relaxed text-concrete md:mt-4">
            {editorialIntro[category.id]}
          </p>
        )}
        <CategoryBody category={category} showNutrition={showNutrition} />
        <ExtrasBox categoryId={category.id} />

        {showFooterBeat && (
          <div className="mt-12 flex items-center justify-center gap-4 md:mt-16 lg:mt-24">
            <span className="h-px w-10 bg-line" />
            <span className="font-serif text-[15px] italic tracking-[0.15em] text-olive/40">M.E.S.S.</span>
            <span className="h-px w-10 bg-line" />
          </div>
        )}
      </div>
    </section>
  )
}
