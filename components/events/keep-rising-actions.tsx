'use client'

import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import { formatGreekDate } from '@/lib/format-date'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'

type Variant = 'upcoming' | 'past'

/**
 * #KeepRising actions — a deliberately simple page: a clean header, then the
 * upcoming actions and the archive listed one after the other, both always
 * visible (no tabs to click). No marquee hero, manifesto or spotlight.
 */
export default function KeepRisingActions({
  upcoming,
  past,
}: {
  upcoming: Event[]
  past: Event[]
}) {
  const reduce = useReducedMotion()

  return (
    <section className="bg-bone px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">
          ΟΙ ΔΡΑΣΕΙΣ ΜΑΣ
        </p>

        {/* Upcoming */}
        <GroupHeading label="Επερχόμενες" count={upcoming.length} className="mt-6" />
        {upcoming.length > 0 ? (
          <ActionList events={upcoming} variant="upcoming" reduce={reduce} />
        ) : (
          <EmptyNote text="Σύντομα νέες δράσεις — μείνε συντονισμένος." />
        )}

        {/* Archive — always visible, no click needed */}
        <GroupHeading label="Αρχείο" count={past.length} className="mt-20 md:mt-28" />
        {past.length > 0 ? (
          <ActionList events={past} variant="past" reduce={reduce} />
        ) : (
          <EmptyNote text="Δεν υπάρχουν παλαιότερες δράσεις ακόμη." />
        )}
      </div>
    </section>
  )
}

function GroupHeading({
  label,
  count,
  className = '',
}: {
  label: string
  count: number
  className?: string
}) {
  return (
    <div className={`flex items-baseline gap-2 border-b border-line pb-3 ${className}`}>
      <h2 className="font-sans text-[13px] uppercase tracking-[0.16em] text-charcoal">{label}</h2>
      <span className="font-sans text-[12px] text-charcoal/35">{count}</span>
    </div>
  )
}

function ActionList({
  events,
  variant,
  reduce,
}: {
  events: Event[]
  variant: Variant
  reduce: boolean | null
}) {
  return (
    <div className="mt-12 flex flex-col gap-20 md:mt-14 md:gap-28">
      {events.map((event, i) => (
        <ActionCard key={event.slug} event={event} variant={variant} flip={i % 2 === 1} reduce={reduce} />
      ))}
    </div>
  )
}

function EmptyNote({ text }: { text: string }) {
  return (
    <p className="mt-12 py-10 text-center font-serif text-[18px] italic text-charcoal/50">{text}</p>
  )
}

function ActionCard({
  event,
  variant,
  flip,
  reduce,
}: {
  event: Event
  variant: Variant
  flip: boolean
  reduce: boolean | null
}) {
  const date = formatGreekDate(event.date)
  const href = `/actions/${event.slug}`

  return (
    <m.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid grid-cols-1 items-center gap-7 md:grid-cols-2 md:gap-12"
    >
      <Link
        href={href}
        className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-[2px] ${flip ? 'md:order-2' : ''}`}
      >
        <FadeImage
          src={event.coverImage}
          alt={event.coverAlt || `Δράση: ${event.title}`}
          fill
          sizes="(min-width: 768px) 50vw, 92vw"
          className="ui-img-hover object-cover"
          style={{ objectPosition: event.coverObjectPosition ?? 'center' }}
        />
        {variant === 'past' && (
          <span className="absolute left-4 top-4 rounded-full bg-charcoal/65 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Ολοκληρώθηκε
          </span>
        )}
      </Link>

      <div className={flip ? 'md:order-1' : ''}>
        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">
          {date} <span className="text-charcoal/30">·</span>{' '}
          <span className="text-terracotta">{event.categoryLabel}</span>
        </p>
        <h2 className="mt-3 font-serif text-[clamp(26px,3.4vw,38px)] leading-[1.06] tracking-[-0.02em] text-charcoal">
          <Link href={href} className="transition-colors duration-250 hover:text-mustard">
            {event.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-[48ch] font-serif text-[clamp(15px,1.2vw,17px)] italic leading-[1.55] text-charcoal/70">
          {event.description}
        </p>
        <div className="mt-7">
          <Link
            href={href}
            className="ui-link inline-flex min-h-[44px] items-center font-sans text-[13px] uppercase tracking-[0.16em] text-charcoal hover:text-mustard md:min-h-0"
          >
            Δες τη δράση →
          </Link>
        </div>
      </div>
    </m.article>
  )
}
