'use client'

import { useEffect, useRef, useState, type RefObject, type ReactNode } from 'react'
import {
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
 *
 * sizes="100vw" everywhere is a DELIBERATE exception to mobile rule #6 (cap
 * phones at ≤w768): this photo is painted full-screen on 3× displays
 * (~1170 device px), and the 65vw cap made the page's centerpiece visibly
 * pixelated on real iPhones. w1200 AVIF is ~107KB — worth it here only.
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
  // the grow once (outer window scales up, image counter-scales to stay
  // full-size — pure compositor work, no clip-path re-raster).
  //
  // The animation runs via WAAPI (element.animate), NOT framer's animate():
  // framer drives values from a main-thread rAF loop, which starves exactly
  // when iOS is mid-scroll — WAAPI transform animations run on the compositor
  // and survive a busy main thread. Keyframes pair outer/inner as exact
  // reciprocals so the image never visibly changes size while the window grows.
  const stickyRef = useRef<HTMLDivElement>(null)
  const growOuterRef = useRef<HTMLDivElement>(null)
  const growInnerRef = useRef<HTMLDivElement>(null)
  const grownRef = useRef(false)

  useEffect(() => {
    if (!isMobile) return
    const sticky = stickyRef.current
    const outer = growOuterRef.current
    const inner = growInnerRef.current
    if (!sticky || !outer || !inner) return

    // Rotation round-trip (portrait → landscape ≥768px → portrait) remounts
    // the branch with the framed initial styles — if the grow already played,
    // pin the grown state instead of replaying or staying stuck at 0.74.
    if (grownRef.current) {
      outer.style.transform = 'scale(1)'
      inner.style.transform = 'scale(1)'
      outer.style.borderRadius = '0px'
      return
    }

    const grow = () => {
      if (grownRef.current) return
      grownRef.current = true
      cleanup()
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      const steps = 21
      const outerFrames: Keyframe[] = []
      const innerFrames: Keyframe[] = []
      for (let i = 0; i < steps; i++) {
        const s = 0.74 + 0.26 * easeOut(i / (steps - 1))
        outerFrames.push({ transform: `scale(${s})` })
        innerFrames.push({ transform: `scale(${1 / s})` })
      }
      const opts: KeyframeAnimationOptions = { duration: 950, easing: 'linear', fill: 'forwards' }
      // Pin the final transform inline BEFORE starting (fill:'forwards' keeps
      // the last frame anyway, but inline styles survive even a cancelled
      // fill). The 16px radius drops as a single style flip when the grow
      // lands — never animated (per-frame border-radius re-rasters on iOS).
      outer.style.transform = 'scale(1)'
      inner.style.transform = 'scale(1)'
      if (typeof outer.animate === 'function') {
        const anim = outer.animate(outerFrames, opts)
        inner.animate(innerFrames, opts)
        anim.finished
          .then(() => {
            outer.style.borderRadius = '0px'
          })
          .catch(() => {})
      } else {
        outer.style.borderRadius = '0px'
      }
    }

    // Trigger = "the framed café has reached its pinned, filling-the-screen
    // moment". Three independent paths, each self-removing, because WebKit
    // has now eaten two single-trigger designs (ratio-threshold IO, then
    // band IO + framer scroll fallback — both stuck at scale 0.74 in CI):
    //  1. immediate geometry check (handles landing mid-pin / reload)
    //  2. plain scroll listener reading the pin rect (no framer indirection)
    //  3. viewport-middle band IntersectionObserver
    const pin = sticky.parentElement as HTMLElement
    const shouldGrow = () => {
      const r = pin.getBoundingClientRect()
      // sticky engages when the pin top reaches the viewport top; fire just
      // before that so the grow is playing as the frame settles into place
      return r.top < window.innerHeight * 0.18 && r.bottom > 0
    }
    const onScroll = () => {
      if (shouldGrow()) grow()
    }
    let io: IntersectionObserver | null = null
    const cleanup = () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
      io = null
    }
    if (shouldGrow()) {
      grow()
      return cleanup
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) grow()
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    io.observe(sticky)
    return cleanup
  }, [isMobile])

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
    // Pin/cover offsets in svh (stable when the iOS URL bar collapses), but the
    // photo itself is 100lvh: at scale 1 it must cover the FULL screen even with
    // the bar collapsed — 100svh leaves a viewport-chrome-sized band of green.
    return (
      <section className="relative" style={{ background }}>
        <div ref={pinRef} className="relative" style={{ height: `${pinVh}svh` }}>
          <div ref={stickyRef} className="sticky top-0 z-0 h-[100lvh] overflow-hidden">
            <div
              ref={growOuterRef}
              className="absolute inset-0 overflow-hidden"
              style={{ transform: 'scale(0.74)', borderRadius: '16px' }}
            >
              <div ref={growInnerRef} className="absolute inset-0" style={{ transform: 'scale(1.3514)' }}>
                <FadeImage src={src} alt={alt} fill sizes="100vw" className="object-cover" />
              </div>
            </div>
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
