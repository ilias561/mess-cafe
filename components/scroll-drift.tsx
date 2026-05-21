'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

type ScrollDriftProps = {
  children: ReactNode
  className?: string
  /** Total vertical travel in px across the element's pass through the viewport. */
  distance?: number
}

/** Subtle scroll-linked vertical drift — element rises gently as it scrolls through view. */
export default function ScrollDrift({ children, className, distance = 40 }: ScrollDriftProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
