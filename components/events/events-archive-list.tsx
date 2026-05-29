import Link from 'next/link'
import SectionReveal from '@/components/section-reveal'
import { formatShortDate } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'

type Props = { pastEvents: Event[] }

export default function EventsArchiveList({ pastEvents }: Props) {
  if (pastEvents.length === 0) return null

  const oldestYear = pastEvents.reduce<number>((year, e) => {
    const y = new Date(e.date).getFullYear()
    return y < year ? y : year
  }, new Date().getFullYear()) || 2023

  return (
    <section className="bg-forest px-6 py-24 text-charcoal md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">

        {/* Header row */}
        <SectionReveal>
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-mustard">
              ΑΡΧΕΙΟ · ΠΑΛΑΙΟΤΕΡΕΣ
            </p>
            <p className="font-sans text-[11px] text-charcoal/50">
              {pastEvents.length} δράσεις από {oldestYear}
            </p>
          </div>
        </SectionReveal>

        {/* Event rows */}
        <div>
          {pastEvents.map((event, i) => (
            <Link
              key={event.slug}
              href={`/actions/${event.slug}`}
              className={`grid grid-cols-[1fr_auto] items-center py-4 transition-colors duration-150 hover:bg-charcoal/[0.04] sm:grid-cols-[60px_110px_1fr_28px] ${
                i < pastEvents.length - 1
                  ? 'border-b border-line'
                  : ''
              }`}
            >
              {/* Mobile: title + arrow in top row; date + category in second row */}
              <span className="font-serif text-[16px] text-charcoal sm:col-start-3 sm:row-start-1">
                {event.title}
              </span>
              <span className="text-right font-sans text-[13px] text-charcoal/50 sm:col-start-4 sm:row-start-1">
                →
              </span>
              <span className="mt-1 font-sans text-[11px] text-charcoal/50 sm:col-start-1 sm:row-start-1 sm:mt-0">
                {formatShortDate(event.date)}
              </span>
              <span className="mt-1 font-sans text-[11px] uppercase tracking-[0.14em] text-mustard sm:col-start-2 sm:row-start-1 sm:mt-0">
                {event.categoryLabel.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-8">
          <Link
            href="/actions"
            className="font-sans text-[11px] uppercase tracking-[0.16em] text-mustard transition-opacity hover:opacity-70"
          >
            ΠΕΡΙΣΣΟΤΕΡΑ →
          </Link>
        </div>

      </div>
    </section>
  )
}
