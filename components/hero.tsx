'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
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
  const sectionRef = useRef<HTMLElement | null>(null)
  // Stop the hero's infinite loops (logo bob, scroll-cue pulse, mobile-frame
  // cycle) once it's scrolled out of view — no idle main-thread churn down-page.
  const heroInView = useInView(sectionRef)

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
  useHeroVideoAutoplay(desktopVideoRef, loaderReady && !prefersReducedMotion && isDesktop, 1.75, true, false)

  // Desktop hero: play the first 59% at 1.75x, then resume normal speed.
  useEffect(() => {
    if (prefersReducedMotion || !isDesktop) return
    const video = desktopVideoRef.current
    if (!video) return
    const onTime = () => {
      if (!video.duration) return
      const rate = video.currentTime < video.duration * 0.59 ? 1.75 : 1
      if (video.playbackRate !== rate) video.playbackRate = rate
    }
    video.addEventListener('timeupdate', onTime)
    return () => video.removeEventListener('timeupdate', onTime)
  }, [prefersReducedMotion, isDesktop, loaderReady])

  useEffect(() => {
    if (prefersReducedMotion || !heroInView) return
    const interval = window.setInterval(() => {
      setMobileFrameIx((i) => (i + 1) % mobileFramePaths.length)
    }, 2500)
    return () => window.clearInterval(interval)
  }, [prefersReducedMotion, heroInView, mobileFramePaths.length])

  const heroWords = 'A quiet kind of chaos.'.split(' ')

  return (
    <div id="hero" className="scroll-mt-20">
      <section ref={sectionRef} className="hero-mobile-svh relative min-h-screen w-full overflow-hidden">
        {/* ── Full-bleed background video ── */}
        <m.div
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
        </m.div>

        {/* ── Legibility scrims (centered composition) ── */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-transparent to-black/50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(0,0,0,0.5), rgba(0,0,0,0) 72%)',
          }}
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

        {/* ── Overlaid content — brand near top, headline centered below ── */}
        <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pt-[13vh] pb-[8vh] text-center md:px-12 md:pt-[11vh]">
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={loaderReady ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease: EASE }}
            className="flex items-center gap-5"
          >
            <m.div
              animate={prefersReducedMotion || !heroInView ? {} : { y: [0, -8, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="shrink-0"
            >
              <Image
                src="/images/logo-mess.svg"
                alt="Λογότυπο M.E.S.S."
                width={88}
                height={88}
                priority
                className="hero-text-shadow h-20 w-20 rounded-full object-cover md:h-28 md:w-28 lg:h-[172px] lg:w-[172px]"
              />
            </m.div>
            <span className="hero-text-shadow font-serif text-[52px] font-medium leading-none tracking-tight text-white md:text-[76px] lg:text-[132px]">
              M.E.S.S.
            </span>
          </m.div>

          <div className="flex w-full flex-1 flex-col items-center justify-end pb-[5vh]">
          <m.p
            {...reveal(700, 1000)}
            className="hero-text-shadow font-sans text-[11px] tracking-[0.2em] text-white/75 uppercase"
          >
            SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
          </m.p>

          <h1 className="hero-headline hero-text-shadow-display mt-4 font-serif tracking-tight text-balance text-white">
            {heroWords.map((word, i) => (
              <Fragment key={`hero-${word}-${i}`}>
                <span className="inline-block overflow-hidden px-[0.08em] -mx-[0.08em] py-[0.14em] -my-[0.14em] align-baseline">
                  <m.span
                    className={`inline-block ${word === 'kind' ? 'font-serif italic text-mustard pr-[0.16em]' : ''}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { y: '100%', opacity: 0, filter: 'blur(10px)' }}
                    animate={
                      loaderReady
                        ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                        : prefersReducedMotion
                          ? { opacity: 0 }
                          : { y: '100%', opacity: 0, filter: 'blur(10px)' }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.2, delay: 0 }
                        : { delay: 1.1 + i * 0.1, duration: 0.9, ease: EASE }
                    }
                  >
                    {word}
                  </m.span>
                </span>
                {i < heroWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <m.p
            {...reveal(1900, 1100)}
            className="hero-text-shadow mx-auto mt-7 max-w-[560px] font-sans text-[15px] leading-relaxed text-white/90 md:mt-10 md:text-[17px]"
          >
            {'Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.'}
          </m.p>

          <m.div {...reveal(2500, 900)} className="mt-6 md:mt-8">
            <Link
              href="/#map"
              className="ui-link hero-text-shadow relative inline-flex min-h-11 items-center py-2.5 font-sans text-sm font-medium text-white md:min-h-0 md:py-0"
            >
              <span className="absolute bottom-0 left-0 h-px w-full bg-mustard" />
              Βρες μας
            </Link>
          </m.div>
          </div>

          {/* Corner label */}
          <m.p
            initial={{ opacity: 0 }}
            animate={loaderReady ? { opacity: 1 } : {}}
            transition={{ delay: 2.8, duration: 0.8, ease: EASE }}
            className="hero-text-shadow pointer-events-none absolute right-6 bottom-8 font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase md:right-12 md:bottom-10"
            aria-hidden
          >
            Ioannina &middot; est. 2025
          </m.p>

          {/* Scroll cue */}
          <m.div
            initial={{ opacity: 0 }}
            animate={loaderReady ? { opacity: 1 } : {}}
            transition={{ delay: 3.2, duration: 1, ease: EASE }}
            className="pointer-events-none absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 md:bottom-10"
            aria-hidden
          >
            <m.span
              className="block h-9 w-px bg-gradient-to-b from-white/0 via-white/60 to-white/0"
              animate={prefersReducedMotion || !heroInView ? {} : { y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={prefersReducedMotion ? {} : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </m.div>
        </div>
      </section>
    </div>
  )
}
