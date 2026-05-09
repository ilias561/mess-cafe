'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import {
  reveal,
  revealTransition,
  revealGroupVariants,
  VIEWPORT_ONCE,
} from '@/lib/motion'

type RevealProps = HTMLMotionProps<'div'> & {
  /** stagger children that are themselves <Reveal.Item> (defaults: false) */
  asGroup?: boolean
  /** stagger gap in seconds */
  gap?: number
  /** initial delay before this reveal starts */
  delay?: number
}

function RevealItem({ children, ...rest }: HTMLMotionProps<'div'>) {
  const reduce = useReducedMotion()
  if (reduce) return <div {...(rest as ComponentPropsWithoutRef<'div'>)}>{children as ReactNode}</div>
  return (
    <motion.div variants={reveal} transition={revealTransition} {...rest}>
      {children as ReactNode}
    </motion.div>
  )
}

const RevealRoot = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { asGroup, gap = 0.08, delay = 0, children, ...rest },
  ref,
) {
  const reduce = useReducedMotion()
  if (reduce) return <div ref={ref} {...(rest as ComponentPropsWithoutRef<'div'>)}>{children as ReactNode}</div>
  const parentVariants = asGroup ? revealGroupVariants(gap, delay) : reveal
  const transition = asGroup ? undefined : { ...revealTransition, delay }
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={parentVariants}
      transition={transition}
      {...rest}
    >
      {children as ReactNode}
    </motion.div>
  )
})

RevealRoot.displayName = 'Reveal'

export const Reveal = Object.assign(RevealRoot, { Item: RevealItem }) as typeof RevealRoot & {
  Item: typeof RevealItem
}
