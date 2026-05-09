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
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null)

  const [loaderReady, setLoaderReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const reveal = (delayMs: number, durationMs: number) => ({
    initial: prefersReducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 16 },
    animate: loaderReady
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    transition: prefersReducedMotion
      ? { duration: 0, delay: 0 }
      : {
          duration: durationMs / 1000,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: delayMs / 1000,
        },
  })

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

    {/* ── MOBILE hero: full-viewport video + timed text (no scroll-driven phases) ── */}
    <section className="relative w-full overflow-hidden md:hidden hero-mobile-svh">
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
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover [transform:translateZ(0)]"
          style={{ willChange: 'transform' }}
          onEnded={() => {
            if (process.env.NODE_ENV === 'development') {
              console.debug('[hero] mobile video ended')
            }
          }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-transparent to-black/50" />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-8 pb-10">
        <div className="max-w-[540px] shrink-0 pt-14">
          <motion.p
            {...reveal(0, 600)}
            className="hero-text-shadow font-sans text-[11px] tracking-[0.2em] text-white/75"
          >
            SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
          </motion.p>

          <motion.h1
            {...reveal(200, 800)}
            className="hero-headline hero-text-shadow-display mt-3 max-w-[700px] font-serif tracking-tight text-balance text-white"
          >
            {heroWords.map((word, i) => (
              <Fragment key={`m-${word}-${i}`}>
                <span className="inline-block overflow-hidden align-baseline">
                  <span className="inline-block">{word}</span>
                </span>
                {i < heroWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </motion.h1>
        </div>

        <div className="mt-auto max-w-[540px] min-h-0 pt-6">
          <motion.p
            {...reveal(900, 700)}
            className="hero-text-shadow font-sans text-[16px] leading-relaxed text-white/90"
          >
            {'Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.'}
          </motion.p>
          <motion.p
            {...reveal(1050, 700)}
            className="hero-text-shadow mt-3 font-sans text-[14px] leading-loose text-white/65"
          >
            {'Το M.E.S.S. δεν είναι ένα καφέ. Είναι μια ιδέα περί ενότητας, δημιουργικότητας και ευεξίας — αρμονικά δεμένα στον ίδιο χώρο.'}
          </motion.p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <motion.div {...reveal(1500, 600)}>
              <Link
                href="/menu"
                className="hero-text-shadow inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
              >
                {'Δες το menu'}
              </Link>
            </motion.div>
            <motion.div {...reveal(1600, 600)}>
              <Link
                href="/#map"
                className="hero-text-shadow relative inline-block font-sans text-sm font-medium text-white"
              >
                <span className="absolute bottom-0 left-0 h-px w-full bg-mustard" />
                {'Βρες μας'}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}
