'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, fadeUpDelayed } from '@/lib/motion'
import { formatGreekDate } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'
import type { Settings } from '@/lib/settings'

type Props = {
  event: Event
  settings: Settings
}

export default function FeaturedNextEvent({ event, settings }: Props) {
  const waPhone = settings.whatsapp.replace(/[^\d]/g, '')

  return (
    <section className="bg-bone-warm px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-[18px] md:grid-cols-[1fr_1.05fr] md:items-center">

          {/* Left: portrait image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <Image
              src={event.coverImage}
              alt={event.coverAlt}
              fill
              sizes="(min-width: 768px) 46vw, 92vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Right: text block */}
          <div className="md:pl-8 lg:pl-14">
            <motion.p {...fadeUp} className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
              ΕΠΟΜΕΝΗ ΔΡΑΣΗ · {formatGreekDate(event.date)}
            </motion.p>
            <motion.p
              {...fadeUpDelayed(0.06)}
              className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-terracotta"
            >
              {event.categoryLabel.toUpperCase()}
            </motion.p>
            <motion.h2
              {...fadeUpDelayed(0.1)}
              className="mt-5 font-serif text-[clamp(28px,4vw,40px)] leading-[1.05] tracking-[-0.02em] text-charcoal"
            >
              {event.title}
            </motion.h2>
            <motion.p
              {...fadeUpDelayed(0.16)}
              className="mt-5 max-w-[54ch] font-sans text-[13px] leading-[1.65] text-concrete md:text-[14px]"
            >
              {event.description}
            </motion.p>
            <motion.div {...fadeUpDelayed(0.22)} className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/actions/${event.slug}`}
                className="rounded-[2px] bg-charcoal px-6 py-3 font-sans text-[12px] uppercase tracking-[0.18em] text-bone transition-all duration-200 hover:-translate-y-px hover:shadow-md"
              >
                ΚΡΑΤΗΣΗ →
              </Link>
              <a
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2px] border border-charcoal px-6 py-3 font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-px hover:shadow-md"
              >
                WHATSAPP
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
