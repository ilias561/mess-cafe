import { formatShortDate } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'

type Props = { events: Event[] }

// auto-populates when events exist in lib/events/events; intentionally hidden when empty
export default function UpcomingDatesMarquee({ events }: Props) {
  if (events.length === 0) return null

  const items = events.map((e) => {
    const catLabel = e.categoryLabel.toUpperCase()
    const titleLabel = e.title.toUpperCase()
    const label = catLabel.length <= titleLabel.length ? catLabel : titleLabel
    return `${formatShortDate(e.date)} · ${label}`
  })

  return (
    <div className="overflow-hidden bg-charcoal py-3.5" aria-hidden>
      <div className="marquee-track flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-sans text-[13px] uppercase tracking-[0.22em] text-bone">
            {item}
            <span className="mx-8 text-bone/30">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
