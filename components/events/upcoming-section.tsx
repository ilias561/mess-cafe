'use client'

import { AnimatePresence, motion } from 'framer-motion'
import EventCard from '@/components/events/event-card'
import SectionReveal from '@/components/section-reveal'
import { EASE } from '@/lib/motion'
import type { Event } from '@/lib/events/events'

type Props = {
  events: Event[]           // restUpcoming — never includes the featured event
  activeCategory: string | null
  proposeHref: string
}

export default function UpcomingSection({ events, activeCategory, proposeHref }: Props) {
  const filtered = activeCategory
    ? events.filter((e) => e.categoryLabel === activeCategory)
    : events

  return (
    <section
      id="upcoming"
      className={`bg-bone px-6 md:px-12 ${events.length === 0 ? 'py-24 md:py-32' : 'py-20 md:py-28'}`}
    >
      <div className="mx-auto max-w-[1400px]">

        <SectionReveal>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            ΕΠΟΜΕΝΕΣ ΕΚΔΗΛΩΣΕΙΣ
          </p>
        </SectionReveal>

        {events.length === 0 ? (
          /* 3c empty state — programme is genuinely empty */
          <div className="mx-auto mt-6 max-w-[36em] text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΣΥΝΤΟΜΑ</p>
            <h2 className="mt-6 font-serif text-[clamp(28px,4vw,44px)] leading-[1.05] tracking-[-0.02em] text-charcoal">
              Δεν έχουμε προγραμματίσει δράση ακόμα.
            </h2>
            <p className="mt-6 font-sans text-[15px] leading-[1.7] text-concrete">
              Στήνουμε σιγά σιγά τα επόμενα — workshops, μουσικές βραδιές, παρουσιάσεις, συνεργασίες. Όταν κλειδώσουν, θα εμφανιστούν εδώ αυτόματα. Στο μεταξύ, μπορείς να μας προτείνεις κάτι ή απλά να περάσεις από τον χώρο για καφέ.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a
                href={proposeHref}
                className="font-sans text-[14px] text-charcoal underline decoration-terracotta underline-offset-[5px] hover:decoration-2"
              >
                Πρότεινε δράση →
              </a>
              <a
                href="/#contact"
                className="font-sans text-[14px] text-charcoal underline decoration-mustard underline-offset-[5px] hover:decoration-2"
              >
                Δες πού είμαστε →
              </a>
            </div>
          </div>
        ) : filtered.length > 0 ? (
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

        {/* Filter indicator — only when a category is active */}
        {events.length > 0 && activeCategory !== null && (
          <p className="mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-concrete">
            {`ΦΙΛΤΡΟ · ${activeCategory.toUpperCase()}`}
          </p>
        )}

      </div>
    </section>
  )
}
