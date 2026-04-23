import { formatGreekDate, formatGreekTime } from '@/lib/format-date'
import ParallaxImage from '@/components/parallax-image'
import type { Event } from '@/lib/events/events'

type EventHeroProps = {
  event: Event
}

export default function EventHero({ event }: EventHeroProps) {
  return (
    <section>
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <ParallaxImage
          src={event.coverImage}
          alt={event.coverAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-12 md:pb-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="inline-flex rounded-full border border-bone/30 bg-bone/10 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.18em] text-bone">
              {event.categoryLabel}
            </div>
            <h1 className="mt-5 max-w-[22ch] font-serif text-[clamp(36px,6vw,78px)] leading-[1.02] tracking-[-0.02em] text-bone">
              {event.title}
            </h1>
            <p className="mt-5 max-w-[62ch] font-sans text-[16px] leading-[1.7] text-bone/75 md:text-[18px]">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-bone px-6 py-14 md:px-12">
        <div className="mx-auto max-w-[1400px] border border-line/30 bg-bone-warm p-8">
          <div className="grid gap-6 md:grid-cols-5">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">Ημερομηνία</p>
              <p className="mt-3 font-serif text-[28px] leading-[1.1] text-charcoal">{formatGreekDate(event.date)}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">Ώρα</p>
              <p className="mt-3 font-sans text-[17px] text-charcoal">{formatGreekTime(event.date)}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">Τοποθεσία</p>
              <p className="mt-3 font-sans text-[17px] text-charcoal">{event.location}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">Τιμή</p>
              <p className="mt-3 font-sans text-[17px] text-charcoal">{event.price || 'Δωρεάν'}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">Χωρητικότητα</p>
              <p className="mt-3 font-sans text-[17px] text-charcoal">{event.capacity ? `${event.capacity} άτομα` : 'Χωρίς όριο'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
