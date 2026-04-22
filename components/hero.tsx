'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { EASE } from '@/lib/motion'
import { images } from '@/lib/images'

const headline = 'A quiet kind of chaos.'
const words = headline.split(' ')

/* ── Hero video with prefers-reduced-motion + poster fallback ── */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pause = () => ref.current?.pause()
    if (mq.matches) {
      pause()
      return
    }
    // Ensure autoplay fires even after hydration
    ref.current?.play().catch(() => {/* autoplay blocked by browser policy */})
    mq.addEventListener('change', pause)
    return () => mq.removeEventListener('change', pause)
  }, [])

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={images.heroInterior}
      aria-label="Ο χώρος του M.E.S.S. παίρνει ζωή"
      className="absolute inset-0 h-full w-full object-cover object-center"
    >
      {/* WebM first (Chrome/Firefox), MP4 as fallback (Safari/iOS) */}
      <source src="/videos/hero-transformation.webm" type="video/webm" />
      <source src="/videos/hero-transformation.mp4" type="video/mp4" />
      {/* Browsers that can't play video show the poster image via the element itself */}
    </video>
  )
}

export default function Hero() {
  return (
    /*
     * CSS `heroFadeIn` animation (defined in globals.css) provides a fast
     * CSS-only fade-in so the section is never seen as a blank page during
     * the ~200ms before Framer Motion hydrates.
     */
    <section id="hero" className="relative overflow-hidden bg-bone pt-24 pb-12 [animation:heroFadeIn_0.35s_ease-out_both] md:pb-14">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-8 px-6 py-12 md:grid-cols-12 md:px-12 md:py-16">

        {/* ── Left: copy ── */}
        <div className="col-span-12 flex flex-col gap-6 md:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: EASE }}
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive"
          >
            SPECIALTY COFFEE · HEALTHY BRUNCH · IOANNINA
          </motion.p>

          {/* Word-by-word mask reveal */}
          <h1 className="hero-headline font-serif tracking-tight text-balance text-charcoal">
            {words.map((word, i) => (
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
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="max-w-[480px] font-sans text-[18px] leading-relaxed text-concrete"
          >
            Specialty καφές, fresh bowls και θέα στη λίμνη — στον 1ο όροφο του ΚΕΠΑΒΙ, Ιωάννινα.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="inline-block"
            >
              <Link
                href="#menu"
                className="inline-block rounded-full bg-mustard px-8 py-4 font-sans text-sm font-medium text-charcoal transition-colors hover:bg-amber"
              >
                Δες το menu
              </Link>
            </motion.div>

            <motion.a
              href="#contact"
              variants={{ rest: {}, hover: {} }}
              initial="rest"
              whileHover="hover"
              className="relative inline-block font-sans text-sm font-medium text-charcoal"
            >
              <span className="relative z-10">Βρες μας</span>
              <motion.span
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-olive"
              />
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right: looping hero video (poster = interior photo while video loads) ── */}
        <div className="col-span-12 mt-8 md:col-span-6 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="relative ml-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[4px] bg-[#eee7dc]"
          >
            <HeroVideo />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-10 left-6 z-10 flex items-start gap-3 md:bottom-12 md:left-12">
        <span className="pt-1 font-sans text-[11px] uppercase tracking-[0.2em] text-concrete">
          SCROLL
        </span>
        <div className="relative h-[60px] w-px overflow-visible bg-line">
          <motion.div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-olive"
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: EASE }}
          />
        </div>
      </div>
    </section>
  )
}
