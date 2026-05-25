'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
    <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard">
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

export function MacroStrip({ nutrition, compact = false }: { nutrition: Nutrition; compact?: boolean }) {
  return (
    <dl
      className={`mt-5 grid grid-cols-3 gap-x-4 gap-y-3 border-t border-line/60 pt-4 ${
        compact ? '' : 'sm:grid-cols-6'
      }`}
    >
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

export function DietaryLegendEcho() {
  return (
    <div className="hidden shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-2 md:flex">
      {DIET_ORDER.map((b) => (
        <span key={b} className="inline-flex items-center gap-1.5">
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-olive/50 px-1 font-sans text-[10px] font-semibold text-olive">
            {DIET_TAG[b].short}
          </span>
          <span className="font-sans text-[11px] text-concrete/80">{DIET_TAG[b].label}</span>
        </span>
      ))}
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
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return null
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

  const content = (
    <div className={flip ? 'md:order-1' : ''}>
      {isSignature && <SignatureEyebrow />}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-serif text-[clamp(24px,3vw,32px)] italic leading-tight tracking-tight text-charcoal">
          {item.name}
        </h3>
        <DietaryTags badges={item.badges} />
      </div>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-concrete">{item.desc}</p>
      {item.benefit && <BenefitNote text={item.benefit} className="mt-3" />}
      {showNutrition && item.nutrition && <MacroStrip nutrition={item.nutrition} />}
    </div>
  )

  return (
    <motion.article
      {...itemMotionProps(index)}
      className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12 lg:gap-16"
    >
      <div className={flip ? 'md:order-2' : ''}>
        <div
          className={`w-full overflow-hidden rounded-[6px] bg-bone-warm sm:mx-auto sm:max-w-[300px] md:max-w-[380px] ${
            flip ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
          }`}
        >
          <div className="aspect-[3/2] w-full sm:aspect-[4/5]">
            <MenuItemMedia item={item} />
          </div>
        </div>
      </div>
      {content}
    </motion.article>
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
  const hasMedia = Boolean(item.image || item.video)
  return (
    <motion.article {...itemMotionProps(index)} className="flex flex-col">
      {hasMedia && (
        <div className="aspect-square w-full overflow-hidden rounded-[6px] bg-bone-warm sm:aspect-[4/5]">
          <MenuItemMedia item={item} />
        </div>
      )}
      <div className={hasMedia ? 'mt-3.5' : ''}>
        {isSignature && <SignatureEyebrow />}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="font-serif text-[17px] italic leading-[1.15] tracking-tight text-charcoal sm:text-[20px]">
            {item.name}
          </h3>
          <DietaryTags badges={item.badges} />
        </div>
        <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-concrete sm:text-[14px]">
          {item.desc}
        </p>
        {item.benefit && (
          <BenefitNote text={item.benefit} className="mt-2.5 hidden text-[13px] sm:flex" />
        )}
        {showNutrition && item.nutrition && (
          <div className="hidden sm:block">
            <MacroStrip nutrition={item.nutrition} compact />
          </div>
        )}
      </div>
    </motion.article>
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
    <motion.article
      {...itemMotionProps(index)}
      className="border-b border-line/40 pb-5 transition-colors hover:bg-bone-warm/20 md:rounded-sm md:px-3 md:-mx-3 md:pb-5"
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
    </motion.article>
  )
}
