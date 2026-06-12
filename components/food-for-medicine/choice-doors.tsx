'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { scrollToId } from '@/lib/lenis'
import { videoSrc } from '@/lib/media'

const BG = 'rgb(5,46,31)' // matches the clip's own dark-green backdrop
// gentle, premium easing for the copy reveal
const SMOOTH = [0.22, 1, 0.36, 1] as const

type Option = {
  href: '#menu' | '#tips'
  target: 'menu' | 'tips'
  label: string
  primary?: boolean
}

const OPTIONS: Option[] = [
  { href: '#menu', target: 'menu', label: 'Δες το Μενού', primary: true },
  { href: '#tips', target: 'tips', label: 'Tips για πιο θρεπτικά πιάτα' },
]

/**
 * Menu entry hero. A top-down dish clip plays once (at 0.75× for a calmer feel),
 * then the copy + the two options (Menu / Tips) reveal with a soft blur-up.
 *
 * Layout is responsive:
 *  · Desktop — full-bleed `contain` clip, copy overlaid low in the frame.
 *  · Mobile — clip pinned to the top, cropped ~10% on each side (aspect 16/15
 *    `cover`), with the copy stacked below it on clean green.
 *
 * Reveal is driven by the video's `ended` event with fallbacks so the chooser
 * always appears (reduced-motion / blocked autoplay show it at once; a timeout
 * covers an `ended` that never fires). Playback waits for the site loader so the
 * clip isn't hidden behind the splash.
 */
