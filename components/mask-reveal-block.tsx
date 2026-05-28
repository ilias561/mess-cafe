'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { VIEWPORT_ONCE, ease, maskWipe, maskWipeLeft } from '@/lib/motion'

type MaskRevealBlockProps = {
  children: ReactNode
  direction?: 'up' | 'left'
  delay?: number
  className?: string
}

export default function MaskRevealBlock({ children, direction = 'up', delay = 0, className }: MaskRevealBlockProps) {
  const reduce = useReducedMotion()
  const variants = direction === 'left' ? maskWipeLeft : maskWipe

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      transition={{ duration: 0.8, ease: ease.outStrong, delay }}
    >
      {children}
    </motion.div>
  )
}
