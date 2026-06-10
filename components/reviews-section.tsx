'use client'

import Link from 'next/link'
import DrawHeading from '@/components/draw-heading'
import { Reveal } from '@/components/reveal'
import {
  AnaglyphHeading,
  Eyebrow,
  HairlineRule,
  MicroEyebrow,
  NumberedCaption,
} from '@/components/decor/ornaments'
import { featuredQuote, reviews } from '@/lib/reviews-data'
import type { Review } from '@/lib/reviews-data'

function GoogleLogo({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const AVATAR_COLORS = [
  { bg: '#F28B82', text: '#fff' },
  { bg: '#FBBC04', text: '#3c4043' },
  { bg: '#34A853', text: '#fff' },
  { bg: '#4285F4', text: '#fff' },
  { bg: '#A142F4', text: '#fff' },
  { bg: '#FF6D00', text: '#fff' },
  { bg: '#00BCD4', text: '#fff' },
]

function avatarStyle(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

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
  const av = avatarStyle(review.name)
  return (
    <a
      href="https://www.google.com/maps/search/M.E.S.S.+Ioannina"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Κριτική από ${review.name}`}
      className="ui-card-elevated flex h-full w-[min(300px,78vw)] shrink-0 flex-col gap-2.5 rounded-[2px] bg-white p-4 transition-shadow duration-150 hover:shadow-[0_12px_32px_rgba(14,34,8,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard md:w-[min(320px,80vw)] md:gap-3 md:p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[13px] font-medium"
            style={{ backgroundColor: av.bg, color: av.text }}
          >
            {initials(review.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-sans text-[14px] font-medium text-[#202124]">{review.name}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {review.isLocalGuide && (
                <span className="font-sans text-[11px] text-[#5f6368]">Local Guide ·</span>
              )}
              <span className="font-sans text-[11px] text-[#5f6368]">{review.time}</span>
            </div>
          </div>
        </div>
        <GoogleLogo className="mt-0.5 h-5 w-5 shrink-0" />
      </div>

      <Stars rating={review.rating} />

      <p className="line-clamp-5 font-sans text-[13px] leading-[1.65] text-[#3c4043]">
        {review.text}
      </p>
    </a>
  )
}

function ReviewRow({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}>
        {[...items, ...items].map((review, i) => (
          <div key={i} className="mx-2 flex shrink-0">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewsTrack() {
  return (
    <div className="relative py-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-forest to-transparent md:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-forest to-transparent md:w-24"
      />
      <ReviewRow items={reviews} />
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="relative bg-forest px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5 md:sticky md:top-28">
            <Eyebrow tone="light">Τι λένε όσοι μας γνώρισαν</Eyebrow>
            <DrawHeading className="mt-4">
              <AnaglyphHeading as="h2" tone="dark">
                Αξιολογήσεις από την κοινότητά μας
              </AnaglyphHeading>
            </DrawHeading>

            <a
              href="https://www.google.com/maps/search/M.E.S.S.+Ioannina"
              target="_blank"
              rel="noopener noreferrer"
              className="ui-card-elevated mt-8 inline-flex min-h-[44px] items-center gap-3 rounded-[2px] bg-white/95 px-4 py-2.5 ring-1 ring-black/[0.04] transition hover:shadow-[0_12px_32px_rgba(14,34,8,0.15)]"
            >
              <GoogleLogo className="h-5 w-5" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-serif text-[20px] leading-none text-[#202124]">4.7</span>
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-[#FBBC04]" aria-hidden>
                    <path d="M10 1l2.47 5.82L18 7.64l-4.35 3.93L15.1 18 10 14.9 4.9 18l1.45-6.43L2 7.64l5.53-.82L10 1z" />
                  </svg>
                </div>
                <p className="font-sans text-[10px] text-[#5f6368]">195 αξιολογήσεις</p>
              </div>
            </a>
          </div>

          <div className="md:col-span-7">
            <NumberedCaption index="14" label="Από την κοινότητα" className="mt-0" />
            <AnaglyphHeading
              as="h3"
              tone="dark"
              className="mt-6 font-serif italic text-[clamp(26px,3.2vw,44px)] leading-[1.25] tracking-[-0.005em]"
            >
              «{featuredQuote.text}»
            </AnaglyphHeading>
            <div className="mt-8 flex items-center gap-3">
              <span aria-hidden className="block h-px w-8 bg-mustard/60" />
              <MicroEyebrow className="text-charcoal/55">
                {featuredQuote.name} · {featuredQuote.time}
              </MicroEyebrow>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-12">
        <ReviewsTrack />
      </div>

      <div className="mx-auto mt-4 max-w-[1400px]">
        <Reveal>
          <div className="flex items-center gap-5">
            <HairlineRule origin="left" className="w-12" />
            <Link
              href="/reviews"
              className="ui-link inline-flex min-h-[44px] items-center font-sans text-[12px] uppercase tracking-[0.16em] text-charcoal/70 hover:text-mustard md:min-h-0"
            >
              Όλες οι αξιολογήσεις →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
