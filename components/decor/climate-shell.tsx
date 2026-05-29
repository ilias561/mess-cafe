'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export type ClimateParticleVariant = 'mustard' | 'dust' | 'shimmer' | 'none'

export type ClimateShellProps = {
  id: string
  className?: string
  bgEnter: string
  bgPeak: string
  bgExit?: string
  chrome?: boolean
  vignette?: boolean
  particles?: ClimateParticleVariant
  particleCount?: number
  ringClassName?: string
  vignetteAlpha?: number
  children: ReactNode
}

export function ClimateShell({
  id,
  className,
  bgEnter,
  bgPeak,
  bgExit,
  chrome = true,
  vignette = true,
  particles = 'mustard',
  particleCount = 8,
  ringClassName = 'ring-mustard/35',
  vignetteAlpha = 0.55,
  children,
}: ClimateShellProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const exit = bgExit ?? bgEnter

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bg = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 0.86, 0.96, 1],
    [bgEnter, bgEnter, bgPeak, bgPeak, exit, exit],
  )

  const cardInset = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 0.86, 0.96, 1],
    ['0px', '0px', '14px', '14px', '0px', '0px'],
  )
  const cardRadius = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 0.86, 0.96, 1],
    ['0px', '0px', '28px', '28px', '0px', '0px'],
  )
  const ringOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.14, 0.84, 0.94, 1],
    [0, 0, 1, 1, 0, 0],
  )
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.14, 0.84, 0.94, 1],
    [0, 0, 1, 1, 0, 0],
  )
  const particleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0, 1, 1, 0, 0],
  )

  const staticBg = { background: bgPeak }
  const chromeStyle = reduce
    ? staticBg
    : {
        background: bg,
        marginLeft: cardInset,
        marginRight: cardInset,
        marginTop: cardInset,
        marginBottom: cardInset,
        borderRadius: cardRadius,
      }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`scroll-mt-28 relative ${className ?? ''}`}
      style={reduce ? staticBg : { background: bg }}
    >
      <motion.div
        className="relative isolate overflow-hidden border-t border-line/30"
        style={chrome ? chromeStyle : reduce ? staticBg : { background: bg }}
      >
        {chrome && (
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-30 rounded-[inherit] ring-1 ${ringClassName}`}
            style={reduce ? { opacity: 0 } : { opacity: ringOpacity }}
          />
        )}

        {vignette && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit]"
            style={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: vignetteOpacity,
                    background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${vignetteAlpha}) 100%)`,
                  }
            }
          />
        )}

        {!reduce && particles !== 'none' && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[6]"
            style={{ opacity: particleOpacity }}
          >
            {Array.from({ length: particleCount }).map((_, i) => (
              <FloatingParticle key={i} index={i} variant={particles} />
            ))}
          </motion.div>
        )}

        <div className="relative z-20 px-6 py-20 md:px-12 md:py-28">{children}</div>
      </motion.div>
    </motion.section>
  )
}

function FloatingParticle({
  index,
  variant,
}: {
  index: number
  variant: Exclude<ClimateParticleVariant, 'none'>
}) {
  const left = `${(index * 37) % 100}%`
  const startTop = `${80 + ((index * 13) % 20)}%`
  const size = 2 + (index % 3)
  const delay = (index * 0.7) % 4

  if (variant === 'dust') {
    const duration = 14 + (index % 6)
    return (
      <motion.span
        className="absolute block rounded-full bg-bone/40"
        style={{ left, top: startTop, width: size, height: size }}
        animate={{
          y: [0, -180, -360],
          opacity: [0, 1, 0],
          x: [0, 12, -8],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      />
    )
  }

  if (variant === 'shimmer') {
    const duration = 10 + (index % 6)
    return (
      <motion.span
        className="absolute block rounded-full bg-white/30"
        style={{ left, top: startTop, width: size, height: size }}
        animate={{
          y: [0, -300, -600],
          opacity: [0, 1, 0],
          x: [0, 18, -10],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      />
    )
  }

  const duration = 10 + (index % 6)
  return (
    <motion.span
      className="absolute block rounded-full bg-mustard/60"
      style={{ left, top: startTop, width: size, height: size }}
      animate={{
        y: [0, -300, -600],
        opacity: [0, 1, 0],
        x: [0, 12, -8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    />
  )
}
