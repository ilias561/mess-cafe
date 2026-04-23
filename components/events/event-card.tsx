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
}

export default function EventCard({ event, dimmed = false }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group/card relative overflow-hidden rounded-[3px] transition-shadow duration-200 hover:shadow-[0_14px_28px_rgba(43,43,40,0.12)]"
    >
      <Link
        href={`/actions/${event.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-mustard focus-visible:outline-offset-4"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.coverAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 420px"
            className={`object-cover transition-[transform,filter] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.05] group-hover/card:[filter:sepia(0.15)_saturate(1.1)] ${dimmed ? 'opacity-70' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-bone/95 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-charcoal">
            {formatGreekDate(event.date)}
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-bone">
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-mustard">{event.categoryLabel}</p>
            <h3 className="mt-2 font-serif text-[clamp(22px,2.6vw,30px)] leading-[1.1] tracking-[-0.01em]">
              {event.title}
            </h3>
            <span className="mt-3 inline-flex items-center gap-1 font-sans text-[12px] uppercase tracking-[0.18em] text-bone/90 underline decoration-terracotta underline-offset-[5px]">
              Μάθε περισσότερα →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
