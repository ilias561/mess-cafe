import EventCard from '@/components/events/event-card'
import { getRelatedEvents } from '@/lib/events/events'

type RelatedEventsProps = {
  currentSlug: string
}

export default function RelatedEvents({ currentSlug }: RelatedEventsProps) {
  const relatedEvents = getRelatedEvents(currentSlug, 3)

  if (!relatedEvents.length) return null

  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΣΧΕΤΙΚΕΣ ΔΡΑΣΕΙΣ</p>
        <h2 className="mt-5 font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.08] tracking-[-0.01em] text-charcoal">
          Δες τι έρχεται στη συνέχεια
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {relatedEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
