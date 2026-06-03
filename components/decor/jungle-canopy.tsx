'use client'

import { motion, type MotionValue, useReducedMotion, useTransform } from 'framer-motion'
import type { CSSProperties } from 'react'

/* ════════════════════════════════════════════════════════════════════════════
   JUNGLE CANOPY — Botanical picture frame (individual leaves, 4 clusters)
   ────────────────────────────────────────────────────────────────────────────
   4 EdgeCluster motion.div elements slide in from each card edge.
   Individual leaves inside each cluster use CSS animations for sway.
   Images have black bg → mix-blend-mode:screen + boosted brightness reveals
   only the green leaf content against the dark card.
   Natural image proportions preserved — no objectFit letterboxing.
   ════════════════════════════════════════════════════════════════════════════ */

const SRC = {
  cluster: '/images/leaves/monstera-cluster.png',
  large1:  '/images/leaves/monstera-large-1.png',
  large2:  '/images/leaves/monstera-large-2.png',
  full:    '/images/leaves/monstera-full.png',
  palm:    '/images/leaves/fan-palm.png',
} as const

type LeafKey  = keyof typeof SRC
type ClipSide = 'top' | 'bottom' | 'left' | 'right'

// ─── Leaf definition ──────────────────────────────────────────────────────────

type Leaf = {
  src:     LeafKey
  // Position WITHIN the cluster strip (percentage of cluster dimensions):
  //   top/bottom clusters → 'along' = left%,  size = width%
  //   left/right  clusters → 'along' = top%,  size = height%  (width is always 100%)
  along:   string
  // For top/bottom: explicit width. For left/right: height (auto means natural AR).
  size?:   string
  flipH?:  boolean
  flipV?:  boolean
  rotate?: number
  bright?: number   // base 1.8 (boosted so screen-blended leaves are clearly visible)
  anim:    string   // CSS keyframe name
  dur:     number
  delay:   number
}

// ─── EdgeCluster ─────────────────────────────────────────────────────────────

