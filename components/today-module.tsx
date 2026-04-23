'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Event } from '@/lib/events/events'
import { getOpenStatus } from '@/lib/hours'
import { fadeIn } from '@/lib/motion'

type TodayModuleProps = {
  events: Event[]
}

function toLocalDayKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function TodayModule({ events }: TodayModuleProps) {
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
    <motion.section
      {...fadeIn}
      className="border-y border-charcoal/10 bg-bone/95 px-6 py-10 md:px-12 md:py-14"
      aria-label="Σήμερα στο M.E.S.S."
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 md:grid-cols-3 md:gap-10">
        <div className="space-y-3">
          <p className="font-sans text-xs font-semibold tracking-[0.16em] text-charcoal/60 uppercase">Κατάσταση χώρου</p>
          <p className="font-sans text-sm font-medium tracking-[0.08em] text-charcoal uppercase">
            {status.label}
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-sans text-xs font-semibold tracking-[0.16em] text-charcoal/60 uppercase">Σήμερα</p>
          <p className="font-serif text-[clamp(24px,3vw,36px)] leading-tight capitalize text-charcoal">
            {todayLabel}
          </p>
        </div>

        <div className="space-y-3">
          {todayEvent ? (
            <>
              <p className="font-sans text-xs font-semibold tracking-[0.16em] text-charcoal/60 uppercase">Σημερινή δράση</p>
              <p className="font-serif text-xl leading-tight text-charcoal">{todayEvent.title}</p>
              <Link href={`/actions/${todayEvent.slug}`} className="font-sans text-sm font-medium text-olive underline underline-offset-4">
                Μάθε περισσότερα
              </Link>
            </>
          ) : (
            <>
              <p className="font-sans text-xs font-semibold tracking-[0.16em] text-charcoal/60 uppercase">Today we recommend:</p>
              {fallbackEvent ? (
                <div className="space-y-2">
                  <p className="font-serif text-xl leading-tight text-charcoal">{fallbackEvent.title}</p>
                  <div className="flex items-center gap-4">
                    <Link href={`/actions/${fallbackEvent.slug}`} className="font-sans text-sm font-medium text-olive underline underline-offset-4">
                      Μάθε περισσότερα
                    </Link>
                    {upcomingCurated.length > 1 && (
                      <button
                        type="button"
                        onClick={handleNextRecommendation}
                        className="font-sans text-xs font-medium tracking-[0.12em] text-charcoal/70 uppercase"
                      >
                        Επόμενο
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="font-sans text-sm text-charcoal/70">Δεν υπάρχουν προγραμματισμένες δράσεις για σήμερα.</p>
              )}
            </>
          )}
        </div>
      </div>
    </motion.section>
  )
}
