import Image from 'next/image'
import Link from 'next/link'
import { formatGreekDate, formatGreekTime } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'

type EventHeroProps = {
  event: Event
}

export default function EventHero({ event }: EventHeroProps) {
  return (
    <section className="px-6 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
          <Link href="/actions" className="transition-colors duration-300 hover:text-charcoal">
            Δράσεις
          </Link>{' '}
          / {event.categoryLabel}
        </p>

        <div className="mt-7 inline-flex rounded-full border border-line/60 px-4 py-1 font-sans text-[11px] uppercase tracking-[0.18em] text-olive">
          {event.categoryLabel}
        </div>
        <h1 className="mt-7 max-w-[18ch] font-serif text-[clamp(42px,6vw,84px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
          {event.title}
        </h1>
        <p className="mt-7 max-w-[62ch] font-sans text-[18px] leading-[1.7] text-concrete md:text-[20px]">{event.description}</p>

        <div className="mt-10 border border-line/30 bg-bone-warm p-8">
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

        <div className="mx-auto mt-12 max-w-[1200px]">
          <div className="aspect-[16/9] overflow-hidden rounded-[2px] bg-bone-warm">
            <Image src={event.coverImage} alt={event.coverAlt} width={1800} height={1000} priority className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
