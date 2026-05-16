'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuItem as MenuItemType } from '@/lib/menu-data'

const BADGE_LABELS: Record<string, string> = {
  vegan: 'vegan',
  vegetarian: 'vegetarian',
  gf: 'gluten-free',
}

function itemMotionProps(index: number) {
  return {
    initial: { opacity: 0, y: 16 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: '-40px' } as const,
    transition: { duration: 0.55, ease: EASE, delay: index * 0.04 },
  }
}

function SignatureEyebrow() {
  return (
    <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-mustard">
      ✦ Signature
    </p>
  )
}

function MenuItemMedia({ item }: { item: MenuItemType }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !item.video) return

    let hasPlayed = false
    // Two-stage observer: prebuffer well before view, play when in view.
    const prefetchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.preload !== 'auto') {
            video.preload = 'auto'
            // Nudge the browser to actually fetch frames, not just metadata.
            try {
              video.load()
            } catch {
              /* noop */
            }
          }
        })
      },
      { rootMargin: '600px 0px' },
    )

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true
            void video.play().catch(() => {
              // Autoplay can fail on some mobile browsers; poster still shows.
            })
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    )

    prefetchObserver.observe(video)
    playObserver.observe(video)
    return () => {
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

function BadgeRow({ badges }: { badges: string[] }) {
  if (badges.length === 0) return null
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span
          key={badge}
          className="rounded-full bg-bone-warm px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-olive"
        >
          {BADGE_LABELS[badge]}
        </span>
      ))}
    </div>
  )
}

function getItemBadges(item: MenuItemType) {
  const isSignature = item.badges?.includes('signature') ?? false
  const chips =
    item.badges?.filter((badge) => badge !== 'signature' && badge in BADGE_LABELS) ?? []
  return { isSignature, chips }
}

export function MenuItemVisual({ item, index }: { item: MenuItemType; index: number }) {
  const { isSignature, chips } = getItemBadges(item)
  const hasMedia = Boolean(item.image || item.video)

  return (
    <motion.article
      {...itemMotionProps(index)}
      className="group flex flex-col transition-colors hover:bg-bone-warm/30 md:rounded-sm md:p-2 md:-m-2"
    >
      {hasMedia && (
        <div className="aspect-square w-full overflow-hidden rounded-[4px] bg-bone-warm">
          <MenuItemMedia item={item} />
        </div>
      )}

      <div className={hasMedia ? 'mt-4' : ''}>
        {isSignature && <SignatureEyebrow />}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 font-serif text-[22px] leading-snug tracking-tight italic text-charcoal">
            {item.name}
          </h3>
          <p className="shrink-0 font-serif text-[22px] text-charcoal">{item.price}</p>
        </div>
        <p className="mt-2 font-sans text-[14px] leading-relaxed text-concrete">{item.desc}</p>
        <BadgeRow badges={chips} />
      </div>
    </motion.article>
  )
}

export function MenuItemList({ item, index }: { item: MenuItemType; index: number }) {
  const { isSignature, chips } = getItemBadges(item)

  return (
    <motion.article
      {...itemMotionProps(index)}
      className="group py-2 transition-colors hover:bg-bone-warm/30 md:rounded-sm md:px-3 md:-mx-3"
    >
      {isSignature && <SignatureEyebrow />}
      <div className="flex items-baseline gap-2">
        <h3 className="shrink-0 font-serif text-[22px] leading-snug tracking-tight italic text-charcoal">
          {item.name}
        </h3>
        <span
          className="mb-[0.35em] min-w-[1rem] flex-1 border-b border-dotted border-charcoal/20"
          aria-hidden
        />
        <p className="shrink-0 font-serif text-[22px] tabular-nums text-charcoal">{item.price}</p>
      </div>
      <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-concrete md:text-[14px]">
        {item.desc}
      </p>
      <BadgeRow badges={chips} />
    </motion.article>
  )
}
