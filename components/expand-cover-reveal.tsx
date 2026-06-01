'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FadeImage } from '@/components/fade-image'

/**
 * Scroll cover-reveal at the philosophy → actions seam: the café photo enters
 * framed (espresso matte, like the philosophy tiles) against philosophy's exit
 * green, scales up to full-bleed as you scroll, holds, then the next section
 * ({children}) rises and covers it.
 *
 * Performance contract (this effect previously caused scroll lag — keep it lean):
 *  - ONE responsive image (FadeImage → small AVIF via the manifest)
 *  - ONE GPU transform (scale); `will-change` is gated to the active scale window
 *    only, so the full-screen layer is NOT pinned in VRAM across the whole zone
 *  - no leaves / blur / mix-blend / per-frame layout
 *  - the pin is bounded to a fixed zone, so the full-screen photo stops
 *    compositing the instant the hand-off is done and the next section scrolls clean
 *
 * Lives OUTSIDE the ClimateShell cards on purpose — those clip with
 * `overflow-hidden`, which would break `position: sticky`.
 */
const PIN_VH = 300 // hold + bloom + cover, in vh
const COVER_VH = 100 // how much the next section overlaps to do the covering

export default function ExpandCoverReveal({
  src,
  alt,
  background = '#2d5a27',
  children,
}: {
  src: string
  alt: string
  background?: string
  children: ReactNode
}) {
  const pinRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [factor, setFactor] = useState(1)

  useEffect(() => {
    if (reduce) return
    const measure = () => {
      const el = boxRef.current
      if (!el) return
      const w = el.offsetWidth
      if (!w) return
      // Slight overscan past the edge so the clip leaves no sliver.
      setFactor(Math.max(1, (window.innerWidth + 4) / w))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [reduce])

  // Progress across the bounded pin zone: 0 = photo pins centered + framed,
  // ~0.5 = full-bleed and the next section begins covering, 1 = covered + the
  // photo unpins (out of view, no longer composited).
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0.12, 0.4], [1, factor])
  const frameOpacity = useTransform(scrollYProgress, [0.12, 0.33], [1, 0])
  // Promote the full-screen photo only while it is actually scaling. Across the
  // rest of the pin it is static (held framed, or full-bleed + being covered),
  // so keeping will-change on would pin a full-viewport layer in VRAM the whole
  // time — the old source of boundary lag.
  const willChange = useTransform(scrollYProgress, (v) =>
    v > 0.08 && v < 0.45 ? 'transform' : 'auto',
  )

  if (reduce) {
    // No pin/scroll effect — just the framed photo, then the section.
    return (
      <div style={{ background }}>
        <div className="flex justify-center px-6 py-16 md:px-12">
          <div className="relative aspect-[16/9] w-full max-w-[1180px] overflow-hidden ring-1 ring-ink-dark/20">
            <FadeImage src={src} alt={alt} fill sizes="100vw" className="object-cover" />
          </div>
        </div>
        <div>{children}</div>
      </div>
    )
  }

  return (
    <div className="relative" style={{ background }}>
      <div ref={pinRef} className="relative" style={{ height: `${PIN_VH}vh` }}>
        <div className="sticky top-0 z-0 flex h-screen items-center justify-center overflow-hidden px-6 md:px-12">
          <m.div
            ref={boxRef}
            className="relative aspect-[16/9] w-full max-w-[1180px] origin-center overflow-hidden"
            style={{ scale, willChange }}
          >
            <FadeImage src={src} alt={alt} fill sizes="100vw" className="object-cover" />
            {/* Espresso matte + hairline, matching the philosophy tiles; fades
                out as the photo goes full-bleed. */}
            <m.span
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-ink-dark/20 shadow-[0_30px_64px_-20px_rgba(6,16,5,0.7)]"
              style={{ opacity: frameOpacity }}
            >
              <span className="absolute inset-0 border-[6px] border-espresso md:border-8" />
              <span className="absolute inset-[6px] border border-mustard/30 md:inset-2" />
            </m.span>
          </m.div>
        </div>
      </div>

      {/* Pulled up to overlap the tail of the pin zone — this is the cover. */}
      <div className="relative z-10" style={{ marginTop: `-${COVER_VH}vh` }}>
        {children}
      </div>
    </div>
  )
}
