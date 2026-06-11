'use client'

import { useEffect, useRef } from 'react'
import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'
import StaticPicture from '@/components/static-picture'
import { getImageManifestEntry } from '@/lib/image-manifest'
import type { MenuItem as MenuItemType, Nutrition } from '@/lib/menu-data'

const DIET_TAG: Record<string, { short: string; label: string }> = {
  gf: { short: 'GF', label: 'Gluten Free' },
  vegetarian: { short: 'V', label: 'Vegetarian' },
  vegan: { short: 'VE', label: 'Vegan' },
}

const DIET_ORDER = ['gf', 'vegetarian', 'vegan'] as const

const MACRO_FIELDS = [
  { key: 'calories', label: 'Θερμίδες', unit: '' },
  { key: 'protein', label: 'Πρωτεΐνη', unit: 'g' },
  { key: 'carbs', label: 'Υδατάνθρακες', unit: 'g' },
  { key: 'fat', label: 'Λιπαρά', unit: 'g' },
  { key: 'sugar', label: 'Ζάχαρη', unit: 'g' },
  { key: 'fiber', label: 'Ίνες', unit: 'g' },
] as const

function itemMotionProps(index: number) {
  return {
    initial: { opacity: 0, y: 16 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, amount: 0.15 } as const,
    transition: { duration: 0.55, ease: EASE, delay: Math.min(index, 4) * 0.03 },
  }
}

function getItemBadges(item: MenuItemType) {
  const isSignature = item.badges?.includes('signature') ?? false
  return { isSignature }
}

function SignatureEyebrow() {
  return (
    <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.16em] text-mustard">
      ✦ Signature
    </p>
  )
}

export function DietaryTags({ badges }: { badges?: MenuItemType['badges'] }) {
  const tags = DIET_ORDER.filter((b) => badges?.includes(b))
  if (tags.length === 0) return null
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 align-middle">
      {tags.map((b) => (
        <span
          key={b}
          title={DIET_TAG[b].label}
          aria-label={DIET_TAG[b].label}
          className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full border border-olive/50 px-1 font-sans text-[9px] font-semibold leading-none tracking-[0.04em] text-olive"
        >
          {DIET_TAG[b].short}
        </span>
      ))}
    </span>
  )
}

export function BenefitNote({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p className={`flex gap-2 font-serif text-[15px] italic leading-relaxed text-olive/90 ${className}`}>
      <span aria-hidden className="select-none not-italic text-olive/55">
        —
      </span>
      <span className="min-w-0">{text}</span>
    </p>
  )
}

export function NutritionDisclosure({
  nutrition,
  compact = false,
}: {
  nutrition: Nutrition
  compact?: boolean
}) {
  return (
    <details className="group mt-4 border-t border-line/60 pt-3">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 font-sans text-[12px] font-medium tabular-nums tracking-wide text-olive/80 marker:hidden md:min-h-0">
        <span>{nutrition.calories} kcal</span>
        <span className="text-olive/45">· Διατροφικά</span>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="ml-auto h-3.5 w-3.5 fill-none stroke-current transition-transform group-open:rotate-180"
        >
          <path d="M4 6l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <MacroStrip nutrition={nutrition} compact={compact} />
    </details>
  )
}

/** Always-visible nutrition panel (no toggle) for the dish cards. */
export function NutritionPanel({
  nutrition,
  compact = false,
  className = '',
}: {
  nutrition: Nutrition
  compact?: boolean
  className?: string
}) {
  return (
    <div className={`border-t border-line/60 pt-3 ${className}`}>
      <p className="mb-2.5 flex items-center gap-2 font-sans text-[12px] font-medium tabular-nums tracking-wide text-olive/80">
        <span>{nutrition.calories} kcal</span>
        <span className="text-olive/45">· Διατροφικά</span>
      </p>
      <MacroStrip nutrition={nutrition} compact={compact} />
    </div>
  )
}

