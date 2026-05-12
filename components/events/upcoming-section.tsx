'use client'

import { AnimatePresence, motion } from 'framer-motion'
import EventCard from '@/components/events/event-card'
import SectionReveal from '@/components/section-reveal'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'

type Props = {
  events: Event[]           // restUpcoming — never includes the featured event
  activeCategory: string | null
}

export default function UpcomingSection({ events, activeCategory }: Props) {
  if (events.length === 0) return null

  const filtered = activeCategory
    ? events.filter((e) => e.categoryLabel === activeCategory)
    : events

  return (
    <section
      id="upcoming"
      className="bg-bone px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        <SectionReveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            ΕΠΟΜΕΝΕΣ ΕΚΔΗΛΩΣΕΙΣ
          </p>
        </SectionReveal>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
          <p className="mt-10 py-12 font-sans text-[14px] text-concrete">
            Καμία δράση σε αυτή την κατηγορία αυτή τη στιγμή.
          </p>
        )}

        {activeCategory !== null && (
          <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-concrete">
            {`ΦΙΛΤΡΟ · ${activeCategory.toUpperCase()}`}
          </p>
        )}

      </div>
    </section>
  )
}
