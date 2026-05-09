'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import { LOADING_DURATION_MS } from '@/lib/timing'
import { frameSrc, videoSrc } from '@/lib/media'

/* ── Botanical corner decoration (desktop hero) ── */
function BotanicalCorner() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem: lower-left to upper-right */}
      <path
        d="M18 162 C32 138 52 112 72 90 C92 68 118 46 158 20"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55"
      />
      {/* Branch stem */}
      <path
        d="M28 142 C40 126 54 116 66 102"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.38"
      />
      {/* Large leaf — lower (points outward) */}
      <path
        d="M66 102 C48 84 22 76 6 58 C20 65 42 72 62 90 Z"
        fill="currentColor" opacity="0.52"
      />
      <path d="M66 102 C48 86 30 78 12 66" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.26"/>
      {/* Large leaf — upper (points outward) */}
      <path
        d="M118 46 C124 24 146 10 168 6 C154 20 136 30 120 48 Z"
        fill="currentColor" opacity="0.56"
      />
      <path d="M118 46 C132 28 148 16 165 8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.26"/>
      {/* Medium leaf — center-lower */}
      <path
        d="M86 70 C72 52 54 42 36 40 C50 46 68 56 84 72 Z"
        fill="currentColor" opacity="0.44"
      />
      {/* Medium leaf — center-upper */}
      <path
        d="M140 32 C148 16 162 8 174 4 C164 16 152 22 138 34 Z"
        fill="currentColor" opacity="0.44"
      />
      {/* Small leaf — low edge */}
      <path
        d="M46 120 C30 112 14 96 10 78 C22 88 34 102 48 116 Z"
        fill="currentColor" opacity="0.36"
      />
      {/* Tiny accent near tip */}
      <path
        d="M150 26 C156 14 166 6 176 2 C168 12 158 18 148 28 Z"
        fill="currentColor" opacity="0.40"
      />
      {/* Berry cluster at stem tip */}
      <circle cx="158" cy="20" r="2.5" fill="currentColor" opacity="0.45"/>
      <circle cx="150" cy="14" r="1.8" fill="currentColor" opacity="0.38"/>
      <circle cx="164" cy="14" r="1.5" fill="currentColor" opacity="0.32"/>
      <circle cx="168" cy="22" r="1.2" fill="currentColor" opacity="0.28"/>
      {/* Accent dots */}
      <circle cx="90" cy="68" r="1.5" fill="currentColor" opacity="0.28"/>
      <circle cx="68" cy="100" r="1.2" fill="currentColor" opacity="0.25"/>
    </svg>
  )
}

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null)
  const phase1Ref     = useRef<HTMLDivElement>(null)
  const phase2Ref     = useRef<HTMLDivElement>(null)
  const scrollIndRef  = useRef<HTMLDivElement>(null)
  const rafRef        = useRef<number>(0)

  const [loaderReady, setLoaderReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onDone = () => setLoaderReady(true)
    window.addEventListener('mess:loader-complete', onDone)
    const win = window as Window & { __messLoaderComplete?: boolean }
    if (win.__messLoaderComplete) setLoaderReady(true)
    const t = window.setTimeout(() => setLoaderReady(true), LOADING_DURATION_MS)
    return () => { window.removeEventListener('mess:loader-complete', onDone); window.clearTimeout(t) }
  }, [])

  useEffect(() => {
    // Gate playback to loader completion so video never starts behind the curtain.
    if (!loaderReady) return
    const video = mobileVideoRef.current
    if (!video) return

    const tryPlay = () => {
      video.play().catch(() => {
        // iOS Safari can occasionally drop muted flag on first attempt.
        video.muted = true
        video.play().catch(() => {
          // Poster remains visible as acceptable degraded state.
        })
      })
    }

    // Wait for HAVE_FUTURE_DATA to avoid initial playback stalls.
    if (video.readyState >= 3) {
      tryPlay()
    } else {
      const onCanPlay = () => {
        tryPlay()
        video.removeEventListener('canplay', onCanPlay)
      }
      video.addEventListener('canplay', onCanPlay)
      return () => video.removeEventListener('canplay', onCanPlay)
    }
  }, [loaderReady])

  // Mobile text phases remain scroll-driven over ambient autoplay video.
  useEffect(() => {
    if (window.innerWidth >= 768) return

    const section = sectionRef.current
    if (!section) return

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
    const eio   = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const update = () => {
      const rect       = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      const p = clamp(-rect.top / scrollable, 0, 1)

      const el1 = phase1Ref.current
      if (el1) {
        let op1: number
        if      (p < 0.16) op1 = 1
        else if (p < 0.22) op1 = clamp(1 - (p - 0.16) / 0.06, 0, 1)
        else if (p < 0.68) op1 = 0
        else if (p < 0.76) op1 = clamp((p - 0.68) / 0.08, 0, 1)
        else               op1 = 1
        el1.style.opacity       = String(op1)
        el1.style.pointerEvents = op1 < 0.05 ? 'none' : ''
      }

      const el2 = phase2Ref.current
      if (el2) {
        // At rest (no scroll): full hero matches design — copy + CTAs visible; scroll only adds motion later.
        let op2 = 1
        let yIn = 0
        let yUp = 0
        if (p >= 0.65) {
          yUp = -eio(clamp((p - 0.65) / 0.12, 0, 1)) * 90
        }
        el2.style.opacity       = String(clamp(op2, 0, 1))
        el2.style.transform     = `translateY(${(yIn + yUp).toFixed(2)}px)`
        el2.style.pointerEvents = op2 < 0.05 ? 'none' : ''
      }

      const si = scrollIndRef.current
      if (si) si.style.opacity = String(clamp(1 - p / 0.12, 0, 1))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const heroWords = 'A quiet kind of chaos.'.split(' ')

  return (
    <>

    {/* ── DESKTOP hero: text left · botanical video right ── */}
    <section
      id="hero"
      className="hidden md:flex min-h-screen bg-bone items-center overflow-hidden"
    >
      {/* ── LEFT: text column ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={loaderReady ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex w-[38%] shrink-0 flex-col justify-center px-12 lg:px-16 xl:px-20 py-28"
      >
        <p className="font-sans text-[11px] tracking-[0.2em] text-charcoal/40 uppercase">
          SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
        </p>

        <h1 className="hero-headline mt-4 font-serif tracking-tight text-balance text-charcoal">
          {heroWords.map((word, i) => (
            <Fragment key={`d-${word}-${i}`}>
              <span className="inline-block overflow-hidden align-baseline">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={loaderReady ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.85, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
              {i < heroWords.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaderReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.75, ease: EASE }}
          className="mt-8 max-w-[420px]"
        >
          <p className="font-sans text-[16px] leading-relaxed text-charcoal/70">
            {'Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.'}
          </p>
          <p className="mt-3 font-sans text-[14px] leading-loose text-charcoal/55">
            {'Το M.E.S.S. δεν είναι ένα καφέ. Είναι μια ιδέα περί ενότητας, δημιουργικότητας και ευεξίας — αρμονικά δεμένα στον ίδιο χώρο.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={loaderReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.65, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-5"
        >
          <Link
            href="/menu"
            className="inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
          >
            {'Δες το menu'}
          </Link>
          <Link
            href="/#map"
            className="relative inline-block font-sans text-sm font-medium text-charcoal"
          >
            <span className="absolute bottom-0 left-0 h-px w-full bg-mustard" />
            {'Βρες μας'}
          </Link>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: botanical-framed video ── */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={loaderReady ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
        className="relative flex-1 self-stretch flex items-center justify-center py-16 pr-10 lg:pr-14"
      >
        {/* Video frame */}
        <div className="relative w-full h-full max-h-[85vh] overflow-hidden rounded-[2px] border border-charcoal/10">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={videoSrc('/videos/main-page-animation.mp4')}
            poster={videoSrc('/videos/hero-animation-poster.jpg')}
            className="h-full w-full object-cover"
            aria-hidden
          />
        </div>

        {/* ── Botanical corner plants ── */}
        {/* top-left */}
        <div className="pointer-events-none absolute top-0 left-0 text-olive" aria-hidden>
          <BotanicalCorner />
        </div>
        {/* top-right (mirror X) */}
        <div className="pointer-events-none absolute top-0 right-0 text-olive [transform:scaleX(-1)]" aria-hidden>
          <BotanicalCorner />
        </div>
        {/* bottom-left (mirror Y) */}
        <div className="pointer-events-none absolute bottom-0 left-0 text-olive [transform:scaleY(-1)]" aria-hidden>
          <BotanicalCorner />
        </div>
        {/* bottom-right (mirror both) */}
        <div className="pointer-events-none absolute bottom-0 right-0 text-olive [transform:scale(-1,-1)]" aria-hidden>
          <BotanicalCorner />
        </div>
      </motion.div>

    </section>

    {/* ── MOBILE hero: ambient autoplay video + scroll text phases ── */}
    <section
      ref={sectionRef}
      className="relative w-full h-[300vh] md:hidden"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Mobile: ambient media + subtle reveal after loader ── */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={prefersReducedMotion ? false : { scale: 1.05, opacity: 0.92 }}
          animate={loaderReady ? { scale: 1, opacity: 1 } : prefersReducedMotion ? {} : { scale: 1.05, opacity: 0.92 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 1.1, ease: EASE, delay: 0.05 }
          }
        >
          <img
            src={frameSrc(0, { mobile: true })}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <video
            ref={mobileVideoRef}
            src={videoSrc('/videos/hero-mobile.mp4')}
            poster={frameSrc(1, { mobile: true })}
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
            style={{ willChange: 'transform' }}
          />
        </motion.div>

        {/* gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/50" />

        {/* ── PHASE 1: overline + headline ── */}
        <div
          ref={phase1Ref}
          className="absolute inset-x-0 top-0 z-10 px-8 pt-16"
          style={{ willChange: 'opacity' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={loaderReady ? { opacity: 1, y: 0 } : {}}
            transition={
              prefersReducedMotion
                ? { duration: 0.25 }
                : { type: 'spring', damping: 28, stiffness: 320, mass: 0.85 }
            }
            className="font-sans text-[11px] tracking-[0.2em] text-white/75"
          >
            SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
          </motion.p>

          <h1 className="hero-headline mt-3 max-w-[700px] font-serif tracking-tight text-balance text-white">
            {heroWords.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <span className="inline-block overflow-hidden align-baseline">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={loaderReady ? { y: 0, opacity: 1 } : {}}
                    transition={
                      prefersReducedMotion
                        ? { delay: i * 0.04, duration: 0.35, ease: EASE }
                        : {
                            delay: 0.06 + i * 0.06,
                            type: 'spring',
                            damping: 26,
                            stiffness: 380,
                            mass: 0.8,
                          }
                    }
                  >
                    {word}
                  </motion.span>
                </span>
                {i < heroWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>
        </div>

        {/* ── PHASE 2: Greek text + CTAs (visible at rest; entrance after loader) ── */}
        <div
          ref={phase2Ref}
          className="absolute bottom-6 left-0 right-0 z-10 px-8"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="max-w-[540px]">
            <motion.p
              className="font-sans text-[16px] leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]"
              initial={{ opacity: 0, y: 22 }}
              animate={loaderReady ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { delay: 0.15, duration: 0.35, ease: EASE }
                  : { delay: 0.38, type: 'spring', damping: 30, stiffness: 280, mass: 0.9 }
              }
            >
              {'Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.'}
            </motion.p>
            <motion.p
              className="mt-3 font-sans text-[14px] leading-loose text-white/65 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]"
              initial={{ opacity: 0, y: 20 }}
              animate={loaderReady ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { delay: 0.22, duration: 0.35, ease: EASE }
                  : { delay: 0.5, type: 'spring', damping: 30, stiffness: 280, mass: 0.9 }
              }
            >
              {'Το M.E.S.S. δεν είναι ένα καφέ. Είναι μια ιδέα περί ενότητας, δημιουργικότητας και ευεξίας — αρμονικά δεμένα στον ίδιο χώρο.'}
            </motion.p>
            <motion.div
              className="mt-7 flex flex-wrap items-center gap-5"
              style={{ willChange: 'opacity' }}
              initial={{ opacity: 0, y: 18 }}
              animate={loaderReady ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { delay: 0.28, duration: 0.35, ease: EASE }
                  : { delay: 0.62, type: 'spring', damping: 24, stiffness: 340, mass: 0.85 }
              }
            >
              <Link
                href="/menu"
                className="inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
              >
                {'Δες το menu'}
              </Link>
              <Link
                href="/#map"
                className="relative inline-block font-sans text-sm font-medium text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
              >
                <span className="absolute bottom-0 left-0 h-px w-full bg-mustard" />
                {'Βρες μας'}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          ref={scrollIndRef}
          className="pointer-events-none absolute bottom-8 left-8 z-30 hidden items-start gap-3 md:flex"
          style={{ willChange: 'opacity' }}
        >
          <span className="pt-1 font-sans text-[11px] uppercase tracking-[0.2em] text-white/50">
            SCROLL
          </span>
          <div className="relative h-[60px] w-px bg-white/20">
            <motion.div
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-mustard"
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: EASE }}
            />
          </div>
        </div>

      </div>
    </section>

    </>
  )
}
