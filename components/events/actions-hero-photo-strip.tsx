'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import cafeStripPhoto from '../../public/images/gallery-1.jpg'

export default function ActionsHeroPhotoStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const allowParallax = prefersReducedMotion === false

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    allowParallax ? [-14, 14] : [0, 0],
  )

  return (
    <div
      ref={containerRef}
      className="relative h-[100px] w-full overflow-hidden md:h-[120px]"
      aria-hidden
    >
      <motion.div
        className="absolute inset-x-0 -top-[18%] bottom-[-18%] will-change-transform"
        style={{ y: imageY }}
      >
        <Image
          src={cafeStripPhoto}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-bone/40" />
    </div>
  )
}
