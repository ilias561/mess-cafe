'use client'

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

type CountUpProps = {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({ to, suffix = '', duration = 1.2, className }: CountUpProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const value = useMotionValue(0)
  const rounded = useTransform(value, (latest) => `${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (reduce || !inView) return
    const controls = animate(value, to, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [duration, inView, reduce, to, value])

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {to}
        {suffix}
      </span>
    )
  }

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>
}
