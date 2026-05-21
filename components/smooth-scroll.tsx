'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import { setLenis } from '@/lib/lenis'

export default function SmoothScroll() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
