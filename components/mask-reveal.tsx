'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { duration, ease, VIEWPORT_ONCE } from '@/lib/motion'

type MaskRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export default function MaskReveal({ children, className, delay = 0 }: MaskRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  )
}