function EdgeCluster({
  scrollYProgress, side, depth, leaves,
}: {
  scrollYProgress: MotionValue<number>
  side: ClipSide
  depth: string
  leaves: Leaf[]
}) {
  const isV  = side === 'top' || side === 'bottom'
  const sign = (side === 'top' || side === 'left') ? '-' : ''
  const from = `${sign}130%`

  const travel  = useTransform(scrollYProgress, [0.01, 0.20, 0.85, 0.96], [from, '0%', '0%', from])
  const opacity = useTransform(scrollYProgress, [0.01, 0.20, 0.85, 0.96], [0, 1, 1, 0])

  const strip: CSSProperties = {
    position: 'absolute',
    zIndex: 8,
    overflow: 'hidden',
    pointerEvents: 'none',
    ...(side === 'left'   ? { left: 0,    top: 0, bottom: 0, width:  depth } : {}),
    ...(side === 'right'  ? { right: 0,   top: 0, bottom: 0, width:  depth } : {}),
    ...(side === 'top'    ? { top: 0,   left: 0, right: 0, height: depth } : {}),
    ...(side === 'bottom' ? { bottom: 0, left: 0, right: 0, height: depth } : {}),
  }

  const origin = side === 'left' ? 'left center'
               : side === 'right' ? 'right center'
               : side === 'top' ? 'top center'
               : 'bottom center'

  return (
    <motion.div
      aria-hidden
      className="will-change-transform"
      style={{ ...strip, opacity, ...(isV ? { y: travel } : { x: travel }) }}
    >
      {leaves.map((lf, i) => {
        const xform: string[] = []
        if (lf.rotate) xform.push(`rotate(${lf.rotate}deg)`)
        if (lf.flipH)  xform.push('scaleX(-1)')
        if (lf.flipV)  xform.push('scaleY(-1)')

        // For top/bottom clusters: positioned by left%, sized by width
        // For left/right clusters: positioned by top%, img is 100% wide, natural height
        const wrapStyle: CSSProperties = isV
          ? { position: 'absolute', left: lf.along, top: 0, bottom: 0, width: lf.size ?? 'auto' }
          : { position: 'absolute', top: lf.along,  left: 0, right: 0,  height: lf.size ?? 'auto' }

        // Image fills the wrapper naturally (no letterboxing)
        const imgStyle: CSSProperties = isV
          ? { display: 'block', height: '100%', width: 'auto', maxWidth: '200%' }
          : { display: 'block', width: '100%',  height: 'auto', maxHeight: '50vh' }

        return (
          <div
            key={i}
            style={{
              ...wrapStyle,
              overflow: 'hidden',
              transformOrigin: origin,
              transform: xform.length ? xform.join(' ') : undefined,
              animation: `${lf.anim} ${lf.dur}s ease-in-out ${lf.delay}s infinite`,
            }}
          >
            <img
              src={SRC[lf.src]}
              alt=""
              draggable={false}
              loading="lazy"
              style={{
                ...imgStyle,
                mixBlendMode: 'screen',
                // High brightness so the screen-blended leaf is clearly visible
                // on the dark forest card background (#18391a).
                // Black bg pixels → transparent via screen. Green leaf → boosted green.
                filter: `brightness(${lf.bright ?? 1.8}) saturate(1.2)`,
              }}
            />
          </div>
        )
      })}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// LEAF SLOT TABLES — matching the botanical frame reference:
// Dense overlapping leaves, stems at card edge, tips pointing inward.
// ═══════════════════════════════════════════════════════════════════════════

// TOP strip (height: 30%). flipV → stem at top, leaf tip hangs DOWN toward content.
// 'along' = left%; 'size' = width% of the cluster.
const TOP: Leaf[] = [
  { src:'large2', along:'-3%',  size:'32%', flipV:true,             anim:'leafSwayT', dur:16, delay:0.0 },
  { src:'cluster',along:'6%',   size:'26%', flipV:true,             anim:'leafSwayT', dur:13, delay:1.3 },
  { src:'palm',   along:'16%',  size:'22%',                         anim:'leafSwayT', dur:18, delay:0.6 },
  { src:'full',   along:'24%',  size:'20%', flipV:true,             anim:'leafSwayT', dur:15, delay:2.1 },
  { src:'large2', along:'32%',  size:'22%', flipV:true, flipH:true, anim:'leafSwayT', dur:12, delay:0.9 },
  { src:'cluster',along:'42%',  size:'22%', flipV:true,             anim:'leafSwayT', dur:17, delay:1.7 },
  { src:'full',   along:'51%',  size:'20%', flipV:true, flipH:true, anim:'leafSwayT', dur:14, delay:0.4 },
  { src:'palm',   along:'59%',  size:'22%',             flipH:true, anim:'leafSwayT', dur:19, delay:2.4 },
  { src:'cluster',along:'68%',  size:'26%', flipV:true, flipH:true, anim:'leafSwayT', dur:13, delay:1.1 },
  { src:'large1', along:'77%',  size:'32%', flipV:true, flipH:true, anim:'leafSwayT', dur:16, delay:0.5 },
  // Depth layer — slightly darker, fills corners tightly
  { src:'full',   along:'3%',   size:'18%', flipV:true,  bright:1.3, anim:'leafSwayT', dur:20, delay:3.5 },
  { src:'palm',   along:'45%',  size:'18%',              bright:1.3, anim:'leafSwayT', dur:22, delay:4.1 },
  { src:'large2', along:'73%',  size:'18%', flipV:true,  bright:1.3, anim:'leafSwayT', dur:21, delay:3.8 },
]

// BOTTOM strip. Natural orientation: stem at bottom (card edge), tip UP toward content.
const BOTTOM: Leaf[] = [
  { src:'large2', along:'-3%',  size:'32%',             anim:'leafSwayB', dur:15, delay:0.3 },
  { src:'cluster',along:'6%',   size:'26%',             anim:'leafSwayB', dur:12, delay:1.5 },
  { src:'full',   along:'16%',  size:'22%',             anim:'leafSwayB', dur:17, delay:0.7 },
  { src:'full',   along:'24%',  size:'20%', flipH:true, anim:'leafSwayB', dur:14, delay:2.2 },
  { src:'large2', along:'32%',  size:'22%', flipH:true, anim:'leafSwayB', dur:13, delay:0.8 },
  { src:'cluster',along:'42%',  size:'22%', flipH:true, anim:'leafSwayB', dur:16, delay:1.9 },
  { src:'full',   along:'51%',  size:'20%',             anim:'leafSwayB', dur:18, delay:0.5 },
  { src:'full',   along:'59%',  size:'22%', flipH:true, anim:'leafSwayB', dur:14, delay:2.6 },
  { src:'cluster',along:'68%',  size:'26%',             anim:'leafSwayB', dur:13, delay:1.2 },
  { src:'large1', along:'77%',  size:'32%', flipH:true, anim:'leafSwayB', dur:15, delay:0.6 },
  // Depth layer
  { src:'full',   along:'3%',   size:'18%', bright:1.3, anim:'leafSwayB', dur:21, delay:3.6 },
  { src:'large2', along:'45%',  size:'18%', bright:1.3, anim:'leafSwayB', dur:23, delay:4.3 },
  { src:'full',   along:'73%',  size:'18%', bright:1.3, anim:'leafSwayB', dur:20, delay:3.9 },
]

// LEFT strip (width: 26%). 'along' = top%, 'size' = NOT used (img is width:100%, height:auto).
// Leaves extend rightward (their natural shape fans toward the content).
const LEFT: Leaf[] = [
  { src:'large2', along:'-3%',  anim:'leafSwayL', dur:15, delay:0.0 },
  { src:'cluster',along:'13%',  anim:'leafSwayL', dur:12, delay:1.4 },
  { src:'full',   along:'28%',  anim:'leafSwayL', dur:16, delay:0.7 },
  { src:'palm',   along:'43%',  anim:'leafSwayL', dur:13, delay:2.0 },
  { src:'large2', along:'56%',  anim:'leafSwayL', dur:17, delay:1.0 },
  { src:'cluster',along:'70%',  anim:'leafSwayL', dur:14, delay:2.5 },
  { src:'full',   along:'83%',  anim:'leafSwayL', dur:15, delay:0.4 },
  // Depth layer
  { src:'palm',   along:'5%',   bright:1.3, anim:'leafSwayL', dur:19, delay:3.5 },
  { src:'cluster',along:'48%',  bright:1.3, anim:'leafSwayL', dur:21, delay:4.0 },
  { src:'large2', along:'78%',  bright:1.3, anim:'leafSwayL', dur:20, delay:3.3 },
]

// RIGHT strip. flipH on all leaves so tips point LEFT toward content.
const RIGHT: Leaf[] = [
  { src:'large1', along:'-3%',  flipH:true, anim:'leafSwayR', dur:16, delay:0.4 },
  { src:'cluster',along:'13%',  flipH:true, anim:'leafSwayR', dur:13, delay:1.7 },
  { src:'full',   along:'28%',  flipH:true, anim:'leafSwayR', dur:17, delay:0.6 },
  { src:'palm',   along:'43%',  flipH:true, anim:'leafSwayR', dur:14, delay:2.3 },
  { src:'large1', along:'56%',  flipH:true, anim:'leafSwayR', dur:15, delay:1.1 },
  { src:'cluster',along:'70%',  flipH:true, anim:'leafSwayR', dur:12, delay:2.7 },
  { src:'full',   along:'83%',  flipH:true, anim:'leafSwayR', dur:16, delay:0.5 },
  // Depth layer
  { src:'palm',   along:'5%',   flipH:true, bright:1.3, anim:'leafSwayR', dur:20, delay:3.8 },
  { src:'cluster',along:'48%',  flipH:true, bright:1.3, anim:'leafSwayR', dur:22, delay:4.2 },
  { src:'large1', along:'78%',  flipH:true, bright:1.3, anim:'leafSwayR', dur:19, delay:3.5 },
]

// ─── Export ───────────────────────────────────────────────────────────────────

export type JungleCanopyProps = { scrollYProgress: MotionValue<number> }

export default function JungleCanopy({ scrollYProgress }: JungleCanopyProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <>
      <EdgeCluster scrollYProgress={scrollYProgress} side="top"    depth="30%" leaves={TOP}    />
      <EdgeCluster scrollYProgress={scrollYProgress} side="bottom" depth="30%" leaves={BOTTOM} />
      <EdgeCluster scrollYProgress={scrollYProgress} side="left"   depth="26%" leaves={LEFT}   />
      <EdgeCluster scrollYProgress={scrollYProgress} side="right"  depth="26%" leaves={RIGHT}  />
    </>
  )
}
