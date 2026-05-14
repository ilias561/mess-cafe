'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import { LOADING_DURATION_MS } from '@/lib/timing'
import { videoSrc } from '@/lib/media'

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
    const video = desktopVideoRef.current
    if (!video) return

    video.muted = true
    const rate = heroDesktopClipIx === 0 ? 2 : 1

    const onCanPlay = () => {
      video.removeEventListener('canplay', onCanPlay)
      video.currentTime = 0
      video.playbackRate = rate
      void video.play().catch(() => {
        video.muted = true
        void video.play().catch(() => {})
      })
    }

    video.addEventListener('canplay', onCanPlay)
    video.load()
    return () => video.removeEventListener('canplay', onCanPlay)
  }, [loaderReady, heroDesktopClipIx])

  useEffect(() => {
    if (!loaderReady) return
    const video = mobileVideoRef.current
    if (!video) return

    video.playbackRate = 2.5
    video.load()

    const tryPlay = () => {
      video.play().catch(() => {
        video.muted = true
        video.play().catch(() => {})
      })
    }

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
    <section
      id="hero"
      className="relative flex w-full flex-col overflow-hidden bg-bone hero-mobile-svh md:min-h-screen md:flex-row md:items-center"
    >
      {/* ── Media: top strip (mobile) · decorated showcase (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={loaderReady ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
        className="relative order-1 h-[42vh] min-h-[200px] w-full shrink-0 overflow-hidden md:order-2 md:flex md:h-auto md:min-h-0 md:max-h-none md:min-w-0 md:flex-1 md:self-stretch md:items-center md:justify-center md:py-10 md:pl-4 md:pr-6 lg:py-12 lg:pl-6 lg:pr-10"
      >
        {/* Mobile: bounded-height full-bleed video + blend into bone panel */}
        <div className="absolute inset-0 md:hidden">
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
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 z-[1] bg-gradient-to-b from-transparent via-charcoal/10 to-bone"
            aria-hidden="true"
          />
        </div>

        {/* Desktop: decorative frame + rotating clips */}
        <div className="relative hidden h-full w-full md:flex md:items-center md:justify-center">
          <div className="pointer-events-none absolute top-8 right-6 h-24 w-24 rounded-tr-sm border-t-2 border-r-2 border-mustard/30" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-8 left-0 h-24 w-24 rounded-bl-sm border-b-2 border-l-2 border-mustard/30" aria-hidden="true" />

          <div className="pointer-events-none absolute top-16 left-4" aria-hidden="true">
            <div className="h-2 w-2 rounded-full bg-olive/20" />
            <div className="ml-3 mt-2 h-1.5 w-1.5 rounded-full bg-olive/15" />
            <div className="ml-1 mt-1.5 h-1 w-1 rounded-full bg-olive/10" />
          </div>

          <div
            className="pointer-events-none absolute top-20 bottom-20 left-0 w-px bg-gradient-to-b from-transparent via-charcoal/8 to-transparent"
            aria-hidden="true"
          />

          <div className="relative h-[min(88vh,960px)] min-h-[min(72vh,620px)] w-full max-w-[min(1240px,calc(100vw-320px))] overflow-hidden rounded-sm shadow-2xl shadow-charcoal/15 ring-1 ring-charcoal/8">
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={loaderReady ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
            className="absolute bottom-6 right-12 font-sans text-[10px] uppercase tracking-[0.25em] text-charcoal/25"
            aria-hidden="true"
          >
            Ioannina &middot; est. 2024
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={loaderReady ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.6, ease: EASE }}
          className="pointer-events-none absolute bottom-3 right-4 z-[2] font-sans text-[10px] uppercase tracking-[0.25em] text-charcoal/35 md:hidden"
          aria-hidden="true"
        >
          Ioannina &middot; est. 2024
        </motion.p>
      </motion.div>

      {/* ── Shared copy (bone): same hierarchy / motion as desktop ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={loaderReady ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 order-2 flex min-h-0 w-full flex-1 flex-col justify-center px-8 py-10 md:order-1 md:w-[36%] md:min-w-[280px] md:flex-none md:shrink-0 md:px-10 md:py-28 lg:px-14 xl:px-16"
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/40">
          SPECIALTY COFFEE &mdash; HEALTHY BRUNCH &mdash; IOANNINA &middot; #KEEPRISING
        </p>

        <h1 className="hero-headline mt-4 font-serif tracking-tight text-balance text-charcoal">
          {heroWords.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
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
            className="inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-amber hover:shadow-lg active:scale-[0.98]"
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
    </section>
  )
}
