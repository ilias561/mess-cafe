'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import { LOADING_DURATION_MS } from '@/lib/timing'
import { videoSrc } from '@/lib/media'

const TOTAL_FRAMES = 97   // ffmpeg extracted 97 frames from the 4-second video

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const framesRef     = useRef<HTMLImageElement[]>([])
  const phase1Ref     = useRef<HTMLDivElement>(null)
  const phase2Ref     = useRef<HTMLDivElement>(null)
  const phase2BtnsRef = useRef<HTMLDivElement>(null)
  const scrollIndRef  = useRef<HTMLDivElement>(null)
  const rafRef        = useRef<number>(0)
  const isMobileRef   = useRef(false)
  const seekingRef    = useRef(false)
  const lastFrameRef  = useRef(-1)

  const [loaderReady,   setLoaderReady]   = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const onDone = () => setLoaderReady(true)
    window.addEventListener('mess:loader-complete', onDone)
    const win = window as Window & { __messLoaderComplete?: boolean }
    if (win.__messLoaderComplete) setLoaderReady(true)
    const t = window.setTimeout(() => setLoaderReady(true), LOADING_DURATION_MS)
    return () => { window.removeEventListener('mess:loader-complete', onDone); window.clearTimeout(t) }
  }, [])

  // Preload image sequence frames for mobile
  useEffect(() => {
    if (window.innerWidth >= 768) return
    isMobileRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const imgs: HTMLImageElement[] = []
    let loaded = 0

    const drawFrame = (idx: number) => {
      const img = imgs[idx]
      if (!img?.complete || !canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const num = String(i).padStart(4, '0')
      img.src = videoSrc(`/videos/frames/frame-${num}.jpg`)
      img.onload = () => {
        loaded++
        // Draw frame 1 as soon as it's ready — replaces the poster immediately
        if (i === 1) drawFrame(0)
      }
      imgs.push(img)
    }
    framesRef.current = imgs
  }, [])

  // Scroll-scrub: shared between mobile (canvas) and desktop (video)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isMobile = isMobileRef.current
    const video    = videoRef.current
    const canvas   = canvasRef.current

    // Desktop video setup
    if (!isMobile && video) {
      video.setAttribute('muted', '')
      video.muted = true
      video.src   = videoSrc('/videos/main-page-animation.mp4')
      video.load()
      video.pause()
      video.addEventListener('seeked', () => { seekingRef.current = false })
    }

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
    const eio   = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const update = () => {
      const rect       = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      const p = clamp(-rect.top / scrollable, 0, 1)

      // ── Media scrub ──────────────────────────────────────────────────────────
      if (!reducedMotion) {
        if (isMobile && canvas) {
          const idx = Math.round(p * (TOTAL_FRAMES - 1))
          if (idx !== lastFrameRef.current) {
            lastFrameRef.current = idx
            const img = framesRef.current[idx]
            if (img?.complete) {
              const ctx = canvas.getContext('2d')
              ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
          }
        } else if (video && video.duration && video.readyState >= 2 && !seekingRef.current) {
          seekingRef.current = true
          video.currentTime = p * video.duration
        }
      }

      // ── Phase 1: headline at top ─────────────────────────────────────────────
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

      // ── Phase 2: Greek text panel ────────────────────────────────────────────
      const el2 = phase2Ref.current
      if (el2) {
        let op2 = 0, yIn = 0, yUp = 0
        if      (p >= 0.22 && p < 0.30) { op2 = (p - 0.22) / 0.08; yIn = (1 - op2) * 24 }
        else if (p >= 0.30 && p < 0.65) { op2 = 1 }
        else if (p >= 0.65)             { op2 = 1; yUp = -eio(clamp((p - 0.65) / 0.12, 0, 1)) * 90 }
        el2.style.opacity       = String(clamp(op2, 0, 1))
        el2.style.transform     = `translateY(${(yIn + yUp).toFixed(2)}px)`
        el2.style.pointerEvents = op2 < 0.05 ? 'none' : ''
      }

      // ── Buttons ──────────────────────────────────────────────────────────────
      const elBt = phase2BtnsRef.current
      if (elBt) elBt.style.opacity = String(clamp((p - 0.68) / 0.08, 0, 1))

      // ── Scroll indicator ─────────────────────────────────────────────────────
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
  }, [reducedMotion])

  const heroWords = 'A quiet kind of chaos.'.split(' ')

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ height: '600vh' }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Desktop: video element ── */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={videoSrc('/videos/hero-animation-poster.jpg')}
          aria-label="Ο χώρος του M.E.S.S."
          className="absolute inset-0 h-full w-full object-cover object-center md:block hidden"
        />

        {/* ── Mobile: canvas image sequence ── */}
        <canvas
          ref={canvasRef}
          width={540}
          height={960}
          className="absolute inset-0 h-full w-full object-cover object-center block md:hidden"
          style={{ background: '#1a1a1a' }}
        />

        {/* gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/50" />

        {/* ── PHASE 1: overline + headline ── */}
        <div
          ref={phase1Ref}
          className="absolute inset-x-0 top-0 z-10 px-8 pt-16 md:px-16 lg:px-20"
          style={{ willChange: 'opacity' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={loaderReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-sans text-[11px] tracking-[0.2em] text-white/75"
          >
            SPECIALTY COFFEE — HEALTHY BRUNCH — IOANNINA · #KEEPRISING
          </motion.p>

          <h1 className="hero-headline mt-3 max-w-[700px] font-serif tracking-tight text-balance text-white">
            {heroWords.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden align-baseline">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={loaderReady ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.85, ease: EASE }}
                >
                  {word}{i < heroWords.length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* ── PHASE 2: Greek text ── */}
        <div
          ref={phase2Ref}
          className="absolute bottom-6 left-0 right-0 z-10 px-8 md:px-16 lg:px-20"
          style={{ opacity: 0, willChange: 'opacity, transform' }}
        >
          <div className="max-w-[540px]">
            <p className="font-sans text-[16px] leading-relaxed text-white/90 md:text-[17px] [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
              Καλώς ήρθατε στο M.E.S.S. Έναν πολυχώρο μπροστά στην λίμνη των Ιωαννίνων που έχει ως σκοπό την ανάδειξη κοινωνικών και καλλιτεχνικών δρώμενων καθώς και το ευ ζην.
            </p>
            <p className="mt-3 font-sans text-[14px] leading-loose text-white/65 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
              Το M.E.S.S. δεν είναι ένα καφέ. Είναι μια ιδέα περί ενότητας, δημιουργικότητας και ευεξίας — αρμονικά δεμένα στον ίδιο χώρο.
            </p>
            <div
              ref={phase2BtnsRef}
              className="mt-7 flex flex-wrap items-center gap-5"
              style={{ opacity: 0, willChange: 'opacity' }}
            >
              <Link
                href="/menu"
                className="inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
              >
                Δες το menu
              </Link>
              <Link
                href="/#map"
                className="relative inline-block font-sans text-sm font-medium text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
              >
                <span className="absolute bottom-0 left-0 h-px w-full bg-mustard" />
                Βρες μας
              </Link>
            </div>
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
  )
}
