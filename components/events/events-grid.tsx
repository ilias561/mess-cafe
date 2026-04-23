import EventCard from '@/components/events/event-card'
import type { Event } from '@/lib/events/events'

type EventsGridProps = {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export default function EventsGrid({ upcomingEvents, pastEvents }: EventsGridProps) {
  return (
    <>
      <section className="bg-bone-warm px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΕΠΟΜΕΝΕΣ ΕΚΔΗΛΩΣΕΙΣ</p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {pastEvents.length ? (
        <section className="bg-olive-deep px-6 py-20 text-bone md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">ΑΡΧΕΙΟ · ΠΑΛΑΙΟΤΕΡΕΣ</p>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.slug} event={event} dimmed />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
