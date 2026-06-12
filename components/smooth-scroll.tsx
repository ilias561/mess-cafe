'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import { setLenis } from '@/lib/lenis'

export default function SmoothScroll() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    // Touch devices scroll natively — Lenis only smooths wheel input, so on
    // phones/tablets it's a permanent rAF loop with zero visible benefit.
    if (window.matchMedia('(hover: none)').matches) return

    // lerp (frame-rate-independent catch-up) instead of a fixed 1.1s duration:
    // duration-based smoothing replays every wheel tick over 1.1s, which reads
    // as whole-page input lag on every machine even while FPS stays at 60.
    // lerp 0.1 keeps the parallax buttery but makes the wheel feel direct.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    setLenis(lenis)

    let rafId = 0
    const loop = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduceMotion])

  return null
}
