'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
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
      className="flex w-[min(360px,calc(100vw-3rem))] shrink-0 flex-col gap-3 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)] transition hover:shadow-[0_2px_8px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
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

const SCROLL_SPEED = 60 // px/s

function ReviewsTrack() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)
  const dragStartXRef = useRef(0)
  const scrollStartRef = useRef(0)

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => { isPausedRef.current = false }, 1500)
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lastTime = 0

    function tick(time: number) {
      if (lastTime === 0) lastTime = time
      const dt = Math.min(time - lastTime, 50)
      lastTime = time

      if (!isPausedRef.current && !isDraggingRef.current) {
        const el = wrapperRef.current
        if (el) {
          const half = el.scrollWidth / 2
          el.scrollLeft += SCROLL_SPEED * dt / 1000
          if (el.scrollLeft >= half) {
            el.scrollLeft -= half
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    function onMouseDown(e: MouseEvent) {
      isDraggingRef.current = true
      dragStartXRef.current = e.pageX
      scrollStartRef.current = wrapper!.scrollLeft
      wrapper!.style.cursor = 'grabbing'
      wrapper!.style.userSelect = 'none'
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
    function onMouseMove(e: MouseEvent) {
      if (!isDraggingRef.current) return
      wrapper!.scrollLeft = scrollStartRef.current - (e.pageX - dragStartXRef.current)
    }
    function onMouseUp() {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      wrapper!.style.cursor = ''
      wrapper!.style.userSelect = ''
      scheduleResume()
    }
    function onTouchStart() {
      isPausedRef.current = true
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
    function onTouchEnd() { scheduleResume() }
    function onWheel() { isPausedRef.current = true; scheduleResume() }

    wrapper.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    wrapper.addEventListener('touchstart', onTouchStart, { passive: true })
    wrapper.addEventListener('touchend', onTouchEnd, { passive: true })
    wrapper.addEventListener('wheel', onWheel, { passive: true })

    return () => {
      wrapper.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      wrapper.removeEventListener('touchstart', onTouchStart)
      wrapper.removeEventListener('touchend', onTouchEnd)
      wrapper.removeEventListener('wheel', onWheel)
    }
  }, [scheduleResume])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f5f5f0] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f5f5f0] to-transparent" />
      <div
        ref={wrapperRef}
        onMouseEnter={() => { isPausedRef.current = true }}
        onMouseLeave={() => { if (!isDraggingRef.current) { isPausedRef.current = false } }}
        className="flex gap-4 overflow-x-scroll px-6 py-4 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab select-none"
      >
        {[...reviews, ...reviews].map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 bg-[#f5f5f0] py-20">

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#5f6368]">
              Τι λένε οι επισκέπτες μας
            </p>
            <h2 className="mt-2 font-serif text-[clamp(28px,3.5vw,44px)] leading-[1.05] tracking-tight text-[#202124]">
              Αξιολογήσεις Google
            </h2>
          </motion.div>

          <motion.a
            href="https://www.google.com/maps/search/M.E.S.S.+Ioannina"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
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
          </motion.a>

        </div>
      </div>

      <ReviewsTrack />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12 mt-5">
        <a
          href="https://www.google.com/maps/search/M.E.S.S.+Ioannina"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-[#5f6368] transition-colors hover:text-[#4285F4]"
        >
          Όλες οι αξιολογήσεις στο Google
          <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current" strokeWidth="1.5">
            <path d="M6 3h7m0 0v7m0-7L4 13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

    </section>
  )
}
