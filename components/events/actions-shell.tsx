'use client'

import { useState, type ReactNode } from 'react'
import EventsIndexHero from '@/components/events/events-index-hero'
import UpcomingSection from '@/components/events/upcoming-section'
import type { Event } from '@/lib/events/events'
import type { Settings } from '@/lib/settings'

type Props = {
  upcomingEvents: Event[]
  restUpcoming: Event[]
  settings: Settings
  children: ReactNode
}

export default function ActionsShell({
  upcomingEvents,
  restUpcoming,
  settings,
  children,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const nextEvent = upcomingEvents[0] ?? null
  const proposeHref = '/reservations'
  const showUpcomingSection = restUpcoming.length > 0 || upcomingEvents.length === 0

  return (
    <>
      <EventsIndexHero
        upcomingEvents={upcomingEvents}
        nextEvent={nextEvent}
        proposeHref={proposeHref}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {children}
      {showUpcomingSection && (
        <UpcomingSection
          events={restUpcoming}
          activeCategory={activeCategory}
          proposeHref={proposeHref}
        />
      )}
    </>
  )
}
