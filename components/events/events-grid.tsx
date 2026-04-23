import EventCard from '@/components/events/event-card'
import type { Event } from '@/lib/events/events'

type EventsGridProps = {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export default function EventsGrid({ upcomingEvents, pastEvents }: EventsGridProps) {
  return (
    <section className="px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΕΠΟΜΕΝΕΣ ΕΚΔΗΛΩΣΕΙΣ</p>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>

        {pastEvents.length ? (
          <div className="mt-20 border-t border-line/30 pt-14">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΠΑΛΑΙΟΤΕΡΕΣ ΕΚΔΗΛΩΣΕΙΣ</p>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.slug} event={event} dimmed />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
