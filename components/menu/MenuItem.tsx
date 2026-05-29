'use client'

import { useEffect, useRef } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'
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
    viewport: { once: true, margin: '-40px' } as const,
    transition: { duration: 0.55, ease: EASE, delay: index * 0.04 },
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
      <summary className="flex cursor-pointer list-none items-center gap-2 font-sans text-[12px] font-medium tabular-nums tracking-wide text-olive/80 marker:hidden">
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

export function MacroStrip({ nutrition, compact = false }: { nutrition: Nutrition; compact?: boolean }) {
  return (
    <dl className={`grid grid-cols-3 gap-x-4 gap-y-3 ${compact ? '' : 'sm:grid-cols-6'}`}>
      {MACRO_FIELDS.map(({ key, label, unit }) => (
        <div key={key} className="flex min-w-0 flex-col gap-0.5">
          <dt className="truncate font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-olive/70">
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

function MenuItemMedia({ item }: { item: MenuItemType }) {
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
        className="h-full w-full object-cover"
        aria-label={item.name}
        onEnded={(e) => {
          e.currentTarget.pause()
        }}
      />
    )
  }

  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.name}
        className="block h-auto w-full rounded-[6px]"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return null
}

function NameChip({ name }: { name: string }) {
  return (
    <span className="absolute left-0 top-4 z-20 max-w-[62%] bg-canopy-night px-3.5 py-2 font-sans text-[12px] font-bold uppercase leading-[1.2] tracking-[0.08em] text-charcoal shadow-[0_4px_18px_rgba(14,34,8,0.45)] sm:left-3 sm:text-[13px]">
      {/* alt scheme if owner wants the mustard peak tie-in: bg-mustard text-ink-dark */}
      {name}
    </span>
  )
}

function CutoutMedia({ item, reduce }: { item: MenuItemType; reduce: boolean | null }) {
  return (
    <m.div
      className="relative flex aspect-square w-full items-center justify-center"
      initial={false}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] left-1/2 h-5 w-3/5 -translate-x-1/2 rounded-[50%]"
        style={{ background: 'radial-gradient(ellipse, rgba(14,34,8,0.55) 0%, rgba(14,34,8,0) 70%)' }}
      />
      <img
        src={item.cutout}
        alt={item.name}
        className="relative z-10 h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(14,34,8,0.35)]"
        loading="lazy"
        decoding="async"
      />
    </m.div>
  )
}

export function MenuFeatureRow({
  item,
  index,
  showNutrition = true,
}: {
  item: MenuItemType
  index: number
  showNutrition?: boolean
}) {
  const { isSignature } = getItemBadges(item)
  const flip = index % 2 === 1
  const reduce = useReducedMotion()
  const hasCutout = Boolean(item.cutout)

  const content = (
    <div className={flip ? 'md:order-1' : ''}>
      {isSignature && <SignatureEyebrow />}
      {hasCutout && (
        <>
          <h3 className="sr-only">{item.name}</h3>
          <DietaryTags badges={item.badges} />
        </>
      )}
      {!hasCutout && (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="type-card u-balance font-serif italic tracking-tight text-charcoal">
            {item.name}
          </h3>
          <DietaryTags badges={item.badges} />
        </div>
      )}
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-concrete">{item.desc}</p>
      {item.benefit && <BenefitNote text={item.benefit} className="mt-3" />}
      {showNutrition && item.nutrition && <NutritionDisclosure nutrition={item.nutrition} />}
    </div>
  )

  return (
    <m.article
      {...itemMotionProps(index)}
      className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12 lg:gap-16"
    >
      <div className={flip ? 'md:order-2' : ''}>
        {hasCutout ? (
          <div
            className={`relative w-full sm:mx-auto sm:max-w-[300px] md:max-w-[380px] ${
              flip ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
            }`}
          >
            <CutoutMedia item={item} reduce={reduce} />
            <NameChip name={item.name} />
          </div>
        ) : (
          <div
            className={`w-full overflow-hidden rounded-[6px] sm:mx-auto sm:max-w-[300px] md:max-w-[380px] ${
              item.video ? 'bg-bone-warm' : ''
            } ${flip ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}
          >
            {item.video ? (
              <div className="aspect-[3/2] w-full sm:aspect-[4/5]">
                <MenuItemMedia item={item} />
              </div>
            ) : (
              <MenuItemMedia item={item} />
            )}
          </div>
        )}
      </div>
      {content}
    </m.article>
  )
}

export function MenuGridItem({
  item,
  index,
  showNutrition = true,
}: {
  item: MenuItemType
  index: number
  showNutrition?: boolean
}) {
  const { isSignature } = getItemBadges(item)
  const reduce = useReducedMotion()
  const hasCutout = Boolean(item.cutout)
  const hasMedia = Boolean(item.image || item.video)

  return (
    <m.article {...itemMotionProps(index)} className="flex flex-col">
      {hasCutout ? (
        <div className="relative">
          <CutoutMedia item={item} reduce={reduce} />
          <NameChip name={item.name} />
        </div>
      ) : (
        hasMedia && (
          <div className={`w-full overflow-hidden rounded-[6px] ${item.video ? 'bg-bone-warm' : ''}`}>
            {item.video ? (
              <div className="aspect-square w-full sm:aspect-[4/5]">
                <MenuItemMedia item={item} />
              </div>
            ) : (
              <MenuItemMedia item={item} />
            )}
          </div>
        )
      )}
      <div className={hasMedia || hasCutout ? 'mt-3.5' : ''}>
        {isSignature && <SignatureEyebrow />}
        {hasCutout ? (
          <>
            <h3 className="sr-only">{item.name}</h3>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <DietaryTags badges={item.badges} />
            </div>
          </>
        ) : (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h3 className="font-serif text-[17px] italic leading-[1.15] tracking-tight text-charcoal sm:text-[20px]">
              {item.name}
            </h3>
            <DietaryTags badges={item.badges} />
          </div>
        )}
        <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-concrete sm:text-[14px]">
          {item.desc}
        </p>
        {item.benefit && (
          <BenefitNote text={item.benefit} className="mt-2.5 hidden text-[13px] sm:flex" />
        )}
        {showNutrition && item.nutrition && (
          <div className="hidden sm:block">
            <NutritionDisclosure nutrition={item.nutrition} compact />
          </div>
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
      className="relative border-b border-line/40 pb-5 transition-colors hover:bg-bone-warm/60 md:rounded-sm md:px-3 md:-mx-3 md:pb-5 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-mustard before:opacity-0 before:transition-opacity hover:before:opacity-100"
    >
      {isSignature && <SignatureEyebrow />}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="font-serif text-[20px] italic leading-snug tracking-tight text-charcoal">
            {item.name}
          </h3>
          <DietaryTags badges={item.badges} />
        </div>
        {showNutrition && item.nutrition && <CaloriesTag calories={item.nutrition.calories} />}
      </div>
      <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-concrete md:text-[14px]">
        {item.desc}
      </p>
      {item.benefit && <BenefitNote text={item.benefit} className="mt-2 text-[13px]" />}
    </m.article>
  )
}
