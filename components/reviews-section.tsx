'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import DrawHeading from '@/components/draw-heading'
import { Reveal } from '@/components/reveal'
import { VIEWPORT_ONCE, blurIn, slowReveal } from '@/lib/motion'
import { reviews } from '@/lib/reviews-data'
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
      className="flex h-full w-[min(320px,80vw)] shrink-0 flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
    >
      {/* Header: avatar + name + google logo */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[13px] font-medium"
            style={{ backgroundColor: av.bg, color: av.text }}
          >
            {initials(review.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-sans text-[14px] font-medium text-[#202124]">{review.name}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {review.isLocalGuide && (
                <span className="font-sans text-[11px] text-[#5f6368]">Local Guide ·</span>
              )}
              <span className="font-sans text-[11px] text-[#5f6368]">{review.time}</span>
            </div>
          </div>
        </div>
        <GoogleLogo className="h-5 w-5 shrink-0 mt-0.5" />
      </div>

      {/* Stars */}
      <Stars rating={review.rating} />

      {/* Review text */}
      <p className="font-sans text-[13px] leading-[1.65] text-[#3c4043] line-clamp-5">
        {review.text}
      </p>
    </a>
  )
}

function ReviewRow({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      {/* Duplicated set + translateX(-50%) keyframe = seamless loop (see globals.css) */}
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bone to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bone to-transparent md:w-24" />
      <ReviewRow items={reviews} />
    </div>
  )
}

export default function ReviewsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="reviews" className="scroll-mt-28 bg-bone py-16 md:py-24">

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">

          <div>
            {reduce ? (
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">Τι λένε όσοι μας γνώρισαν</p>
            ) : (
              <motion.p
                className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive"
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                variants={blurIn}
                transition={slowReveal}
              >
                Τι λένε όσοι μας γνώρισαν
              </motion.p>
            )}
            <DrawHeading className="mt-2">
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-tight text-charcoal">
                Αξιολογήσεις από την κοινότητά μας
              </h2>
            </DrawHeading>
          </div>

          <a
            href="https://www.google.com/maps/search/M.E.S.S.+Ioannina"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.04]"
          >
            <GoogleLogo className="h-6 w-6" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-serif text-[22px] leading-none text-[#202124]">4.8</span>
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-[#FBBC04]" aria-hidden>
                  <path d="M10 1l2.47 5.82L18 7.64l-4.35 3.93L15.1 18 10 14.9 4.9 18l1.45-6.43L2 7.64l5.53-.82L10 1z" />
                </svg>
              </div>
              <p className="font-sans text-[11px] text-[#5f6368]">165 αξιολογήσεις</p>
            </div>
          </a>

        </Reveal>
      </div>

      <ReviewsTrack />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12 mt-5">
        <Reveal>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-concrete transition-colors hover:text-charcoal"
          >
            Όλες οι αξιολογήσεις
            <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current" strokeWidth="1.5" aria-hidden>
              <path d="M6 3h7m0 0v7m0-7L4 13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>

    </section>
  )
}
