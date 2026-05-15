'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import type { MenuItem as MenuItemType } from '@/lib/menu-data'

const BADGE_LABELS: Record<string, string> = {
  vegan: 'vegan',
  vegetarian: 'vegetarian',
  gf: 'gluten-free',
  signature: 'signature',
}

function MenuItemMedia({ item }: { item: MenuItemType }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !item.video) return

    let hasPlayed = false
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true
            void video.play().catch(() => {})
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [item.video])

  if (item.video) {
    return (
      <video
        ref={videoRef}
        src={item.video}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
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

export default function MenuItem({ item, index }: { item: MenuItemType; index: number }) {
  const chips = item.badges?.filter((badge) => badge in BADGE_LABELS) ?? []
  const hasMedia = Boolean(item.image || item.video)

  if (!hasMedia) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
        className={`group py-5 transition-colors hover:bg-bone-warm/40 md:grid md:grid-cols-[minmax(0,1fr)_240px] md:gap-8 ${index > 0 ? 'border-t border-charcoal/5' : ''}`}
      >
        <div className="min-w-0">
          <div className="flex items-end">
            <h3 className="font-serif text-[23px] leading-snug tracking-tight italic text-charcoal">
              {item.name}
            </h3>
            <span className="mx-2 mb-[5px] hidden flex-1 border-b border-dotted border-charcoal/20 md:block" />
          </div>
          <p className="mt-1.5 max-w-prose font-sans text-[14px] leading-relaxed text-concrete">
            {item.desc}
          </p>
          <BadgeRow badges={chips} />
        </div>
        <div className="mt-2 flex items-end md:mt-0 md:justify-end">
          <span className="mr-2 mb-[5px] flex-1 border-b border-dotted border-charcoal/20 md:hidden" />
          <p className="shrink-0 font-serif text-[22px] text-charcoal">{item.price}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
      className={`group py-4 transition-colors hover:bg-bone-warm/40 ${index > 0 ? 'border-t border-charcoal/5' : ''}`}
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-[4px] bg-bone-warm md:h-[100px] md:w-[100px]">
          <MenuItemMedia item={item} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-[20px] leading-snug tracking-tight italic text-charcoal sm:text-[23px]">
              {item.name}
            </h3>
            <p className="shrink-0 font-serif text-[20px] text-charcoal sm:text-[22px]">{item.price}</p>
          </div>
          <p className="mt-1 font-sans text-[13px] leading-relaxed text-concrete sm:text-[14px]">
            {item.desc}
          </p>
          <BadgeRow badges={chips} />
        </div>
      </div>
    </motion.div>
  )
}
