'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { reveal, revealTransition, VIEWPORT_ONCE } from '@/lib/motion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export default function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={reveal}
      transition={{ ...revealTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
