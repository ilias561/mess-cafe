'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import { LOADING_DURATION_MS } from '@/lib/timing'
import { videoSrc } from '@/lib/media'

/** After loader (or clip change): reload buffer, seek to 0, apply rate, then play (Safari-friendly). */
function armHeroVideoAfterLoader(video: HTMLVideoElement | null, playbackRate: number): () => void {
  if (!video) return () => {}

  video.muted = true

  let hasStarted = false
  const playFromStart = () => {
    if (hasStarted) return
    hasStarted = true
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

function isVideoVisible(video: HTMLVideoElement) {
  return video.getClientRects().length > 0
}

function useHeroVideoAutoplay(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  loaderReady: boolean,
  playbackRate: number,
  useArmLoader = false,
  loopVideo = true,
) {
  useEffect(() => {
    if (!loaderReady) return
    const video = videoRef.current
    if (!video) return

    const cleanup = useArmLoader ? armHeroVideoAfterLoader(video, playbackRate) : undefined

    // Play-once guard: once the clip has ended, don't restart it on scroll-back/visibility.
    let hasEnded = false

    const tryPlay = () => {
      if (!isVideoVisible(video)) {
        video.pause()
        return
      }
      if (!loopVideo && hasEnded) return
      if (!video.paused) return
      video.currentTime = 0
      video.playbackRate = playbackRate
      void video.play().catch(() => {
        video.muted = true
        void video.play().catch(() => {})
      })
    }

    if (!useArmLoader) {
      video.muted = true
      tryPlay()
    }

    const onResize = () => tryPlay()
    window.addEventListener('resize', onResize)

    const onEnded = () => {
      hasEnded = true
      if (loopVideo) {
        video.currentTime = 0
        void video.play().catch(() => {})
      }
    }
    video.addEventListener('ended', onEnded)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
      },
      { threshold: 0.3 },
    )
    observer.observe(video)

    return () => {
      cleanup?.()
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [loaderReady, playbackRate, useArmLoader, loopVideo, videoRef])
}

export default function Hero() {
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null)
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null)

  const [loaderReady, setLoaderReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [mobileFrameIx, setMobileFrameIx] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  // Only the clip matching the current viewport should ever load — prevents
  // mobile downloading the desktop clip (and vice-versa).
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const desktopClip = useMemo(() => videoSrc('/videos/main-page-animation.mp4'), [])
  const mobileFramePaths = useMemo(
    () => [1, 2, 3, 4].map((n) => `/videos/hero-mobile-frame-${n}.jpg`),
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
    return () => {
      window.removeEventListener('mess:loader-complete', onDone)
      window.clearTimeout(t)
    }
  }, [])

  useHeroVideoAutoplay(mobileVideoRef, loaderReady && !prefersReducedMotion && !isDesktop, 2.5, false, false)
  useHeroVideoAutoplay(desktopVideoRef, loaderReady && !prefersReducedMotion && isDesktop, 1, true, false)

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = window.setInterval(() => {
      setMobileFrameIx((i) => (i + 1) % mobileFramePaths.length)
    }, 2500)
    return () => window.clearInterval(interval)
  }, [prefersReducedMotion, mobileFramePaths.length])

  const heroWords = 'A quiet kind of chaos.'.split(' ')

  return (
    <div id="hero" className="scroll-mt-20">
      <section className="hero-mobile-svh relative min-h-screen w-full overflow-hidden">
        {/* ── Full-bleed background video ── */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={prefersReducedMotion ? false : { scale: 1.04, opacity: 0.92 }}
          animate={
            loaderReady
              ? { scale: 1, opacity: 1 }
              : prefersReducedMotion
                ? {}
                : { scale: 1.04, opacity: 0.92 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 1.1, ease: EASE, delay: 0.05 }
          }
        >
          {/* Mobile clip */}
          <div className="absolute inset-0 md:hidden">
            <img
              src={videoSrc(mobileFramePaths[mobileFrameIx] ?? '/videos/hero-mobile-poster.jpg')}
              alt=""
              aria-hidden
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {!prefersReducedMotion && (
              <video
                ref={mobileVideoRef}
                poster={videoSrc('/videos/hero-mobile-poster.jpg')}
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="none"
                aria-hidden
                title="M.E.S.S. — Ο χώρος μας"
                className="absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)]"
                style={{ willChange: 'transform' }}
              >
                <source src={videoSrc('/videos/hero-mobile.hevc.mp4')} type='video/mp4; codecs="hvc1"' />
                <source src={videoSrc('/videos/hero-mobile.mp4')} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Desktop clip */}
          <div className="absolute inset-0 hidden md:block">
            <video
              ref={desktopVideoRef}
              src={desktopClip}
              muted
              playsInline
              preload="none"
              poster={videoSrc('/videos/hero-desktop-poster.jpg')}
              className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
              aria-hidden
              title="M.E.S.S. — Ο χώρος μας"
            />
          </div>
        </motion.div>

        {/* ── Legibility scrims (centered composition) ── */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-transparent to-black/50"
          aria-hidden
        />

        {/* ── Mustard corner accent frame ── */}
        <div
          className="pointer-events-none absolute top-6 right-6 z-[2] h-20 w-20 border-t-2 border-r-2 border-mustard/35 rounded-tr-sm md:top-10 md:right-10 md:h-24 md:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-24 left-6 z-[2] h-16 w-16 border-b-2 border-l-2 border-mustard/25 rounded-bl-sm md:bottom-28 md:left-12"
          aria-hidden
        />

        {/* ── Overlaid content — centered ── */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={loaderReady ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.5, ease: EASE }}
            className="mb-7 flex items-center gap-4"
          >
            <Image
              src="/images/logo-mess.svg"
              alt="Λογότυπο M.E.S.S."
              width={88}
              height={88}
              priority
              className="hero-text-shadow h-16 w-16 shrink-0 rounded-full object-cover md:h-[88px] md:w-[88px]"
            />
            <span className="hero-text-shadow font-serif text-[44px] font-medium leading-none tracking-tight text-white md:text-[68px]">
              M.E.S.S.
            </span>
          </motion.div>

          <motion.p
            {...reveal(950, 500)}
            className="hero-text-shadow font-sans text-[11px] tracking-[0.2em] text-white/75 uppercase"
          >
            SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
          </motion.p>

          <h1 className="hero-headline hero-text-shadow-display mt-4 font-serif tracking-tight text-balance text-white">
            {heroWords.map((word, i) => (
              <Fragment key={`hero-${word}-${i}`}>
                <span className="inline-block overflow-hidden align-baseline">
                  <motion.span
                    className={`inline-block ${word === 'kind' ? 'font-serif italic text-mustard' : ''}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                    animate={
                      loaderReady
                        ? { y: 0, opacity: 1 }
                        : prefersReducedMotion
                          ? { opacity: 0 }
                          : { y: '100%', opacity: 0 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.2, delay: 0 }
                        : { delay: 1.0 + i * 0.06, duration: 0.5, ease: EASE }
                    }
                  >
                    {word}
                  </motion.span>
                </span>
                {i < heroWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <motion.p
            {...reveal(1250, 500)}
            className="hero-text-shadow mx-auto mt-6 max-w-[560px] font-sans text-[15px] leading-relaxed text-white/90 md:text-[17px]"
          >
            {'Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.'}
          </motion.p>

          <motion.div {...reveal(1550, 400)} className="mt-8">
            <Link
              href="/#map"
              className="ui-link hero-text-shadow relative inline-block font-sans text-sm font-medium text-white"
            >
              <span className="absolute bottom-0 left-0 h-px w-full bg-mustard" />
              Βρες μας
            </Link>
          </motion.div>

          {/* Corner label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={loaderReady ? { opacity: 1 } : {}}
            transition={{ delay: 1.15, duration: 0.8, ease: EASE }}
            className="hero-text-shadow pointer-events-none absolute right-6 bottom-8 font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase md:right-12 md:bottom-10"
            aria-hidden
          >
            Ioannina &middot; est. 2024
          </motion.p>
        </div>
      </section>
    </div>
  )
}
