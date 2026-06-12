'use client'

import { useEffect, useRef, useState, type RefObject, type ReactNode } from 'react'
import {
  animate,
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { FadeImage } from '@/components/fade-image'
import { useIsMobile } from '@/lib/use-is-mobile'

/**
 * The philosophy → actions seam — one simple, premium cinematic beat.
 *
 * The café ARRIVES as a framed window sitting in the same green philosophy ends
 * on (so the entrance is seamless), then GROWS to full-bleed as you scroll, it
 * holds, and finally the next section ({children}) slides UP and covers it. One
 * idea, real motion at both seams — no text, leaves, iris, bloom or canopy.
 *
 * Robust by construction: the café is one full-screen `object-cover` layer that
 * NEVER changes aspect — the "grow" is a clip-path window expanding over it, so
 * the image always covers and no empty band can ever appear (the bug the old
 * scale-to-cover hit). Progress is read from the pin's live rect (immune to the
 * lazy-load offset bug framer's `useScroll` has), and exactly one layer is
 * GPU-promoted, only while it's animating.
 */
const DESKTOP_PIN_VH = 250 // pinned scroll length of the café beat (desktop)
const MOBILE_PIN_VH = 170 // shorter pin on phones — same reveal, less scroll
// How much the next section overlaps to cover the photo. With PIN_VH 250 the
// café grows over the first ~quarter, holds, then the cover rises (≥100 = ≥1vh
// is required, else the photo unpins before it's covered).
const DESKTOP_COVER_VH = 100
const MOBILE_COVER_VH = 72

/**
 * Progress 0→1 across the pin, from the pin's LIVE position each scroll/resize/
 * layout-shift. We avoid framer's `useScroll`: it caches the target's offset on
 * mount and only re-measures on resize, so a lazy-loaded image above the pin
 * shifts it and leaves progress permanently ahead of reality. getBoundingClient-
 * Rect per scroll tick is always correct; a ResizeObserver on <body> catches the
 * lazy-load shifts. Event-driven → idle at rest.
 */
function usePinProgress(pinRef: RefObject<HTMLDivElement | null>) {
  const progress = useMotionValue(0)
  useEffect(() => {
    const update = () => {
      const el = pinRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const denom = r.height - window.innerHeight
      progress.set(denom > 0 ? Math.min(1, Math.max(0, -r.top / denom)) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [pinRef, progress])
  return progress
}

export default function ExpandCoverReveal({
  src,
  alt,
  background = '#2d5a27',
  children,
}: {
  src: string
  alt: string
  background?: string
  children: ReactNode
}) {
  const pinRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // Phones keep the grow beat but transform-only (see mobile branch below):
  // the desktop clip-path animation re-rasterizes the full-screen layer every
  // frame on iOS, which is exactly the jank class the mobile perf pass removed.
  const isMobile = useIsMobile()
  const p = usePinProgress(pinRef)
  const [pinVh, setPinVh] = useState(MOBILE_PIN_VH)
  const [coverVh, setCoverVh] = useState(MOBILE_COVER_VH)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => {
      setPinVh(mq.matches ? DESKTOP_PIN_VH : MOBILE_PIN_VH)
      setCoverVh(mq.matches ? DESKTOP_COVER_VH : MOBILE_COVER_VH)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // The grow: a centred clip-path window opens to full-bleed over the first
  // ~quarter. The image underneath is always full-screen object-cover, so it
  // covers at every step — only the visible window changes.
  const reveal = useTransform(p, [0, 0.26], [0, 1])
  const insetV = useTransform(reveal, [0, 1], [13, 0]) // vh, top/bottom
  const insetH = useTransform(reveal, [0, 1], [15, 0]) // vw, left/right
  const radius = useTransform(reveal, [0, 1], [20, 0]) // px, rounded frame
  const clip = useMotionTemplate`inset(${insetV}vh ${insetH}vw ${insetV}vh ${insetH}vw round ${radius}px)`
  // A subtle continuous push-in for life; stays ≥1 so the cover stays full.
  const scale = useTransform(p, [0, 1], [1.0, 1.12])
  const imgWillChange = useTransform(p, (v) => (v > 0.001 && v < 0.72 ? 'transform, clip-path' : 'auto'))

  // Mobile grow — transform-only AND time-based. Scroll-scrubbing the grow
  // works in emulators but on real iPhones scroll events reach JS *behind* the
  // compositor's scrolling, so a grow tied to the first ~150px of scroll lags
  // and reads as stuck. Instead: when the framed café fills the screen, play
  // the grow once as a 1s animation (outer window scales up, image counter-
  // scales to stay full-size — pure compositor work, no clip-path re-raster).
  const stickyRef = useRef<HTMLDivElement>(null)
  const mOuter = useMotionValue(0.74)
  const mInner = useTransform(mOuter, (s) => 1 / s)
  const mRadius = useTransform(mOuter, (s) => (s < 0.99 ? '16px' : '0px'))
  const [grown, setGrown] = useState(false)
  useEffect(() => {
    if (!isMobile || grown) return
    const el = stickyRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.55) setGrown(true)
      },
      { threshold: [0.55] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isMobile, grown])
  useEffect(() => {
    if (!grown) return
    const anim = animate(mOuter, 1, { duration: 1.0, ease: [0.22, 1, 0.36, 1] })
    return () => anim.stop()
  }, [grown, mOuter])

  if (reduce) {
    // No pin/scroll — a calm full-bleed café, then the section.
    return (
      <section className="relative" style={{ background }}>
        <div className="relative h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            <FadeImage src={src} alt={alt} fill sizes="100vw" className="object-cover" />
          </div>
        </div>
        {children}
      </section>
    )
  }

  if (isMobile) {
    // svh everywhere: vh-sized pins jump when the iOS URL bar collapses.
    return (
      <section className="relative" style={{ background }}>
        <div ref={pinRef} className="relative" style={{ height: `${pinVh}svh` }}>
          <div ref={stickyRef} className="sticky top-0 z-0 h-[100svh] overflow-hidden">
            <m.div
              className="absolute inset-0 overflow-hidden"
              style={{ scale: mOuter, borderRadius: mRadius }}
            >
              <m.div className="absolute inset-0" style={{ scale: mInner }}>
                <FadeImage src={src} alt={alt} fill sizes="100vw" className="object-cover" />
              </m.div>
            </m.div>
          </div>
        </div>

        <div className="relative z-10" style={{ marginTop: `-${coverVh}svh` }}>
          {children}
        </div>
      </section>
    )
  }

  return (
    <section className="relative" style={{ background }}>
      <div ref={pinRef} className="relative" style={{ height: `${pinVh}vh` }}>
        <div className="sticky top-0 z-0 h-[100svh] overflow-hidden">
          {/* café — full-screen object-cover, revealed through a growing window */}
          <m.div
            className="absolute inset-0"
            style={{ scale, clipPath: clip, WebkitClipPath: clip, willChange: imgWillChange }}
          >
            <FadeImage src={src} alt={alt} fill sizes="100vw" className="object-cover" />
          </m.div>
        </div>
      </div>

      {/* the next section rises up and covers the held photo */}
      <div className="relative z-10" style={{ marginTop: `-${coverVh}vh` }}>
        {children}
      </div>
    </section>
  )
}
