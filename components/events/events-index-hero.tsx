'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import MaskReveal from '@/components/mask-reveal'
import { fadeUp, fadeUpDelayed } from '@/lib/motion'
import { formatGreekDate } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import type { Event } from '@/lib/events/events'

const MONTHS_GR = [
  'ΙΑΝ', 'ΦΕΒ', 'ΜΑΡ', 'ΑΠΡ', 'ΜΑΪ', 'ΙΟΥΝ',
  'ΙΟΥΛ', 'ΑΥΓ', 'ΣΕΠ', 'ΟΚΤ', 'ΝΟΕ', 'ΔΕΚ',
] as const

type Props = {
  upcomingEvents: Event[]
  nextEvent: Event | null
  proposeHref: string
  activeCategory: string | null
  onCategoryChange: (cat: string | null) => void
}

export default function EventsIndexHero({
  upcomingEvents,
  nextEvent,
  proposeHref,
  activeCategory,
  onCategoryChange,
}: Props) {
  const showChips = upcomingEvents.length > 1
  const presentLabels = [...new Set(upcomingEvents.map((e) => e.categoryLabel))]

  const countForLabel = (label: string | null) =>
    label === null
      ? upcomingEvents.length
      : upcomingEvents.filter((e) => e.categoryLabel === label).length

  // Date-tag values derived from the next event's date
  let day: string | null = null
  let monthAbbrev: string | null = null
  if (nextEvent) {
    const d = new Date(nextEvent.date)
    day = String(d.getDate()).padStart(2, '0')
    monthAbbrev = MONTHS_GR[d.getMonth()]
  }

  return (
    <section className="px-6 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[7fr_5fr] md:items-start md:gap-12">

        <div>
          <motion.p {...fadeUp} className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
            ΟΙ ΔΡΑΣΕΙΣ ΜΑΣ
          </motion.p>

          {/* Inline pill — next event */}
          {nextEvent && (
            <motion.div {...fadeUpDelayed(0.04)} className="mt-3">
              <Link
                href={`/actions/${nextEvent.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-bone-warm px-3 py-[7px] font-sans text-[11px] tracking-[0.02em] transition-colors hover:border-charcoal/40"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-terracotta" />
                <span className="text-concrete">
                  Επόμενη: <span className="font-medium text-charcoal">{nextEvent.title}</span>
                </span>
                <span className="text-concrete">·</span>
                <span className="text-charcoal">{formatGreekDate(nextEvent.date)}</span>
                <span className="text-terracotta">→</span>
              </Link>
            </motion.div>
          )}

          <motion.h1
            {...fadeUpDelayed(0.08)}
            className="mt-6 max-w-[14ch] font-serif text-[clamp(44px,6.5vw,96px)] leading-[0.98] tracking-[-0.02em] text-charcoal md:max-w-[16ch]"
          >
            Περισσότερο από έναν καφέ.
          </motion.h1>

          <motion.p
            {...fadeUpDelayed(0.14)}
            className="mt-8 max-w-[72ch] font-sans text-[16px] leading-[1.7] text-concrete md:text-[17px]"
          >
            Workshops, μουσικές βραδιές, πολιτιστικά ραντεβού και συνεργασίες που κρατούν τον χώρο μας ανοιχτό στην κοινότητα.
          </motion.p>

          {/* Category filter chips — only when >1 event, with counts */}
          {showChips && (
            <motion.div {...fadeUpDelayed(0.18)} className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className={cn(
                  'inline-flex items-center gap-[5px] rounded-full border px-[11px] py-[5px] font-sans text-[11px] transition-colors',
                  activeCategory === null
                    ? 'border-charcoal bg-charcoal text-bone'
                    : 'border-line text-charcoal hover:border-charcoal/40',
                )}
              >
                Όλες
                <span className={activeCategory === null ? 'text-mustard' : 'text-concrete'}>
                  {countForLabel(null)}
                </span>
              </button>
              {presentLabels.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => onCategoryChange(label)}
                  className={cn(
                    'inline-flex items-center gap-[5px] rounded-full border px-[11px] py-[5px] font-sans text-[11px] transition-colors',
                    activeCategory === label
                      ? 'border-charcoal bg-charcoal text-bone'
                      : 'border-line text-charcoal hover:border-charcoal/40',
                  )}
                >
                  {label}
                  <span className={activeCategory === label ? 'text-mustard' : 'text-concrete'}>
                    {countForLabel(label)}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {/* CTA row */}
          <motion.div {...fadeUpDelayed(0.22)} className="mt-4 flex items-center gap-[14px]">
            {upcomingEvents.length > 0 && (
              <a
                href="#upcoming"
                className="inline-block rounded-[2px] bg-charcoal px-[15px] py-[9px] font-sans text-[11px] uppercase tracking-[0.14em] text-bone transition-colors hover:bg-charcoal/90"
              >
                Δες πρόγραμμα ↓
              </a>
            )}
            <span className="font-sans text-[12px] text-concrete">
              ή{' '}
              <a
                href={proposeHref}
                className="text-charcoal underline decoration-terracotta underline-offset-[5px] hover:decoration-2"
              >
                πρότεινε δράση
              </a>
            </span>
          </motion.div>
        </div>

        {/* Right: photo with optional date tag — hidden on mobile to avoid blank clip-path space */}
        <MaskReveal className="relative mx-auto hidden w-full max-w-[420px] md:mx-0 md:block md:max-w-none" delay={0.2}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-bone-warm">
            <Image
              src="/images/about-2.jpg"
              alt="Εσωτερικό του M.E.S.S. — το δωμάτιο όπου στήνονται οι δράσεις."
              fill
              sizes="(min-width: 768px) 34vw, 92vw"
              className="object-cover"
            />
            {nextEvent && day && monthAbbrev && (
              <div className="absolute right-3 top-3 min-w-[42px] rounded-[2px] bg-bone px-3 py-[7px] text-center">
                <span className="block font-serif text-[20px] font-medium leading-none text-charcoal">
                  {day}
                </span>
                <span className="mt-[3px] block font-sans text-[11px] uppercase tracking-[0.18em] text-concrete">
                  {monthAbbrev}
                </span>
              </div>
            )}
          </div>
        </MaskReveal>

      </div>
    </section>
  )
}
