'use client'

import { useEffect, useRef } from 'react'
import Image, { type ImageProps } from 'next/image'

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
    <div ref={wrapRef} className="h-full w-full will-change-transform">
      <Image {...props} className={`h-full w-full object-cover ${props.className ?? ''}`} />
    </div>
  )
}
