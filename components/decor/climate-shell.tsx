'use client'

import { useRef, type ReactNode } from 'react'
import { m, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useIsMobile } from '@/lib/use-is-mobile'

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
  /** When false, inner chrome omits overflow-hidden so position:sticky works in children. */
  contentClipping?: boolean
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
  contentClipping = true,
  children,
}: ClimateShellProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // Only run the infinite particle loops while this shell is on-screen. With 3
  // shells × `particleCount` particles, the framer keyframe loops otherwise tick
  // on the main thread for the whole page regardless of scroll position.
  const inView = useInView(ref, { margin: '0px 0px -5% 0px' })
  // Particles are infinite main-thread keyframe loops — skipped on phones.
  const isMobile = useIsMobile()
  const exit = bgExit ?? bgEnter

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Color crossfade as COMPOSITED opacity, not an animated background-color.
  // Animating `background` repaints the whole section every scroll frame — and
  // because the 168-leaf border is a painted (un-promoted) layer it repaints
  // WITH the section, which is the lag felt on ENTERING and LEAVING philosophy
  // (the color only moves in those zones; the middle is constant → smooth).
  // Two solid color layers fading by opacity over the static peak color give the
  // identical ramp for free: opacity-blend of A over B == linear interp A↔B.
  const enterOpacity = useTransform(scrollYProgress, [0, 0.02, 0.12], [1, 1, 0])
  const exitOpacity = useTransform(scrollYProgress, [0.86, 0.96, 1], [0, 1, 1])
  // Promote a fading layer only while it is actually mid-crossfade.
  const enterWillChange = useTransform(scrollYProgress, (v) => (v < 0.16 ? 'opacity' : 'auto'))
  const exitWillChange = useTransform(scrollYProgress, (v) => (v > 0.82 ? 'opacity' : 'auto'))

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
  // The card inset + radius are static (animating margin = per-frame layout of
  // the whole leaf subtree). The card itself is transparent — the section's
  // (static) peak color + the two crossfade layers show through it.
  const chromeStyle = reduce
    ? staticBg
    : {
        margin: '14px',
        borderRadius: '28px',
      }

  return (
    <m.section
      ref={ref}
      id={id}
      className={`scroll-mt-28 relative ${className ?? ''}`}
      style={staticBg}
    >
      {!reduce && (
        <>
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: bgEnter, opacity: enterOpacity, willChange: enterWillChange }}
          />
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: exit, opacity: exitOpacity, willChange: exitWillChange }}
          />
        </>
      )}
      <m.div
        className={`relative z-10 isolate border-t border-line/30${contentClipping ? ' overflow-hidden' : ''}`}
        style={chrome ? chromeStyle : reduce ? staticBg : undefined}
      >
        {chrome && (
          <m.div
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-30 rounded-[inherit] ring-1 ${ringClassName}`}
            style={reduce ? { opacity: 0 } : { opacity: ringOpacity }}
          />
        )}

        {vignette && (
          <m.div
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

        {!reduce && !isMobile && particles !== 'none' && inView && (
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[6]"
            style={{ opacity: particleOpacity }}
          >
            {Array.from({ length: particleCount }).map((_, i) => (
              <FloatingParticle key={i} index={i} variant={particles} />
            ))}
          </m.div>
        )}

        <div className="relative z-20 px-6 py-20 md:px-12 md:py-24">{children}</div>
      </m.div>
    </m.section>
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
      <m.span
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
      <m.span
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
    <m.span
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
