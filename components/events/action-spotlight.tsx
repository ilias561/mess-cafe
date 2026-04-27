import Image from 'next/image'
import Link from 'next/link'
import PostBody from '@/components/blog/post-body'
import { formatGreekDate } from '@/lib/format-date'
import type { Event } from '@/lib/events/events'

type Props = {
  event: Event
}

export default function ActionSpotlight({ event }: Props) {
  return (
    <section
      className="border-t border-line/50 bg-bone-warm/40 px-6 py-16 md:px-12 md:py-24"
      aria-labelledby={`action-spotlight-${event.slug}`}
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-12 md:gap-14 md:items-start">
        <div className="md:col-span-5">
          <Link
            href={`/actions/${event.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] border border-line/50 bg-bone">
              <Image
                src={event.coverImage}
                alt={event.coverAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 42vw"
                style={{ objectPosition: event.coverObjectPosition ?? 'center' }}
              />
            </div>
          </Link>
        </div>

        <div className="md:col-span-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-terracotta" aria-hidden />
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
              {formatGreekDate(event.date)} · #KEEPRISING
            </p>
          </div>

          <h2
            id={`action-spotlight-${event.slug}`}
            className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.06] tracking-tight text-charcoal"
          >
            {event.title}
          </h2>

          <p className="mt-4 max-w-[50ch] font-sans text-[16px] leading-relaxed text-concrete">
            {event.description}
          </p>

          <div className="mt-8 max-w-[52ch] border-l-2 border-mustard/50 pl-5">
            <PostBody markdown={event.body} variant="inline" />
          </div>
        </div>
      </div>
    </section>
  )
}
