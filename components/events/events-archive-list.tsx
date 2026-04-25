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
    <section className="bg-olive-deep px-6 py-20 text-bone md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">

        {/* Header row */}
        <SectionReveal>
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">
              ΑΡΧΕΙΟ · ΠΑΛΑΙΟΤΕΡΕΣ
            </p>
            <p className="font-sans text-[11px] text-bone/50">
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
              className={`grid grid-cols-[60px_110px_1fr_28px] items-center py-3 transition-colors duration-150 hover:bg-bone/[0.04] ${
                i < pastEvents.length - 1
                  ? 'border-b border-bone/[0.13]'
                  : ''
              }`}
            >
              <span className="font-sans text-[13px] text-bone/50">
                {formatShortDate(event.date)}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-mustard">
                {event.categoryLabel.toUpperCase()}
              </span>
              <span className="font-serif text-[16px] text-bone">
                {event.title}
              </span>
              <span className="text-right font-sans text-[13px] text-bone/50">
                →
              </span>
            </Link>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-8">
          <a
            href="#"
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard transition-opacity hover:opacity-70"
          >
            ΠΕΡΙΣΣΟΤΕΡΑ →
          </a>
        </div>

      </div>
    </section>
  )
}
