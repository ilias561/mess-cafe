'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { m, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import {
  directionalReveal,
  revealTransition,
  revealGroupVariants,
  VIEWPORT_ONCE,
  type RevealDirection,
} from '@/lib/motion'

type RevealProps = HTMLMotionProps<'div'> & {
  /** stagger children that are themselves <Reveal.Item> (defaults: false) */
  asGroup?: boolean
  /** stagger gap in seconds */
  gap?: number
  /** initial delay before this reveal starts */
  delay?: number
  /** entrance direction (default 'up') */
  direction?: RevealDirection
}

type RevealItemProps = HTMLMotionProps<'div'> & {
  /** entrance direction (default 'up') */
  direction?: RevealDirection
}

function RevealItem({ children, direction = 'up', ...rest }: RevealItemProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div {...(rest as ComponentPropsWithoutRef<'div'>)}>{children as ReactNode}</div>
  return (
    <m.div variants={directionalReveal[direction]} transition={revealTransition} {...rest}>
      {children as ReactNode}
    </m.div>
  )
}

const RevealRoot = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { asGroup, gap = 0.08, delay = 0, direction = 'up', children, ...rest },
  ref,
) {
  const reduce = useReducedMotion()
  if (reduce) return <div ref={ref} {...(rest as ComponentPropsWithoutRef<'div'>)}>{children as ReactNode}</div>
  const parentVariants = asGroup ? revealGroupVariants(gap, delay) : directionalReveal[direction]
  const transition = asGroup ? undefined : { ...revealTransition, delay }
  return (
    <m.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={parentVariants}
      transition={transition}
      {...rest}
    >
      {children as ReactNode}
    </m.div>
  )
})

RevealRoot.displayName = 'Reveal'

export const Reveal = Object.assign(RevealRoot, { Item: RevealItem }) as typeof RevealRoot & {
  Item: typeof RevealItem
}
