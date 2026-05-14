'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import { LOADING_DURATION_MS } from '@/lib/timing'
import { videoSrc } from '@/lib/media'

/** After loader (or clip change): reload buffer, seek to 0, apply rate, then play (Safari-friendly). */
function armHeroVideoAfterLoader(video: HTMLVideoElement | null, playbackRate: number): () => void {
  if (!video) return () => {}

  video.muted = true

  const playFromStart = () => {
    video.currentTime = 0
    video.playbackRate = playbackRate
    void video.play().catch(() => {
      video.muted = true
      void video.play().catch(() => {})
    })
  }

  const onCanPlay = () => {
    video.removeEventListener('canplay', onCanPlay)
    playFromStart()
  }

  video.addEventListener('canplay', onCanPlay)
  video.load()

  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    playFromStart()
    video.removeEventListener('canplay', onCanPlay)
    return () => {}
  }

  return () => video.removeEventListener('canplay', onCanPlay)
}

export default function Hero() {
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null)
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null)

  const [loaderReady, setLoaderReady] = useState(false)
  const [heroDesktopClipIx, setHeroDesktopClipIx] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const desktopClips = useMemo(
    () =>
      [
        videoSrc('/videos/main-page-animation.mp4'),
        videoSrc('/videos/about-editorial-1.mp4'),
        videoSrc('/videos/about-editorial-2.mp4'),
      ] as const,
    [],
  )

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
    if (!loaderReady) return
    return armHeroVideoAfterLoader(mobileVideoRef.current, 2.5)
  }, [loaderReady])

  useEffect(() => {
    if (!loaderReady) return
    const rate = heroDesktopClipIx === 0 ? 2 : 1
    return armHeroVideoAfterLoader(desktopVideoRef.current, rate)
  }, [loaderReady, heroDesktopClipIx])

  useEffect(() => {
    const video = mobileVideoRef.current
    if (!video) return
    let stallCount = 0
    const onWaiting = () => {
      stallCount++
      if (stallCount >= 2) {
        video.pause()
      }
    }
    video.addEventListener('waiting', onWaiting)
    return () => video.removeEventListener('waiting', onWaiting)
  }, [])

  const heroWords = 'A quiet kind of chaos.'.split(' ')

  return (
    <>

    {/* ── DESKTOP hero: text left · decorated video right ── */}
    <section
      id="hero"
      className="hidden md:flex min-h-screen bg-bone items-center overflow-hidden"
    >
      {/* ── LEFT: text column ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={loaderReady ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 flex w-[36%] min-w-[280px] shrink-0 flex-col justify-center px-10 lg:px-14 xl:px-16 py-28"
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
                  transition={{ delay: 1.0 + i * 0.06, duration: 0.5, ease: EASE }}
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
          transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
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
          transition={{ delay: 1.6, duration: 0.4, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-5"
        >
          <Link
            href="/menu"
            className="inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber active:scale-[0.98]"
          >
            {'Δες το menu'}
          </Link>
          <Link
            href="/#map"
            className="ui-link relative inline-block font-sans text-sm font-medium text-charcoal"
          >
            <span className="absolute bottom-0 left-0 h-px w-full bg-mustard" />
            {'Βρες μας'}
          </Link>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: decorated video showcase ── */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={loaderReady ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
        className="relative flex min-h-0 min-w-0 flex-1 self-stretch items-center justify-center py-10 pl-4 pr-6 lg:py-12 lg:pl-6 lg:pr-10"
      >
        {/* Decorative accent — mustard corner lines */}
        <div className="pointer-events-none absolute top-8 right-6 w-24 h-24 border-t-2 border-r-2 border-mustard/30 rounded-tr-sm" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-8 left-0 w-24 h-24 border-b-2 border-l-2 border-mustard/30 rounded-bl-sm" aria-hidden="true" />

        {/* Decorative accent — olive dot cluster */}
        <div className="pointer-events-none absolute top-16 left-4" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-olive/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-olive/15 mt-2 ml-3" />
          <div className="w-1 h-1 rounded-full bg-olive/10 mt-1.5 ml-1" />
        </div>

        {/* Decorative accent — thin vertical line */}
        <div className="pointer-events-none absolute top-20 bottom-20 left-0 w-px bg-gradient-to-b from-transparent via-charcoal/8 to-transparent" aria-hidden="true" />

        {/* Video container — tall cover, no max-width cap */}
        <div className="relative h-[min(88vh,960px)] min-h-[min(72vh,620px)] w-full max-w-[min(1240px,calc(100vw-320px))] overflow-hidden rounded-sm shadow-2xl shadow-charcoal/15 ring-1 ring-charcoal/8">
          {/* Subtle inner glow overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-sm ring-1 ring-inset ring-white/10" />

          <video
            ref={desktopVideoRef}
            src={desktopClips[heroDesktopClipIx]}
            muted
            playsInline
            preload="metadata"
            poster={heroDesktopClipIx === 0 ? videoSrc('/videos/hero-desktop-poster.jpg') : undefined}
            className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
            aria-hidden="true"
            title="M.E.S.S. — Ο χώρος μας"
            onEnded={() => {
              setHeroDesktopClipIx((i) => (i + 1) % desktopClips.length)
            }}
          />
        </div>

        {/* Decorative label below video */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaderReady ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
          className="absolute bottom-6 right-12 font-sans text-[10px] tracking-[0.25em] text-charcoal/25 uppercase"
          aria-hidden="true"
        >
          Ioannina &middot; est. 2024
        </motion.p>
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
          src={videoSrc('/videos/hero-mobile-poster.jpg')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <video
          ref={mobileVideoRef}
          poster={videoSrc('/videos/hero-mobile-poster.jpg')}
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="metadata"
          aria-hidden="true"
          title="M.E.S.S. — Ο χώρος μας"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center [transform:translateZ(0)]"
          style={{ willChange: 'transform' }}
          onEnded={() => {
            if (process.env.NODE_ENV === 'development') {
              console.debug('[hero] mobile video ended')
            }
          }}
        >
          <source src={videoSrc('/videos/hero-mobile.hevc.mp4')} type='video/mp4; codecs="hvc1"' />
          <source src={videoSrc('/videos/hero-mobile.mp4')} type="video/mp4" />
        </video>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-transparent to-black/50" />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-8 pb-10">
        <div className="max-w-[540px] shrink-0 pt-14">
          <motion.p
            {...reveal(1000, 500)}
            className="hero-text-shadow font-sans text-[11px] tracking-[0.2em] text-white/75"
          >
            SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
          </motion.p>

          <motion.h1
            {...reveal(1100, 600)}
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
            {...reveal(1300, 500)}
            className="hero-text-shadow font-sans text-[16px] leading-relaxed text-white/90"
          >
            {'Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.'}
          </motion.p>
          <motion.p
            {...reveal(1500, 500)}
            className="hero-text-shadow mt-3 font-sans text-[14px] leading-loose text-white/65"
          >
            {'Το M.E.S.S. δεν είναι ένα καφέ. Είναι μια ιδέα περί ενότητας, δημιουργικότητας και ευεξίας — αρμονικά δεμένα στον ίδιο χώρο.'}
          </motion.p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <motion.div {...reveal(1700, 400)}>
              <Link
                href="/menu"
                className="hero-text-shadow inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber active:scale-[0.98]"
              >
                {'Δες το menu'}
              </Link>
            </motion.div>
            <motion.div {...reveal(1900, 700)}>
              <Link
                href="/#map"
                className="ui-link hero-text-shadow relative inline-block font-sans text-sm font-medium text-white"
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
