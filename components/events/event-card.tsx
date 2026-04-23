'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { formatGreekDate } from '@/lib/format-date'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'

type EventCardProps = {
  event: Event
  dimmed?: boolean
  mobileCard?: boolean
}

export default function EventCard({ event, dimmed = false, mobileCard = false }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`group/card overflow-hidden rounded-[2px] border border-line/50 bg-bone-warm transition-all ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] ${
        mobileCard ? 'aspect-[4/3]' : 'flex h-[420px] min-w-[320px] flex-col'
      }`}
    >
      <Link href={`/actions/${event.slug}`} className={`block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard ${mobileCard ? 'relative' : ''}`}>
        <div className={`relative ${mobileCard ? 'h-[60%]' : 'h-[60%]'} overflow-hidden`}>
          <Image
            src={event.coverImage}
            alt={event.coverAlt}
            fill
            loading="lazy"
            sizes={mobileCard ? '100vw' : '320px'}
            className={`object-cover transition-transform duration-[400ms] ease-out group-hover/card:scale-[1.04] ${dimmed ? 'opacity-80' : ''}`}
          />
        </div>
        <div className={`relative flex h-[40%] flex-col px-5 py-4 ${mobileCard ? 'h-[40%]' : ''}`}>
          <span className="absolute right-4 top-4 rounded-full border border-line/60 bg-bone px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-charcoal">
            {formatGreekDate(event.date)}
          </span>
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-olive">{event.categoryLabel}</p>
          <h3 className="mt-2 pr-2 font-serif text-[24px] leading-tight tracking-tight text-charcoal">{event.title}</h3>
          <p className="mt-2 line-clamp-2 font-sans text-[14px] leading-relaxed text-concrete">{event.description}</p>
          <span className="mt-auto inline-block font-sans text-sm text-charcoal underline decoration-mustard underline-offset-[5px]">
            Μάθε περισσότερα →
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
