'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { reviews } from '@/lib/reviews-data'
import type { Review } from '@/lib/reviews-data'

const EASE_TUPLE = [0.22, 1, 0.36, 1] as const
const PER_PAGE = 3

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

function avatarColor(name: string) {
  const colors = [
    'bg-mustard/20 text-mustard',
    'bg-bone/20 text-bone',
    'bg-olive-deep/40 text-bone',
  ]
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} viewBox="0 0 12 12" className={`h-2.5 w-2.5 ${s < rating ? 'fill-mustard' : 'fill-bone/20'}`}>
          <path d="M6 0l1.5 3.5L11 4 8.5 6.5l.6 3.5L6 8.4 2.9 10l.6-3.5L1 4l3.5-.5z" />
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
      className="flex flex-col gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm"
    >
      {/* Top row: stars + time */}
      <div className="flex items-center justify-between">
        <StarRow rating={review.rating} />
        <span className="font-sans text-[11px] text-bone/35">{review.time}</span>
      </div>

      {/* Quote */}
      <p className="flex-1 font-sans text-[14px] leading-[1.65] text-bone/80">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-white/8 pt-4">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-[11px] font-medium ${avatarColor(review.name)}`}>
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-sans text-[13px] font-medium text-bone">{review.name}</p>
          {review.isLocalGuide && (
            <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-mustard">Local Guide</p>
          )}
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
        <AnimatePresence mode="wait">
          {visible.map((review, i) => (
            <ReviewCard key={`${index}-${i}`} review={review} cardIndex={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Σελίδα ${i + 1}`}
              className={`h-0.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-mustard' : 'w-3 bg-bone/20 hover:bg-bone/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIndex((i) => (i - 1 + totalPages) % totalPages)}
            aria-label="Προηγούμενο"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-bone/60 transition hover:bg-white/15 hover:text-mustard"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % totalPages)}
            aria-label="Επόμενο"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-bone/60 transition hover:bg-white/15 hover:text-mustard"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 overflow-clip bg-olive px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">
              GOOGLE REVIEWS
            </span>
            <h2 className="mt-3 font-serif text-[clamp(28px,3.5vw,48px)] leading-[1.05] tracking-tight text-bone">
              Τι λένε όσοι μας ξέρουν.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="flex items-center gap-2 rounded-xl bg-white/8 px-4 py-2.5 ring-1 ring-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-mustard" aria-hidden>
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8 1.7 7.2L12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
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
