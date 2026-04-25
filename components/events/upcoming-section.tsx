'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import EventCard from '@/components/events/event-card'
import SectionReveal from '@/components/section-reveal'
import { EASE } from '@/lib/motion'
import type { Event, EventCategory } from '@/lib/events/events'

const CHIP_CATEGORIES: { label: string; key: EventCategory | null }[] = [
  { label: 'Όλες', key: null },
  { label: 'Workshops', key: 'workshop' },
  { label: 'Μουσική', key: 'music' },
  { label: 'Πολιτισμός', key: 'culture' },
  { label: 'Συνεργασίες', key: 'collaboration' },
]

type Props = { events: Event[] }

export default function UpcomingSection({ events }: Props) {
  const [activeKey, setActiveKey] = useState<EventCategory | null>(null)

  const hasEvents = events.length > 0
  const filtered = activeKey ? events.filter((e) => e.category === activeKey) : events
  const activeLabel = CHIP_CATEGORIES.find((c) => c.key === activeKey)?.label ?? 'Όλες'

  return (
    <section className="bg-bone px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">

        <SectionReveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            ΕΠΟΜΕΝΕΣ ΕΚΔΗΛΩΣΕΙΣ
          </p>
        </SectionReveal>

        {/* Category filter chips — hidden when no events */}
        {hasEvents && (
          <div className="mt-8 mb-10 flex flex-wrap gap-2">
            {CHIP_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveKey(cat.key)}
                className={`rounded-full border px-[13px] py-[6px] font-sans text-[11px] tracking-[0.06em] transition-colors duration-150 ${
                  activeKey === cat.key
                    ? 'border-charcoal bg-charcoal text-bone'
                    : 'border-line text-charcoal hover:border-charcoal/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Grid or empty state */}
        {!hasEvents ? (
          <div className="mx-auto py-16 text-center" style={{ maxWidth: '36em' }}>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΣΥΝΤΟΜΑ</p>
            <h2 className="mt-5 font-serif text-[clamp(24px,3.5vw,36px)] leading-[1.1] tracking-[-0.02em] text-charcoal">
              Δεν υπάρχει προγραμματισμένη δράση αυτή τη στιγμή.
            </h2>
            <p className="mt-5 font-sans text-[14px] leading-[1.65] text-concrete md:text-[15px]">
              Όταν στήσουμε την επόμενη — workshop, βραδιά, παρουσίαση — θα εμφανιστεί εδώ αυτόματα. Στο μεταξύ, βρες μας στον χώρο για καφέ.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-block font-sans text-[14px] text-charcoal underline decoration-terracotta underline-offset-[5px] transition-opacity hover:opacity-70"
            >
              Δες πού είμαστε →
            </Link>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((event) => (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="py-12 font-sans text-[14px] text-concrete">
            Καμία δράση σε αυτή την κατηγορία αυτή τη στιγμή.
          </p>
        )}

        {/* Filter status indicator — hidden when no events */}
        {hasEvents && (
          <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-concrete">
            {activeKey === null
              ? 'ΟΛΕΣ ΟΙ ΚΑΤΗΓΟΡΙΕΣ'
              : `ΦΙΛΤΡΟ: ${activeLabel.toUpperCase()}`}
          </p>
        )}

      </div>
    </section>
  )
}
