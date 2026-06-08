'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

import aboutSidePhoto from '../../public/images/about-3.jpg'
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

  let day: string | null = null
  let monthAbbrev: string | null = null
  if (nextEvent) {
    const d = new Date(nextEvent.date)
    day = String(d.getDate()).padStart(2, '0')
    monthAbbrev = MONTHS_GR[d.getMonth()]
  }

  /** Merged empty programme + former UpcomingSection empty copy */
  if (upcomingEvents.length === 0) {
    return (
      <section className="border-t border-line/40 bg-bone px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8">
          <div>
            <m.h2
              {...fadeUp}
              className="font-serif text-[clamp(26px,3.5vw,44px)] leading-[1.05] tracking-[-0.02em] text-charcoal"
            >
              Σύντομα κοντά σας.
            </m.h2>
            <m.p
              {...fadeUpDelayed(0.06)}
              className="mt-5 max-w-[42ch] font-sans text-[15px] leading-[1.7] text-concrete md:text-[16px]"
            >
              Στήνουμε σιγά σιγά τα επόμενα — workshops, μουσικές βραδιές, παρουσιάσεις, συνεργασίες. Όταν
              κλειδώσουν, θα εμφανιστούν εδώ αυτόματα.
            </m.p>
            <m.div
              {...fadeUpDelayed(0.1)}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <a
                href={proposeHref}
                className="inline-flex min-h-[44px] items-center font-sans text-[14px] text-charcoal underline decoration-terracotta underline-offset-[5px] hover:decoration-2 md:min-h-0"
              >
                Πρότεινε δράση →
              </a>
              <Link
                href="/#map"
                className="inline-flex min-h-[44px] items-center font-sans text-[14px] text-charcoal underline decoration-mustard underline-offset-[5px] hover:decoration-2 md:min-h-0"
              >
                Δες πού είμαστε →
              </Link>
            </m.div>
          </div>

          <MaskReveal className="relative mx-auto w-full max-w-[320px]" delay={0.08}>
            <div className="relative aspect-[4/5] max-h-[min(52vh,420px)] overflow-hidden rounded-[2px] bg-bone-warm">
              <Image
                src={aboutSidePhoto}
                alt="Εσωτερικό του M.E.S.S. — ο χώρος όπου στήνονται οι δράσεις."
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 34vw, 92vw"
                loading="lazy"
                decoding="async"
                className="object-cover"
              />
            </div>
          </MaskReveal>
        </div>
      </section>
    )
  }

  return (
    <section className="border-t border-line/40 bg-bone px-6 pt-8 pb-8 md:px-12 md:pt-12 md:pb-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8">

        <div>
          <m.p {...fadeUp} className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">
            ΠΡΟΓΡΑΜΜΑ
          </m.p>

          {nextEvent && (
            <m.div {...fadeUpDelayed(0.02)} className="mt-3">
              <Link
                href={`/actions/${nextEvent.slug}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-bone-warm px-4 py-2 font-sans text-[11px] tracking-[0.02em] transition-colors hover:border-charcoal/40 md:min-h-0 md:px-3 md:py-[7px]"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-terracotta" />
                <span className="text-concrete">
                  Επόμενη: <span className="font-medium text-charcoal">{nextEvent.title}</span>
                </span>
                <span className="text-concrete">·</span>
                <span className="text-charcoal">{formatGreekDate(nextEvent.date)}</span>
                <span className="text-terracotta">→</span>
              </Link>
            </m.div>
          )}

          <m.h2
            {...fadeUpDelayed(0.04)}
            className="mt-4 max-w-[18ch] font-serif text-[clamp(28px,3.5vw,52px)] leading-[0.98] tracking-[-0.02em] text-charcoal md:max-w-[20ch]"
          >
            Πρόγραμμα δράσεων.
          </m.h2>

          <m.p
            {...fadeUpDelayed(0.07)}
            className="mt-5 max-w-[72ch] font-sans text-[15px] leading-[1.65] text-concrete md:text-[16px]"
          >
            Workshops, βραδιές, συνεργασίες — όσα ετοιμάζουμε και όσα έχουν γίνει.
          </m.p>

          {showChips && (
            <m.div {...fadeUpDelayed(0.09)} className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                aria-label="Εμφάνιση όλων των κατηγοριών δράσεων"
                aria-pressed={activeCategory === null}
                onClick={() => onCategoryChange(null)}
                className={cn(
                  'ui-interactive inline-flex min-h-[44px] items-center gap-[5px] rounded-full border px-4 py-2 font-sans text-[11px] md:min-h-0 md:px-[11px] md:py-[5px]',
                  activeCategory === null
                    ? 'border-charcoal/40 bg-olive-deep text-charcoal'
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
                  aria-label={`Φίλτρο κατηγορίας: ${label}`}
                  aria-pressed={activeCategory === label}
                  onClick={() => onCategoryChange(label)}
                  className={cn(
                    'ui-interactive inline-flex min-h-[44px] items-center gap-[5px] rounded-full border px-4 py-2 font-sans text-[11px] md:min-h-0 md:px-[11px] md:py-[5px]',
                    activeCategory === label
                      ? 'border-charcoal/40 bg-olive-deep text-charcoal'
                      : 'border-line text-charcoal hover:border-charcoal/40',
                  )}
                >
                  {label}
                  <span className={activeCategory === label ? 'text-mustard' : 'text-concrete'}>
                    {countForLabel(label)}
                  </span>
                </button>
              ))}
            </m.div>
          )}

          <m.div {...fadeUpDelayed(0.11)} className="mt-3">
            <a
              href="#upcoming"
              className="ui-interactive inline-flex min-h-[44px] items-center rounded-full bg-mustard px-5 py-3 font-sans text-[11px] uppercase tracking-[0.14em] text-ink-dark hover:bg-amber md:min-h-0 md:px-[15px] md:py-[9px]"
            >
              Δες πρόγραμμα ↓
            </a>
          </m.div>
        </div>

        <MaskReveal className="relative mx-auto w-full max-w-[320px]" delay={0.1}>
          <div className="relative aspect-[4/5] max-h-[min(56vh,440px)] overflow-hidden rounded-[2px] bg-bone-warm">
            <Image
              src={aboutSidePhoto}
              alt="Εσωτερικό του M.E.S.S. — το δωμάτιο όπου στήνονται οι δράσεις."
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 34vw, 92vw"
              loading="lazy"
              decoding="async"
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
