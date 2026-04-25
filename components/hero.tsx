'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import { LOADING_DURATION_MS } from '@/lib/timing'
import { imagePlaceholder, images } from '@/lib/images'
const headline = 'A quiet kind of chaos.'
const fallbackSlides = [
  images.heroInterior,
  images.aboutBar,
  images.gallery1,
  images.aboutPlants,
] as const
const stats: ReadonlyArray<{ key: string; label: string; value: string }> = [
  { key: 'rating', label: 'Google rating', value: '4.8★' },
  { key: 'hours', label: 'Ανοιχτά καθημερινά', value: '08—22' },
  { key: 'location', label: 'ΚΕΠΑΒΙ · Ιωάννινα', value: 'Ιωάννινα' },
]


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const parallaxContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [loaderReady, setLoaderReady] = useState(false)
  const [mediaPhase, setMediaPhase] = useState<'poster' | 'video' | 'hold' | 'photos'>('poster')
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const el = parallaxContainerRef.current
    if (!el) return
    let rafId = 0
    const update = () => {
      const ratio = isMobile ? 0.02 : 0.04
      el.style.transform = reducedMotion ? '' : `translateY(${window.scrollY * ratio}px)`
    }
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile, reducedMotion])

  useEffect(() => {
    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mediaMobile = window.matchMedia('(max-width: 767px)')
    const sync = () => {
      setReducedMotion(mediaMotion.matches)
      setIsMobile(mediaMobile.matches)
    }
    sync()
    mediaMotion.addEventListener('change', sync)
    mediaMobile.addEventListener('change', sync)
    return () => {
      mediaMotion.removeEventListener('change', sync)
      mediaMobile.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    const onLoaderDone = () => setLoaderReady(true)
    window.addEventListener('mess:loader-complete', onLoaderDone)
    const hasLoaderCompleted = (window as Window & { __messLoaderComplete?: boolean }).__messLoaderComplete
    if (hasLoaderCompleted) {
      setLoaderReady(true)
    }
    const fallback = window.setTimeout(() => setLoaderReady(true), LOADING_DURATION_MS)
    return () => {
      window.removeEventListener('mess:loader-complete', onLoaderDone)
      window.clearTimeout(fallback)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.35 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setMediaPhase('photos')
      setSlideIndex(0)
      return
    }
    if (!loaderReady) {
      setMediaPhase('poster')
      return
    }
    setMediaPhase('video')
  }, [loaderReady, reducedMotion])

  useEffect(() => {
    if (mediaPhase !== 'video' || reducedMotion || !loaderReady || !videoRef.current) return
    const video = videoRef.current
    if (!isHeroVisible) {
      video.pause()
      return
    }
    video.currentTime = 0
    video.playbackRate = 1
    video.play().catch(() => { /* autoplay policy */ })
    const onEnded = () => {
      setMediaPhase('hold')
    }
    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [reducedMotion, isHeroVisible, loaderReady, mediaPhase])

  useEffect(() => {
    if (mediaPhase !== 'hold') return
    const holdTimeout = window.setTimeout(() => {
      setMediaPhase('photos')
      setSlideIndex(0)
    }, 3000)
    return () => window.clearTimeout(holdTimeout)
  }, [mediaPhase])

  useEffect(() => {
    if (reducedMotion || !loaderReady || mediaPhase !== 'photos') return
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % fallbackSlides.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [loaderReady, mediaPhase, reducedMotion])

  const heroWords = useMemo(() => headline.split(' '), [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden [animation:heroFadeIn_0.35s_ease-out_both]"
    >
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[42%_58%]">

        {/* LEFT COLUMN — text */}
        <div className="relative z-20 flex items-end bg-white">
          <div className="mx-auto w-full max-w-[520px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
            <div className="relative">
              <motion.p
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-sans text-[11px] tracking-[0.2em] text-charcoal"
              >
                SPECIALTY COFFEE — HEALTHY BRUNCH — IOANNINA
              </motion.p>

              <h1 className="hero-headline mt-5 font-serif tracking-tight text-balance text-charcoal [text-shadow:0_3px_14px_rgba(255,255,255,0.35)]">
                {heroWords.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden align-baseline"
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.8, ease: EASE }}
                    >
                      {word}
                      {i < heroWords.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.32, ease: EASE }}
                className="mt-6 max-w-[560px] font-sans text-[17px] leading-relaxed text-charcoal md:text-[18px]"
              >
                Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
                className="mt-4 max-w-[480px] font-sans text-[15px] leading-loose text-concrete"
              >
                Το M.E.S.S. δεν είναι ένα καφέ. Είναι μια ιδέα περί ενότητας, δημιουργικότητας και ευεξίας — αρμονικά δεμένα στον ίδιο χώρο.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-5"
              >
                <Link
                  href="/menu"
                  className="inline-block rounded-full bg-mustard px-8 py-4 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
                >
                  Δες το menu
                </Link>
                <Link
                  href="#contact"
                  className="relative inline-block font-sans text-sm font-medium text-charcoal"
                >
                  <motion.span
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-mustard"
                  />
                  Βρες μας
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                className="mt-10 grid w-full max-w-[560px] grid-cols-3 gap-4 border-t border-charcoal/20 pt-6 md:gap-6"
              >
                {stats.map((item) => (
                  <div key={item.key}>
                    <p className="font-serif text-[30px] leading-none text-charcoal">
                      {item.value}
                    </p>
                    <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.14em] text-charcoal md:text-[11px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — photo/video */}
        <div className="relative min-h-[60vh] md:min-h-0">
          <div
            ref={parallaxContainerRef}
            style={{ background: imagePlaceholder() }}
            className="absolute inset-0 will-change-transform"
          >
            <AnimatePresence mode="wait">
              {(mediaPhase === 'video' || mediaPhase === 'hold' || mediaPhase === 'poster') && !reducedMotion ? (
                <motion.video
                  key={`hero-video-${mediaPhase}`}
                  ref={videoRef}
                  muted
                  playsInline
                  preload="metadata"
                  poster="/videos/hero-transformation-poster.jpg"
                  aria-label="Ο χώρος του M.E.S.S. παίρνει ζωή"
                  className="h-full w-full object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <source src="/videos/hero-transformation.mp4" type="video/mp4" />
                </motion.video>
              ) : (
                <motion.div
                  key={`hero-photo-${slideIndex}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={fallbackSlides[slideIndex]}
                    alt="Ο χώρος του M.E.S.S."
                    fill
                    priority
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <div className="pointer-events-none absolute bottom-8 left-6 z-30 flex items-start gap-3 md:left-12">
        <span className="pt-1 font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal">
          SCROLL
        </span>
        <div className="relative h-[60px] w-px overflow-visible bg-charcoal/20">
          <motion.div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-mustard"
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: EASE }}
          />
        </div>
      </div>
    </section>
  )
}
