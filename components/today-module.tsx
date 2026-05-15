'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Event } from '@/lib/events/events'
import { getOpenStatus } from '@/lib/hours'
import { Reveal } from '@/components/reveal'

type TodayModuleProps = {
  events: Event[]
}

type StatusPillProps = {
  isOpen: boolean
  label: string
}

function StatusPill({ isOpen, label }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-sans text-sm font-medium tracking-[0.08em] uppercase ${
        isOpen ? 'bg-olive/10 text-olive-deep' : 'bg-terracotta/10 text-terracotta'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-olive animate-[messPulse_2s_ease-in-out_infinite]' : 'bg-terracotta'}`}
        aria-hidden
      />
      {label}
    </span>
  )
}

function toLocalDayKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function TodayModule({ events }: TodayModuleProps) {
  const suggestions = [
    'Πέρασε για καφέ και ησυχία.',
    'Δοκίμασε το freddo cappuccino μας.',
    'Σήμερα είναι ιδανική μέρα για acai bowl.',
    'Κάτσε στον 1ο όροφο με θέα τη λίμνη.',
    'Ένα smoothie για να ξεκινήσεις τη μέρα σου.',
  ]
  const [suggestionIndex, setSuggestionIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % suggestions.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const status = getOpenStatus()
  const [cardIndex, setCardIndex] = useState(0)
  const today = useMemo(() => new Date(), [])
  const todayLabel = useMemo(
    () => today.toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long' }),
    [today],
  )
  const todayKey = useMemo(() => toLocalDayKey(today), [today])

  const todayEvent = useMemo(
    () => events.find((event) => toLocalDayKey(new Date(event.date)) === todayKey),
    [events, todayKey],
  )

  const upcomingCurated = useMemo(() => {
    const now = today.getTime()
    return events
      .filter((event) => new Date(event.date).getTime() >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)
  }, [events, today])

  const fallbackEvent = upcomingCurated.length > 0
    ? upcomingCurated[cardIndex % upcomingCurated.length]
    : null

  const handleNextRecommendation = () => {
    if (upcomingCurated.length > 1) {
      setCardIndex((prev) => (prev + 1) % upcomingCurated.length)
    }
  }

  return (
    <section
      className="relative overflow-hidden border-y border-charcoal/10 bg-gradient-to-b from-cream via-bone-warm to-bone-warm px-6 py-10 md:px-12 md:py-14"
      aria-label="Σήμερα στο M.E.S.S."
    >
      <Reveal className="relative">
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-8 md:grid-cols-3 md:gap-10">
          <div className="flex items-start justify-between gap-6 md:contents">
            <div className="space-y-3">
              <p className="font-sans text-xs font-semibold tracking-[0.16em] text-olive uppercase">Κατάσταση χώρου</p>
              <StatusPill isOpen={status.isOpen} label={status.label} />
              {status.nextChangeLabel && (
                <p className="mt-1 font-sans text-xs text-concrete">
                  {status.isOpen ? `Ανοιχτά ${status.nextChangeLabel}` : `Ανοίγει ${status.nextChangeLabel}`}
                </p>
              )}
            </div>

            <div className="space-y-3 text-right md:text-left">
              <p className="font-sans text-xs font-semibold tracking-[0.16em] text-olive uppercase">Σήμερα</p>
              <p className="font-serif text-[clamp(24px,3vw,36px)] leading-tight capitalize text-charcoal">
                {todayLabel}
              </p>
              <span className="mt-2 block h-px w-10 bg-mustard md:ml-0 ml-auto" aria-hidden />
            </div>
          </div>

          <div className="space-y-3">
            {todayEvent ? (
              <>
                <p className="font-sans text-xs font-semibold tracking-[0.16em] text-olive uppercase">Σημερινή δράση</p>
                <p className="font-serif text-xl leading-tight text-charcoal">{todayEvent.title}</p>
                <Link href={`/actions/${todayEvent.slug}`} className="font-sans text-sm font-medium text-olive underline underline-offset-4">
                  Μάθε περισσότερα
                </Link>
              </>
            ) : (
              <>
                <p className="font-sans text-xs font-semibold tracking-[0.16em] text-olive uppercase">Προτείνουμε σήμερα:</p>
                {fallbackEvent ? (
                  <div className="space-y-2">
                    <p className="font-serif text-xl leading-tight text-charcoal">{fallbackEvent.title}</p>
                    <div className="flex items-center gap-4">
                      <Link href={`/actions/${fallbackEvent.slug}`} className="ui-link font-sans text-sm font-medium text-olive underline underline-offset-4">
                        Μάθε περισσότερα
                      </Link>
                      {upcomingCurated.length > 1 && (
                        <button
                          type="button"
                          onClick={handleNextRecommendation}
                          className="ui-link font-sans text-xs font-medium tracking-[0.12em] text-charcoal/70 uppercase hover:text-charcoal"
                        >
                          Επόμενο
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 rounded-2xl border border-mustard/35 bg-cream/60 p-4">
                    <p className="font-sans text-sm text-charcoal/80 transition-opacity duration-500" key={suggestionIndex}>
                      {suggestions[suggestionIndex]}
                    </p>
                    <Link
                      href="/actions"
                      className="group inline-flex items-center gap-2 rounded-full border border-mustard px-5 py-2.5 font-sans text-sm font-medium text-charcoal transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-mustard active:scale-[0.98]"
                    >
                      Δες όλες τις δράσεις
                      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
