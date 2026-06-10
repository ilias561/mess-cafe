'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'

// Scroll-driven Ken Burns tile for the venue gallery — same recipe as the
// philosophy spread, without the dark espresso frame (this page is light).
export default function VenueTile({
  src,
  alt,
  aspect,
  sizes,
}: {
  src: string
  alt: string
  aspect: string
  sizes: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // will-change only while near the viewport — an unconditional one keeps every
  // tile GPU-promoted (in VRAM) even when scrolled far away.
  const inView = useInView(ref, { margin: '200px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.18])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  return (
    <figure ref={ref} className="group">
      <div className={`relative w-full overflow-hidden ring-1 ring-line/40 ${aspect}`}>
        <m.div
          className="absolute inset-0"
          style={reduce ? undefined : { scale, y, willChange: inView ? 'transform' : 'auto' }}
        >
          <FadeImage
            src={src}
            alt={alt}
            fill
            loading="lazy"
            sizes={sizes}
            className="ui-img-hover"
          />
        </m.div>
      </div>
    </figure>
  )
}