export default function ChoiceDoors() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoRevealed, setVideoRevealed] = useState(false)
  // Reduced motion skips the clip-driven reveal entirely (derived, not set in
  // an effect, so there is no extra render pass).
  const revealed = videoRevealed || reduce === true

  useEffect(() => {
    if (reduce) return
    const video = videoRef.current

    let started = false
    let revealTimer = 0
    const start = () => {
      if (started) return
      started = true
      if (!video) {
        setVideoRevealed(true)
        return
      }
      video.playbackRate = 0.75 // 25% slower
      void video.play().catch(() => setVideoRevealed(true))
      // reveal the copy a beat into playback, so it appears *while* the clip
      // plays instead of after it ends (no dead space)
      revealTimer = window.setTimeout(() => setVideoRevealed(true), 800)
    }

    const w = window as Window & { __messLoaderComplete?: boolean }
    let guard = 0
    if (w.__messLoaderComplete) {
      // queue the kick-off so the effect body itself stays side-effect-light
      guard = window.setTimeout(start, 0)
    } else {
      window.addEventListener('mess:loader-complete', start, { once: true })
      guard = window.setTimeout(start, 3000)
    }

    return () => {
      window.removeEventListener('mess:loader-complete', start)
      if (guard) window.clearTimeout(guard)
      if (revealTimer) window.clearTimeout(revealTimer)
    }
  }, [reduce])

  // soft blur-up reveal, staggered
  const reveal = (delay: number) => ({
    initial: false as const,
    animate: revealed
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 22, filter: 'blur(8px)' },
    transition: { duration: 1.05, ease: SMOOTH, delay: revealed ? delay : 0 },
  })

  return (
    <section
      aria-label="Φαγητό ως Φάρμακο — επιλογές"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden md:block md:h-[100svh] md:min-h-[560px]"
      style={{ backgroundColor: BG }}
    >
      {/* soft radial lift behind the plate (desktop) — depth without muddiness */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        style={{
          background:
            'radial-gradient(ellipse 58% 56% at 50% 42%, rgba(36,92,52,0.5), rgba(5,46,31,0) 70%)',
        }}
      />

      {/* clip — mobile: top block at the clip's own 1444×1080 aspect, contained
          (nothing cropped) and pushed below the fixed h-16 navbar, which
          otherwise overlaps the top of the plate; desktop: full-bleed, padded */}
      <div className="relative z-0 mt-16 aspect-[1444/1080] w-full overflow-hidden md:absolute md:inset-0 md:mt-0 md:aspect-auto md:pt-[84px] md:pb-7">
        <video
          ref={videoRef}
          className="h-full w-full object-contain object-center"
          poster={videoSrc('/videos/menu-hero-poster.jpg')}
          src={videoSrc('/videos/menu-hero.mp4')}
          muted
          playsInline
          preload="auto"
          onEnded={() => setVideoRevealed(true)}
          onError={() => setVideoRevealed(true)}
        />
        {/* soft fade where the clip meets the copy (mobile only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:hidden"
          style={{ background: `linear-gradient(to bottom, rgba(5,46,31,0), ${BG})` }}
        />
      </div>

      {/* legibility scrim (desktop only) — weighted to the bottom where copy sits */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            'linear-gradient(to top, rgba(5,46,31,0.96) 0%, rgba(5,46,31,0.82) 16%, rgba(5,46,31,0.35) 38%, rgba(5,46,31,0) 58%)',
        }}
      />

      {/* editorial side rails — fill the gutters either side of the plate on wide
          screens; width is the exact gutter (0 when there is none) */}
      {([
        { side: 'left' as const, label: 'ΙΩΑΝΝΙΝΑ · ΗΠΕΙΡΟΣ' },
        { side: 'right' as const, label: '#KEEPRISING · EST. 2025' },
      ]).map(({ side, label }) => (
        <div
          key={side}
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 z-[2] hidden items-center justify-center overflow-hidden md:flex ${
            side === 'left' ? 'left-0' : 'right-0'
          }`}
          style={{ width: 'max(0px, calc((100vw - (100svh * 1.3333)) / 2))' }}
        >
          <div className="flex flex-col items-center gap-6">
            <span className="block h-20 w-px bg-gradient-to-b from-transparent to-mustard/40" />
            <span className="rotate-180 font-sans text-[10px] uppercase tracking-[0.34em] text-mustard/65 [writing-mode:vertical-rl]">
              {label}
            </span>
            <span className="block h-20 w-px bg-gradient-to-t from-transparent to-mustard/40" />
          </div>
        </div>
      ))}

      {/* copy + options — mobile: stacked below the clip; desktop: overlaid low */}
      <div className="relative z-10 px-6 pb-12 pt-7 text-center md:absolute md:inset-0 md:flex md:h-full md:flex-col md:items-center md:justify-end md:px-12 md:pb-[9vh] md:pt-0">
        <m.p
          {...reveal(0.0)}
          className="hero-text-shadow font-sans text-[11px] uppercase tracking-[0.2em] text-mustard/85"
        >
          M.E.S.S. · Ο κατάλογος μας
        </m.p>

        <m.h1
          {...reveal(0.12)}
          className="hero-text-shadow-display mt-3 font-serif text-[clamp(26px,5.5vw,64px)] leading-[1.02] tracking-tight text-balance text-white"
        >
          Φαγητό ως <span className="italic text-mustard">Φάρμακο</span>
        </m.h1>

        <m.p
          {...reveal(0.22)}
          className="hero-text-shadow mx-auto mt-4 max-w-[560px] font-sans text-[14px] leading-relaxed text-white/85 md:text-[16px]"
        >
          Διάλεξε διαδρομή — το πλήρες μενού μας ή τα tips μας για πιο θρεπτικά πιάτα.
        </m.p>

        <m.div
          {...reveal(0.34)}
          className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
        >
          {OPTIONS.map((opt) => (
            <a
              key={opt.target}
              href={opt.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(opt.target)
              }}
              tabIndex={revealed ? undefined : -1}
              className={
                opt.primary
                  ? 'ui-focus-ring inline-flex min-h-[48px] items-center justify-center rounded-full bg-mustard px-8 py-3 font-sans text-sm font-medium text-ink-dark transition-colors duration-200 hover:bg-amber'
                  : 'ui-focus-ring inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/40 bg-white/5 px-8 py-3 font-sans text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:border-mustard hover:text-mustard'
              }
            >
              {opt.label} →
            </a>
          ))}
        </m.div>
      </div>
    </section>
  )
}
