'use client'

import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { menuData, extras, type MenuCategory, type MenuItem } from '@/lib/menu-data'

/* ── prototype: clean / light menu ───────────────────────────────────
   Dark cinematic hero → light warm menu body so the food photos pop.
   Self-contained; does not touch the live menu.                       */

const HERO_IMAGE = '/images/menu/piata-0022.jpg'

// warm palette (prototype-local — not yet brand tokens)
const C = {
  page: '#f4efe3', // warm cream surface
  ink: '#1d3a16', // dark forest — headings
  body: '#5a6450', // muted green-grey — body
  gold: '#c79a2e', // deeper mustard that reads on cream
}

const DIET: Record<string, string> = { gf: 'GF', vegetarian: 'V', vegan: 'VE' }
const DIET_ORDER = ['gf', 'vegetarian', 'vegan'] as const

function mediaSrc(item: MenuItem): string | null {
  if (item.image) return item.image
  if (item.video) return item.video.replace(/\.mp4$/, '-poster.jpg')
  return null
}
const hasPhotos = (c: MenuCategory) => c.items.some((i) => i.image || i.video)

function DietTags({ badges }: { badges?: MenuItem['badges'] }) {
  const tags = DIET_ORDER.filter((b) => badges?.includes(b))
  if (tags.length === 0) return null
  return (
    <span className="flex shrink-0 items-center gap-1">
      {tags.map((b) => (
        <span
          key={b}
          className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full border border-[#2d5a27]/35 px-1 font-sans text-[9px] font-semibold leading-none tracking-wide text-[#2d5a27]"
        >
          {DIET[b]}
        </span>
      ))}
    </span>
  )
}

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: EASE, delay: Math.min(i, 4) * 0.03 },
})

function DishCard({ item, index }: { item: MenuItem; index: number }) {
  const src = mediaSrc(item)
  const signature = item.badges?.includes('signature')
  return (
    <m.article
      {...reveal(index)}
      className="ui-card-elevated group flex h-full flex-col overflow-hidden rounded-[2px] bg-white ring-1 ring-black/[0.04]"
    >
      {src && (
        <div className="aspect-[16/10] overflow-hidden bg-[#e9e2d2] md:aspect-[4/3]">
          <img
            src={src}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="ui-img-hover h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-baseline gap-2.5">
          <h3 className="min-w-0 font-serif text-[19px] leading-snug tracking-tight md:text-[20px]" style={{ color: C.ink }}>
            {item.name}
            {signature && <span className="ml-1.5 align-middle text-[13px]" style={{ color: C.gold }}>✦</span>}
          </h3>
          <DietTags badges={item.badges} />
        </div>
        {item.desc && (
          <p className="mt-2 font-sans text-[13.5px] leading-relaxed" style={{ color: C.body }}>
            {item.desc}
          </p>
        )}
      </div>
    </m.article>
  )
}

function ListRow({ item, index }: { item: MenuItem; index: number }) {
  const signature = item.badges?.includes('signature')
  return (
    <m.article {...reveal(index)} className="break-inside-avoid border-b border-black/[0.08] py-3 first:pt-0 md:py-4">
      <div className="flex items-baseline gap-2.5">
        <h3 className="min-w-0 font-serif text-[19px] leading-snug tracking-tight md:text-[20px]" style={{ color: C.ink }}>
          {item.name}
          {signature && <span className="ml-1.5 align-middle text-[13px]" style={{ color: C.gold }}>✦</span>}
        </h3>
        <DietTags badges={item.badges} />
      </div>
      {item.desc && (
        <p className="mt-1.5 max-w-[46ch] font-sans text-[13px] leading-relaxed" style={{ color: C.body }}>
          {item.desc}
        </p>
      )}
    </m.article>
  )
}

function ExtrasLine({ categoryId }: { categoryId: string }) {
  const blocks =
    categoryId === 'brunch'
      ? [extras.vegExtras, extras.proteinExtras]
      : categoryId === 'bowls' || categoryId === 'salads'
        ? [extras.fruitExtras]
        : []
  if (blocks.length === 0) return null
  return (
    <div className="mt-10 space-y-2 border-t border-black/[0.08] pt-6">
      {blocks.map((b, i) => (
        <p key={i} className="font-sans text-[12px] leading-relaxed" style={{ color: C.body }}>
          <span className="font-semibold uppercase tracking-[0.16em]" style={{ color: C.ink }}>{b.label}</span>
          <span className="mx-2 tabular-nums" style={{ color: C.gold }}>{b.price}</span>
          — {b.items}
        </p>
      ))}
    </div>
  )
}

function CategorySection({ category, index }: { category: MenuCategory; index: number }) {
  const cards = hasPhotos(category)
  const withMedia = category.items.filter((i) => i.image || i.video)
  const noMedia = category.items.filter((i) => !(i.image || i.video))
  return (
    <section id={category.id} className="scroll-mt-24 px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <m.div
          {...reveal()}
          className="flex items-end gap-4 border-b border-black/10 pb-4 md:gap-7 md:pb-5"
        >
          <span className="font-serif text-[clamp(40px,6vw,68px)] font-light leading-[0.8]" style={{ color: C.gold }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em]" style={{ color: '#2d5a27' }}>
              {category.title}
            </p>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] italic leading-[1.05] tracking-tight" style={{ color: C.ink }}>
              {category.titleGr}
            </h2>
          </div>
        </m.div>

        {cards ? (
          <>
            <div className="mt-6 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 md:mt-10 md:gap-8 lg:grid-cols-3">
              {withMedia.map((item, i) => (
                <DishCard key={item.name} item={item} index={i} />
              ))}
            </div>
            {noMedia.length > 0 && (
              <div className="mt-8 border-t border-black/[0.08] pt-6 md:mt-10 md:pt-8 md:columns-2 md:gap-x-16">
                {noMedia.map((item, i) => (
                  <ListRow key={item.name} item={item} index={i} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 md:mt-8 md:columns-2 md:gap-x-16">
            {category.items.map((item, i) => (
              <ListRow key={item.name} item={item} index={i} />
            ))}
          </div>
        )}

        <ExtrasLine categoryId={category.id} />
      </div>
    </section>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  return (
    <header ref={ref} className="relative flex min-h-[58vh] items-end overflow-hidden">
      <m.img
        src={HERO_IMAGE}
        alt="Πιάτο από το μενού του M.E.S.S."
        style={reduce ? undefined : { y }}
        className="absolute left-0 top-[-9%] h-[118%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e2208] via-[#0e2208]/45 to-[#0e2208]/25" />
      <m.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="relative mx-auto w-full max-w-[1240px] px-6 pb-14 md:px-12 md:pb-20"
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.3em]" style={{ color: '#e8b547' }}>
          M.E.S.S. · Ιωάννινα
        </p>
        <h1 className="mt-4 font-serif text-[clamp(52px,10vw,124px)] italic leading-[0.85] tracking-tight text-[#f3efe3]">
          Μενού
        </h1>
        <p className="mt-5 max-w-[48ch] font-sans text-[15px] leading-relaxed text-[#e7e2d4]">
          Φαγητό ως φάρμακο — εποχικά, τοπικά υλικά, φτιαγμένα με μεράκι.
        </p>
      </m.div>
    </header>
  )
}

export default function Carte() {
  return (
    <div style={{ backgroundColor: C.page }}>
      <Hero />
      {menuData.map((category, i) => (
        <CategorySection key={category.id} category={category} index={i} />
      ))}
    </div>
  )
}
