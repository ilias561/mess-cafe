'use client'

import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
const headline = 'A quiet kind of chaos.'
const stats = [
  { key: 'rating', label: 'Google rating', value: '4.8★' },
  { key: 'reviews', label: 'Κριτικές', to: 165 },
  { key: 'location', label: 'ΚΕΠΑΒΙ · Όροφος', to: 211, prefix: '#' },
] as const

function AnimatedCount({
  from,
  to,
  prefix = '',
}: {
  from: number
  to: number
  prefix?: string
}) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [from, to])

  return <span>{prefix}{value}</span>
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const videoRotateX = useTransform(rotateX, (v) => -v * 0.3)
  const videoRotateY = useTransform(rotateY, (v) => -v * 0.3)

  const { scrollY } = useScroll()
  const parallaxRatio = isMobile ? 0.5 : 0.3
  const videoParallaxY = useTransform(scrollY, (v) => reducedMotion ? 0 : v * parallaxRatio)

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
    if (!videoRef.current) return
    if (reducedMotion) {
      videoRef.current.pause()
      return
    }
    videoRef.current.play().catch(() => { /* autoplay policy */ })
  }, [reducedMotion])

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (isMobile || reducedMotion || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    rotateY.set((x - 0.5) * 8)
    rotateX.set((0.5 - y) * 8)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const heroWords = useMemo(() => headline.split(' '), [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden [perspective:1000px] [animation:heroFadeIn_0.35s_ease-out_both]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{
          y: videoParallaxY,
          rotateX: reducedMotion ? 0 : videoRotateX,
          rotateY: reducedMotion ? 0 : videoRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-0 z-0 [transform:translateZ(-100px)_scale(1.12)] transition-transform duration-400 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)]"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-transformation-poster.jpg"
          aria-label="Ο χώρος του M.E.S.S. παίρνει ζωή"
          className="h-full w-full object-cover object-center"
        >
          <source src="/videos/hero-transformation.webm" type="video/webm" />
          <source src="/videos/hero-transformation.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to right, rgba(20,15,10,0.55) 0%, rgba(20,15,10,0.25) 60%, rgba(20,15,10,0.05) 100%)',
        }}
      />

      <motion.div
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1400px] items-end px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-36 [transform:translateZ(60px)] transition-transform duration-400 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)]"
      >
        <div className="max-w-[720px]">
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="font-sans text-[11px] tracking-[0.2em] text-bone/85"
          >
            SPECIALTY COFFEE — HEALTHY BRUNCH — IOANNINA
          </motion.p>

          <h1 className="hero-headline mt-5 font-serif tracking-tight text-balance text-[#F5F0E6] [text-shadow:0_8px_32px_rgba(0,0,0,0.4)]">
            {heroWords.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-baseline"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: EASE }}
                >
                  {word}
                  {i < words.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: EASE }}
            className="mt-6 max-w-[560px] font-sans text-[17px] leading-relaxed text-bone/80 md:text-[18px]"
          >
            Specialty καφές, fresh bowls και θέα στη λίμνη — στον 1ο όροφο του ΚΕΠΑΒΙ, Ιωάννινα.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/menu"
              className="inline-block rounded-full bg-mustard px-8 py-4 font-sans text-sm font-medium text-charcoal transition-colors hover:bg-amber"
            >
              Δες το menu
            </Link>
            <Link
              href="#contact"
              className="relative inline-block font-sans text-sm font-medium text-bone"
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
            className="mt-10 grid w-full max-w-[560px] grid-cols-3 gap-4 border-t border-bone/25 pt-6 md:gap-6"
          >
            {stats.map((item) => (
              <div key={item.key}>
                <p className="font-serif text-[30px] leading-none text-[#F5F0E6]">
                  {item.value ?? <AnimatedCount from={Math.max(item.to - 45, 100)} to={item.to} prefix={item.prefix} />}
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.14em] text-bone/75 md:text-[11px]">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-6 z-30 flex items-start gap-3 md:left-12">
        <span className="pt-1 font-sans text-[11px] uppercase tracking-[0.2em] text-bone/75">
          SCROLL
        </span>
        <div className="relative h-[60px] w-px overflow-visible bg-bone/40">
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