export function MacroStrip({ nutrition, compact = false }: { nutrition: Nutrition; compact?: boolean }) {
  return (
    <dl className={`grid grid-cols-3 gap-x-4 gap-y-3 ${compact ? '' : 'sm:grid-cols-6'}`}>
      {MACRO_FIELDS.map(({ key, label, unit }) => (
        <div key={key} className="flex min-w-0 flex-col gap-0.5">
          <dt className="truncate font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-olive/70">
            {label}
          </dt>
          <dd className="font-sans text-[15px] font-medium tabular-nums text-charcoal">
            {nutrition[key]}
            {unit}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function CaloriesTag({ calories }: { calories: number }) {
  return (
    <span className="shrink-0 font-sans text-[11px] font-medium tabular-nums tracking-wide text-olive/80">
      {calories} kcal
    </span>
  )
}

export function MenuLegendInline() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {DIET_ORDER.map((b) => (
          <span key={b} className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full border border-olive/50 px-1 font-sans text-[10px] font-semibold text-olive">
              {DIET_TAG[b].short}
            </span>
            <span className="font-sans text-[12px] text-concrete">{DIET_TAG[b].label}</span>
          </span>
        ))}
      </div>
      <p className="font-sans text-[11px] italic text-concrete/60">
        Οι διατροφικές τιμές είναι κατά προσέγγιση.
      </p>
    </div>
  )
}

export function MenuItemMedia({
  item,
  className = 'h-full w-full object-contain',
}: {
  item: MenuItemType
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !item.video) return

    let ended = false
    const onEnded = () => {
      ended = true
    }
    video.addEventListener('ended', onEnded)

    const prefetchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.preload !== 'auto') {
            video.preload = 'auto'
            try {
              video.load()
            } catch {
              /* noop */
            }
          }
        })
      },
      { rootMargin: '300px 0px' },
    )

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (ended) return
          if (entry.isIntersecting) {
            void video.play().catch(() => {
              // Autoplay can fail on some mobile browsers; poster still shows.
            })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    )

    prefetchObserver.observe(video)
    playObserver.observe(video)
    return () => {
      video.removeEventListener('ended', onEnded)
      prefetchObserver.disconnect()
      playObserver.disconnect()
    }
  }, [item.video])

  if (item.video) {
    const poster = item.video.replace(/\.mp4$/, '-poster.jpg')
    return (
      <video
        ref={videoRef}
        src={item.video}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        {...({ 'webkit-playsinline': 'true', 'x5-playsinline': 'true' } as Record<string, string>)}
        className={className}
        aria-label={item.name}
        onEnded={(e) => {
          e.currentTarget.pause()
        }}
      />
    )
  }

  // Only rendered with `item.video` set (see MenuDishCard); images go through
  // StaticPicture in the card itself.
  return null
}

export function MenuDishCard({
  item,
  index,
  showNutrition = true,
}: {
  item: MenuItemType
  index: number
  showNutrition?: boolean
}) {
  const { isSignature } = getItemBadges(item)
  // Portrait photos (e.g. the cocktail shoot) get a portrait box so object-cover
  // doesn't decapitate the glass; landscape food shots keep the wide box.
  const entry = item.image ? getImageManifestEntry(item.image) : undefined
  const isPortrait = entry ? entry.height > entry.width : false
  const mediaAspect = isPortrait ? 'aspect-[3/4]' : 'aspect-[16/10] md:aspect-[4/3]'
  return (
    <m.article
      {...itemMotionProps(index)}
      className="ui-card-elevated group flex h-full flex-col overflow-hidden rounded-[2px] border border-line/60 bg-bone-warm"
    >
      <div className={`overflow-hidden bg-canopy-night ${mediaAspect}`}>
        {item.video ? (
          <MenuItemMedia item={item} />
        ) : item.image ? (
          <StaticPicture
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            // Not ui-img-hover: that helper hardcodes object-cover, which beats the
            // object-contain utility and crops square/portrait dishes into the box.
            className="h-full w-full object-contain transition-[transform,filter] duration-500 ease-out motion-safe:group-hover:scale-[1.03] motion-safe:group-hover:brightness-110"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {isSignature && <SignatureEyebrow />}
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h3 className="u-balance min-w-0 font-serif text-[19px] italic leading-snug tracking-tight text-charcoal md:text-[20px]">
            {item.name}
          </h3>
          <DietaryTags badges={item.badges} />
          {item.price && (
            <span className="ml-auto shrink-0 font-sans text-[15px] font-medium tabular-nums text-charcoal">
              {item.price}
            </span>
          )}
        </div>
        {item.desc && (
          <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-concrete md:mt-2">{item.desc}</p>
        )}
        {item.benefit && <BenefitNote text={item.benefit} className="mt-2 text-[13px] md:mt-3" />}
        {showNutrition && item.nutrition && (
          <NutritionPanel nutrition={item.nutrition} compact className="mt-4 md:mt-5 lg:mt-auto" />
        )}
      </div>
    </m.article>
  )
}

export function MenuListRow({
  item,
  index,
  showNutrition = true,
}: {
  item: MenuItemType
  index: number
  showNutrition?: boolean
}) {
  const { isSignature } = getItemBadges(item)
  return (
    <m.article
      {...itemMotionProps(index)}
      className="relative border-b border-line/40 pb-4 transition-colors hover:bg-bone-warm/60 md:rounded-sm md:px-3 md:-mx-3 md:pb-5 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-mustard before:opacity-0 before:transition-opacity hover:before:opacity-100"
    >
      {isSignature && <SignatureEyebrow />}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="font-serif text-[19px] italic leading-snug tracking-tight text-charcoal md:text-[20px]">
            {item.name}
          </h3>
          <DietaryTags badges={item.badges} />
        </div>
        <div className="flex shrink-0 items-baseline gap-3">
          {item.price && (
            <span className="font-sans text-[15px] font-medium tabular-nums text-charcoal">
              {item.price}
            </span>
          )}
          {showNutrition && item.nutrition && <CaloriesTag calories={item.nutrition.calories} />}
        </div>
      </div>
      <p className="mt-1 font-sans text-[13px] leading-relaxed text-concrete md:mt-1.5 md:text-[14px]">
        {item.desc}
      </p>
      {item.benefit && <BenefitNote text={item.benefit} className="mt-2 text-[13px]" />}
    </m.article>
  )
}
