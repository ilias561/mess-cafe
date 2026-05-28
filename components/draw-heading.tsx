'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '@/lib/motion'

type DrawHeadingProps = {
  children: ReactNode
  className?: string
}

export default function DrawHeading({ children, className }: DrawHeadingProps) {
  const reduce = useReducedMotion()

  return (
    <div className={className}>
      {children}
      <svg className="mt-2 h-3 w-full overflow-visible" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M1 5.5 H99"
          stroke="rgb(226 160 46 / 0.7)"
          strokeWidth="1.5"
          fill="none"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={reduce ? undefined : { duration: 0.9, ease: ease.outStrong }}
        />
      </svg>
    </div>
  )
}
