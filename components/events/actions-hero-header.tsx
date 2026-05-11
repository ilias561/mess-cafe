'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import { fadeUp, fadeUpDelayed } from '@/lib/motion'
import type { Event } from '@/lib/events/events'
import { formatGreekDate } from '@/lib/format-date'

type Props = {
  nextEvent: Event | null
}

const heroWords = 'Περισσότερο από έναν καφέ.'.split(' ')

const KEEP_RISING_STRIP =
  'ΚΑΘΑΡΟ ΦΑΓΗΤΟ ΓΙΑ ΟΣΟΥΣ ΤΟ ΧΡΕΙΑΖΟΝΤΑΙ · ΜΠΑΖΑΡ ΑΛΛΗΛΕΓΓΥΗΣ · ΑΝΟΙΧΤΕΣ ΠΟΡΤΕΣ ΓΙΑ ΚΑΘΕ ΗΛΙΚΙΑ · WORKSHOPS & ΠΟΛΙΤΙΣΜΟΣ · #KEEPRISING'

export default function ActionsHeroHeader({ nextEvent }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-bone px-6 pt-24 pb-6 md:px-12 md:pt-40 md:pb-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-[40rem] text-center md:text-left">
          <motion.p
            {...fadeUp}
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/60"
          >
            SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
          </motion.p>

          <motion.h1
            {...fadeUpDelayed(0.04)}
            className="mt-4 font-serif text-[clamp(32px,4.8vw,64px)] leading-[0.98] tracking-[-0.02em] text-charcoal"
          >
            {heroWords.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span className="inline-block overflow-hidden align-baseline">
                  <motion.span
                    className="inline-block"
                    initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={fadeUp.viewport}
                    transition={{
                      ...(fadeUp.transition ?? {}),
                      delay: i * 0.05,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < heroWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </motion.h1>

          <motion.div {...fadeUpDelayed(0.08)} className="mt-5">
            {prefersReducedMotion ? (
              <p className="text-center font-sans text-[11px] uppercase tracking-[0.18em] text-olive/70 md:text-left">
                {KEEP_RISING_STRIP}
              </p>
            ) : (
              <div className="-mx-6 overflow-hidden md:-mx-12">
                <div className="marquee-track flex w-max font-sans text-[11px] uppercase tracking-[0.18em] text-olive/70">
                  <span className="inline-flex shrink-0 items-center px-8">{KEEP_RISING_STRIP}</span>
                  <span className="inline-flex shrink-0 items-center px-8">{KEEP_RISING_STRIP}</span>
                </div>
              </div>
            )}
          </motion.div>

          {nextEvent && (
            <motion.div {...fadeUpDelayed(0.11)} className="mt-5">
              <Link
                href={`/actions/${nextEvent.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-bone-warm px-3 py-[7px] font-sans text-[11px] tracking-[0.02em] text-charcoal transition-colors hover:border-charcoal/40"
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
        </div>
      </div>
    </section>
  )
}
