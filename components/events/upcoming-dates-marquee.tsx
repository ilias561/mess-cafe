import { Fragment } from 'react'
import { formatGreekDate } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'

type Props = { events: Event[] }

// Returns null when empty — absence is the correct empty-state for a decorative strip
export default function UpcomingDatesMarquee({ events }: Props) {
  if (events.length === 0) return null

  return (
    <div className="overflow-hidden bg-charcoal py-3.5" aria-hidden>
      <div className="marquee-track flex whitespace-nowrap">
        {[...events, ...events].map((event, i) => (
          <Fragment key={`${event.slug}-${i}`}>
            <span className="mx-[14px] text-mustard">·</span>
            <span className="font-sans text-[13px] uppercase tracking-[0.22em] text-bone">
              {formatGreekDate(event.date)} · {event.categoryLabel}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
