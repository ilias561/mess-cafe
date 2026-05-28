'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType } from 'react'
import { VIEWPORT_ONCE, ease } from '@/lib/motion'

type SplitTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  stagger?: number
  delay?: number
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const wordVariants = {
  hidden: { y: '100%' },
  visible: { y: '0%' },
}

export default function SplitText({
  text,
  as = 'p',
  className,
  stagger = 0.04,
  delay = 0,
}: SplitTextProps) {
  const reduce = useReducedMotion()
  const words = text.split(/\s+/).filter(Boolean)
  const Tag = as as ElementType

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={containerVariants}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={wordVariants}
              transition={{ duration: 0.7, ease: ease.outStrong }}
              className="inline-block"
            >
              {word}
              {index < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
