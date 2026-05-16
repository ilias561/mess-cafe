'use client'

import { useEffect, useRef } from 'react'
import type { ImageProps } from 'next/image'
import { FadeImage } from '@/components/fade-image'

/** Passes `alt` through to FadeImage — caller must supply descriptive or decorative alt. */
export default function ParallaxImage(props: Omit<ImageProps, 'ref'>) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    let rafId = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const progress = 1 - rect.bottom / (window.innerHeight + rect.height)
      el.style.transform = `translateY(${(progress - 0.5) * 16}%)`
    }
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-full w-full will-change-transform">
      <FadeImage {...props} className={`h-full w-full object-cover ${props.className ?? ''}`} />
    </div>
  )
}
