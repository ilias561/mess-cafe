'use client'

import { useState } from 'react'
import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import { formatGreekDate } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'
import type { Settings } from '@/lib/settings'

type Tab = 'upcoming' | 'past'

/**
 * #KeepRising actions — a deliberately simple page: a clean header, a toggle
 * between the upcoming actions and the archive, and the matching list of cards.
 * That's it. No marquee hero, manifesto, spotlight or extra CTAs.
 */
export default function KeepRisingActions({
  upcoming,
  past,
  settings,
}: {
  upcoming: Event[]
  past: Event[]
  settings: Settings
}) {
  const reduce = useReducedMotion()
  const hasUpcoming = upcoming.length > 0
  const hasPast = past.length > 0
  const [tab, setTab] = useState<Tab>(hasUpcoming ? 'upcoming' : 'past')
  const waPhone = settings.whatsapp.replace(/[^\d]/g, '')

  const list = tab === 'upcoming' ? upcoming : past

  return (
    <section className="bg-bone px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
          ΟΙ ΔΡΑΣΕΙΣ ΜΑΣ
        </p>

        {/* toggle */}
        <div role="tablist" aria-label="Δράσεις" className="mt-5 flex items-center gap-1 border-b border-line">
          <TabButton
            active={tab === 'upcoming'}
            onClick={() => setTab('upcoming')}
            label="Επερχόμενες"
            count={upcoming.length}
            disabled={!hasUpcoming}
          />
          <TabButton
            active={tab === 'past'}
            onClick={() => setTab('past')}
            label="Αρχείο"
            count={past.length}
            disabled={!hasPast}
          />
        </div>

        {/* list — keyed so it re-mounts and fades in on tab switch */}
        <m.div
          key={tab}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="mt-14 flex flex-col gap-20 md:gap-28"
        >
          {list.length === 0 ? (
            <p className="py-16 text-center font-serif text-[18px] italic text-charcoal/50">
              {tab === 'upcoming'
                ? 'Σύντομα νέες δράσεις — μείνε συντονισμένος.'
                : 'Δεν υπάρχουν παλαιότερες δράσεις ακόμη.'}
            </p>
          ) : (
            list.map((event, i) => (
              <ActionCard
                key={event.slug}
                event={event}
                variant={tab}
                waPhone={waPhone}
                flip={i % 2 === 1}
                reduce={reduce}
              />
            ))
          )}
        </m.div>
      </div>
    </section>
  )
}

function TabButton({
  active,
  onClick,
  label,
  count,
  disabled,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      disabled={disabled}
      className={`relative -mb-px px-4 py-3 font-sans text-[12px] uppercase tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
        active ? 'text-charcoal' : 'text-charcoal/45 hover:text-charcoal/70'
      }`}
    >
      {label}
      <span className="ml-1.5 text-charcoal/35">{count}</span>
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-mustard transition-transform duration-300 ease-out ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </button>
  )
}

function ActionCard({
  event,
  variant,
  waPhone,
  flip,
  reduce,
}: {
  event: Event
  variant: Tab
  waPhone: string
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: event.coverObjectPosition ?? 'center' }}
        />
        {variant === 'past' && (
          <span className="absolute left-4 top-4 rounded-full bg-charcoal/65 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
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
          <Link href={href} className="transition-colors duration-300 hover:text-mustard">
            {event.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-[48ch] font-serif text-[clamp(15px,1.2vw,17px)] italic leading-[1.55] text-charcoal/70">
          {event.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {variant === 'upcoming' ? (
            <>
              <Link
                href={href}
                className="ui-interactive inline-flex min-h-[44px] items-center justify-center rounded-full bg-mustard px-6 py-3 font-sans text-[12px] uppercase tracking-[0.18em] text-ink-dark hover:bg-amber hover:shadow-md"
              >
                Κράτηση →
              </Link>
              <a
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-interactive inline-flex min-h-[44px] items-center justify-center rounded-full border border-charcoal px-6 py-3 font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal hover:shadow-md"
              >
                WhatsApp
              </a>
            </>
          ) : (
            <Link
              href={href}
              className="ui-link font-sans text-[13px] uppercase tracking-[0.14em] text-charcoal hover:text-mustard"
            >
              Δες τη δράση →
            </Link>
          )}
        </div>
      </div>
    </m.article>
  )
}
