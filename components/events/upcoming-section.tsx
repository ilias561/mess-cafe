'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import EventCard from '@/components/events/event-card'
import SectionReveal from '@/components/section-reveal'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'

type Props = { events: Event[] }

export default function UpcomingSection({ events }: Props) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  const hasEvents = events.length > 0
  // Filtering a single item is pointless — hide chips when ≤1 event
  const showChips = events.length > 1

  // Derive unique category labels from the actual event set (no phantom chips)
  const presentLabels = [...new Set(events.map((e) => e.categoryLabel))]

  const filtered = activeLabel
    ? events.filter((e) => e.categoryLabel === activeLabel)
    : events

  return (
    <section className="bg-bone px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">

        <SectionReveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            ΕΠΟΜΕΝΕΣ ΕΚΔΗΛΩΣΕΙΣ
          </p>
        </SectionReveal>

        {/* Category filter chips — only shown when >1 event, only with present categories */}
        {showChips && (
          <div className="mt-8 mb-10 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveLabel(null)}
              className={`rounded-full border px-[13px] py-[6px] font-sans text-[11px] tracking-[0.06em] transition-colors duration-150 ${
                activeLabel === null
                  ? 'border-charcoal bg-charcoal text-bone'
                  : 'border-line text-charcoal hover:border-charcoal/40'
              }`}
            >
              Όλες
            </button>
            {presentLabels.map((label) => (
              <button
                key={label}
                onClick={() => setActiveLabel(label)}
                className={`rounded-full border px-[13px] py-[6px] font-sans text-[11px] tracking-[0.06em] transition-colors duration-150 ${
                  activeLabel === label
                    ? 'border-charcoal bg-charcoal text-bone'
                    : 'border-line text-charcoal hover:border-charcoal/40'
                }`}
              >
                {label}
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

        {/* Filter status indicator — only when a specific category is active */}
        {hasEvents && activeLabel !== null && (
          <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-concrete">
            {`ΦΙΛΤΡΟ · ${activeLabel.toUpperCase()}`}
          </p>
        )}

      </div>
    </section>
  )
}
