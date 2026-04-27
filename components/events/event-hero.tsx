import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { formatGreekDate } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'

export default function EventHero({ event }: { event: Event }) {
  return (
    <section className="bg-bone px-6 pb-16 pt-8 md:px-12 md:pt-12">
      <div className="mx-auto max-w-[1400px]">

        <Link
          href="/actions"
          className="mb-10 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.16em] text-olive transition-colors duration-150 hover:text-charcoal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Δράσεις
        </Link>

        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-start md:gap-16">

          {/* Full photo — natural aspect ratio, no crop */}
          <div className="overflow-hidden rounded-[2px] border border-line/30">
            <Image
              src={event.coverImage}
              alt={event.coverAlt}
              width={900}
              height={1100}
              className="h-auto w-full"
              priority
              style={{ objectPosition: event.coverObjectPosition ?? 'center' }}
            />
          </div>

          {/* Info panel */}
          <div className="flex flex-col">
            <div className="inline-flex w-fit rounded-full border border-line/50 bg-bone-warm px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-olive">
              {event.categoryLabel}
            </div>

            <h1 className="mt-5 font-serif text-[clamp(30px,4vw,56px)] leading-[1.03] tracking-[-0.01em] text-charcoal">
              {event.title}
            </h1>

            <p className="mt-5 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-concrete">
              {event.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line/40 pt-8">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-olive">Ημερομηνία</p>
                <p className="mt-2 font-serif text-[22px] leading-tight text-charcoal">
                  {formatGreekDate(event.date)}
                </p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-olive">Τοποθεσία</p>
                <p className="mt-2 font-sans text-[15px] leading-snug text-charcoal">{event.location}</p>
              </div>
              {event.price && (
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-olive">Τιμή</p>
                  <p className="mt-2 font-sans text-[15px] text-charcoal">{event.price}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
