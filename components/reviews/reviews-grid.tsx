'use client'

import type { Review } from '@/lib/reviews-data'
import { Reveal } from '@/components/reveal'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} αστέρια από 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < rating ? 'fill-[#FBBC04]' : 'fill-[#e0e0e0]'}`} aria-hidden>
          <path d="M10 1l2.47 5.82L18 7.64l-4.35 3.93L15.1 18 10 14.9 4.9 18l1.45-6.43L2 7.64l5.53-.82L10 1z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.charAt(0).toUpperCase()
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mustard/20 font-sans text-sm font-medium text-charcoal">
          {initial}
        </span>
        <div>
          <p className="font-sans text-[14px] font-medium text-[#202124]">{review.name}</p>
          <p className="font-sans text-[11px] text-[#5f6368]">{review.time}</p>
        </div>
      </div>
      <Stars rating={review.rating} />
      <p className="font-sans text-[13px] leading-[1.65] text-[#3c4043]">{review.text}</p>
    </article>
  )
}

export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  return (
    <section className="px-6 pb-24 md:px-12 md:pb-32">
      <Reveal asGroup className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Reveal.Item key={`${review.name}-${review.time}`}>
            <ReviewCard review={review} />
          </Reveal.Item>
        ))}
      </Reveal>
    </section>
  )
}
