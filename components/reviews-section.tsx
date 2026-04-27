'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { reviews } from '@/lib/reviews-data'
import type { Review } from '@/lib/reviews-data'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const
const PER_PAGE = 3

/* ── Google coloured "G" logo ── */
function GoogleG({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

const AVATAR_PALETTES = [
  'bg-mustard text-charcoal',
  'bg-olive text-bone',
  'bg-terracotta text-bone',
  'bg-espresso text-bone',
  'bg-[#4285F4] text-white',
  'bg-[#34A853] text-white',
  'bg-[#EA4335] text-white',
]

function avatarColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_PALETTES.length
  return AVATAR_PALETTES[idx]
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} αστέρια από 5`}>
      {Array.from({ length: 5 }).map((_, s) => (
        <svg
          key={s}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${s < rating ? 'fill-[#FBBC05]' : 'fill-charcoal/15'}`}
          aria-hidden
        >
          <path d="M10 1l2.47 5.82L18 7.64l-4.35 3.93L15.1 18 10 14.9 4.9 18l1.45-6.43L2 7.64l5.53-.82L10 1z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, cardIndex }: { review: Review; cardIndex: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: EASE_TUPLE, delay: cardIndex * 0.06 }}
      className="flex flex-col gap-5 rounded-2xl bg-cream p-6 ring-1 ring-line/40"
    >
      {/* Top row: stars + time */}
      <div className="flex items-center justify-between">
        <StarRow rating={review.rating} />
        <span className="font-sans text-[11px] text-concrete/60">{review.time}</span>
      </div>

      {/* Quote */}
      <p className="flex-1 font-sans text-[14px] leading-[1.65] text-charcoal/75">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-line/40 pt-4">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-sans text-[11px] font-semibold ${avatarColor(review.name)}`}
        >
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-sans text-[13px] font-medium text-charcoal">{review.name}</p>
          {review.isLocalGuide && (
            <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-olive">Local Guide</p>
          )}
        </div>
        {/* Google G on every card */}
        <div className="ml-auto shrink-0">
          <GoogleG className="h-4 w-4 opacity-60" />
        </div>
      </div>
    </motion.article>
  )
}

function ReviewsCarousel() {
  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % totalPages)
  }, [totalPages])

  useEffect(() => {
    if (paused) return
    const id = setInterval(advance, 6000)
    return () => clearInterval(id)
  }, [paused, advance])

  const visible = reviews.slice(index * PER_PAGE, index * PER_PAGE + PER_PAGE)

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((review, i) => (
            <ReviewCard key={`${index}-${i}`} review={review} cardIndex={i} />
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Σελίδα ${i + 1}`}
              className="flex items-center py-3 px-0.5"
            >
              <span className={`block h-0.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-mustard' : 'w-3 bg-bone/25 hover:bg-bone/45'
              }`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIndex((i) => (i - 1 + totalPages) % totalPages)}
            aria-label="Προηγούμενο"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-bone/60 transition hover:bg-white/15 hover:text-mustard"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % totalPages)}
            aria-label="Επόμενο"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-bone/60 transition hover:bg-white/15 hover:text-mustard"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      )}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 overflow-clip bg-olive-deep px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3"
          >
            <GoogleG className="h-8 w-8" />
            <div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">
                GOOGLE REVIEWS
              </span>
              <h2 className="mt-1 font-serif text-[clamp(28px,3.5vw,48px)] leading-[1.05] tracking-tight text-bone">
                Τι λένε όσοι μας ξέρουν.
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="flex items-center gap-2 rounded-xl bg-white/8 px-4 py-2.5 ring-1 ring-white/10"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 fill-[#FBBC05]" aria-hidden>
              <path d="M10 1l2.47 5.82L18 7.64l-4.35 3.93L15.1 18 10 14.9 4.9 18l1.45-6.43L2 7.64l5.53-.82L10 1z" />
            </svg>
            <span className="font-serif text-2xl leading-none text-bone">4.8</span>
            <span className="font-sans text-xs text-bone/50">/ 5 · 165 κριτικές</span>
          </motion.div>
        </div>

        <ReviewsCarousel />

        <div className="mt-6">
          <a
            href="https://www.google.com/maps/search/M.E.S.S.+Ioannina"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-bone/40 transition-colors hover:text-mustard"
          >
            Όλες οι κριτικές στο Google
            <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current" strokeWidth="1.5">
              <path d="M6 3h7m0 0v7m0-7L4 13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
