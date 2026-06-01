'use client'

import { useRef, type CSSProperties } from 'react'
import {
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

type Leaf = {
  key: string
  /** PNG/AVIF/WebP base name in /images/decor/photo (without extension). */
  name: string
  /** Static placement (top/left/right/bottom/width). */
  pos: CSSProperties
  /** Rendered width in px (drives which responsive variant to fetch). */
  w: number
  /** Base rotation in degrees. */
  rot: number
  /** Vertical parallax amplitude in px. */
  par: number
  /** Mirror horizontally. */
  flip: boolean
  opacity: number
  /** Idle-sway timing. */
  swayDur: number
  swayDelay: number
  /** Only a subset parallax-drift (keeps animated element count in check). */
  animated: boolean
}

// Dark-green, solid leaves only — the colourful teal vine (monstera-1) and the
// pale wispy line-art frond (palm-cluster) are dropped.
// SWAP-IN POINT: when the real dark leaf PNGs land, replace these names.
const POOL = [
  'monstera-3',
  'fern',
  'monstera-3',
  'fern',
  'leaf-cluster-border',
  'fern',
]

// Crush to a dark forest green and steer any stray warm/cool casts toward green.
// (When real dark assets are supplied, dial this back toward brightness(0.85).)
const LEAF_FILTER =
  'brightness(0.42) saturate(1.45) contrast(1.08) hue-rotate(-8deg) drop-shadow(0 10px 16px rgba(0,0,0,0.45))'

// Big, faint background leaves — a slightly *lighter* tonal whisper so they read
// as a watermark against the dark-green bg rather than vanishing into it.
const WATERMARK_FILTER =
  'brightness(1.3) saturate(0.6) contrast(0.9) hue-rotate(-8deg)'

// A few large, well-placed ghosts that sit furthest back and blend into the
// green. Positioned in the section's open bg gaps (not behind the photos).
const WATERMARKS = [
  { key: 'wm0', name: 'monstera-3', w: 768, rot: -12, flip: false, opacity: 0.14, pos: { top: '11%', left: '34%', width: '440px' } },
  { key: 'wm1', name: 'fern', w: 768, rot: 9, flip: true, opacity: 0.13, pos: { top: '37%', left: '40%', width: '360px' } },
  { key: 'wm2', name: 'leaf-cluster-border', w: 768, rot: 0, flip: false, opacity: 0.12, pos: { top: '62%', left: '30%', width: '520px' } },
  { key: 'wm3', name: 'monstera-3', w: 768, rot: 14, flip: true, opacity: 0.13, pos: { top: '88%', left: '44%', width: '420px' } },
] as const

// Deterministic pseudo-random in [0,1) from an integer hash. Integer ops are
// bit-identical across JS engines (unlike Math.sin), so SSR and client agree
// and React doesn't flag a hydration mismatch.
function rand(i: number, salt: number) {
  let h = (i * 374761393 + salt * 668265263) | 0
  h = (Math.imul(h ^ (h >>> 13), 1274126177)) | 0
  h ^= h >>> 16
  return (h >>> 0) % 100000 / 100000
}
const round = (n: number, dp = 2) => {
  const f = 10 ** dp
  return Math.round(n * f) / f
}
const pick = (r: number) => POOL[Math.floor(r * POOL.length) % POOL.length]

// Pack a dense, overlapping leaf border around the whole section — two
// overlapping layers down both side edges and across top/bottom, tight step.
function buildLeaves(): Leaf[] {
  const leaves: Leaf[] = []
  let i = 0
  const push = (l: Omit<Leaf, 'key' | 'animated' | 'swayDur' | 'swayDelay'>) => {
    leaves.push({
      ...l,
      key: `k${i}`,
      animated: i % 4 === 0,
      swayDur: round(5.5 + rand(i, 9) * 4),
      swayDelay: round(-rand(i, 10) * 6),
    })
    i++
  }

  // side columns, two overlapping layers (front dense, back deeper-bleed)
  for (const edge of ['l', 'r'] as const) {
    for (let layer = 0; layer < 2; layer++) {
      for (let p = -4 + layer * 2.5; p <= 102; p += 4.5) {
        const r1 = rand(i, 1)
        const r2 = rand(i, 2)
        const r3 = rand(i, 3)
        const r4 = rand(i, 4)
        const w = (layer === 0 ? 170 : 130) + Math.round(r1 * 170)
        const bleed = -((layer === 0 ? 4 : 40) + Math.round(r2 * 70))
        push({
          name: pick(r1),
          w,
          pos:
            edge === 'l'
              ? { top: `${p}%`, left: `${bleed}px`, width: `${w}px` }
              : { top: `${p}%`, right: `${bleed}px`, width: `${w}px` },
          rot: round(r3 * 54 - 27, 1),
          par: 40 + Math.round(r2 * 110),
          flip: edge === 'r' ? r4 > 0.5 : r4 < 0.5,
          opacity: round((layer === 0 ? 0.92 : 0.82) + r3 * 0.08),
        })
      }
    }
  }

  // top & bottom rows, two overlapping layers
  for (const edge of ['t', 'b'] as const) {
    for (let layer = 0; layer < 2; layer++) {
      for (let p = -3 + layer * 3; p <= 103; p += 6) {
        const r1 = rand(i, 5)
        const r2 = rand(i, 6)
        const r3 = rand(i, 7)
        const r4 = rand(i, 4)
        const w = (layer === 0 ? 170 : 130) + Math.round(r1 * 170)
        const bleed = -((layer === 0 ? 6 : 46) + Math.round(r2 * 60))
        push({
          name: pick(r2),
          w,
          pos:
            edge === 't'
              ? { top: `${bleed}px`, left: `${p}%`, width: `${w}px` }
              : { bottom: `${bleed}px`, left: `${p}%`, width: `${w}px` },
          rot: round(r3 * 54 - 27, 1),
          par: 40 + Math.round(r1 * 100),
          flip: r4 > 0.5,
          opacity: round((layer === 0 ? 0.92 : 0.82) + r3 * 0.08),
        })
      }
    }
  }

  return leaves
}

const PHILOSOPHY_LEAVES = buildLeaves()

function LeafImg({
  name,
  w,
  filter = LEAF_FILTER,
}: {
  name: string
  w: number
  filter?: string
}) {
  const base = `/images/decor/photo/${name}`
  const v = w <= 230 ? 'w480' : 'w768'
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}--${v}.avif`} />
      <source type="image/webp" srcSet={`${base}--${v}.webp`} />
      <img
        src={`${base}.png`}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ filter }}
        className="block h-auto w-full select-none"
      />
    </picture>
  )
}

// Large faint background ghost — static, lowest layer, blends into the bg.
function WatermarkLeaf({ leaf }: { leaf: (typeof WATERMARKS)[number] }) {
  return (
    <div
      className="absolute"
      style={{
        ...leaf.pos,
        transform: `rotate(${leaf.rot}deg) scaleX(${leaf.flip ? -1 : 1})`,
        opacity: leaf.opacity,
      }}
    >
      <LeafImg name={leaf.name} w={leaf.w} filter={WATERMARK_FILTER} />
    </div>
  )
}

// Inner breeze layer — CSS keyframe so it stays cheap across ~150 leaves.
function Sway({ leaf }: { leaf: Leaf }) {
  return (
    <div
      className="leaf-sway"
      style={{ animationDuration: `${leaf.swayDur}s`, animationDelay: `${leaf.swayDelay}s` }}
    >
      <LeafImg name={leaf.name} w={leaf.w} />
    </div>
  )
}

// Truly static — no animation, no compositor layer. The bulk of the border.
function StaticLeaf({ leaf }: { leaf: Leaf }) {
  return (
    <div
      className="absolute"
      style={{
        ...leaf.pos,
        transform: `rotate(${leaf.rot}deg) scaleX(${leaf.flip ? -1 : 1})`,
      }}
    >
      <LeafImg name={leaf.name} w={leaf.w} />
    </div>
  )
}

function AnimatedLeaf({
  leaf,
  progress,
}: {
  leaf: Leaf
  progress: MotionValue<number>
}) {
  const y = useTransform(progress, [0, 1], [leaf.par, -leaf.par])
  const rotate = useTransform(progress, [0, 1], [leaf.rot - 4, leaf.rot + 4])

  return (
    <div className="absolute" style={leaf.pos}>
      <m.div style={{ y, rotate, scaleX: leaf.flip ? -1 : 1 }}>
        <Sway leaf={leaf} />
      </m.div>
    </div>
  )
}

/**
 * Dense forest-leaf border framing the host section. Leaves are packed two
 * layers deep around all four edges (overlapping like the beverage-menu cover),
 * scroll with the page, and sit *behind* the section content. Each leaf has an
 * idle CSS sway; a subset additionally parallax-drift for depth. Reduced motion
 * stops both.
 *
 * Render as the first child inside a `position: relative` section, and give the
 * content wrapper a higher stacking order (e.g. `relative z-10`).
 */
export function ScrollLeaves({ leaves = PHILOSOPHY_LEAVES }: { leaves?: Leaf[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false

  // Parallax progress (whole time the section is on screen).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Reveal progress tracks the section *entering* the viewport: 0 when its top is
  // at the bottom of the screen, 1 when its top reaches the top. The bloom is
  // mapped to a short window centred on the section top crossing mid-screen — so
  // the section first appears as plain green, then the foliage snaps into focus
  // as you cross the previous→this boundary.
  const { scrollYProgress: reveal } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const W: [number, number] = [0.42, 0.72]
  const revOpacity = useTransform(reveal, W, [0, 1])
  const revScale = useTransform(reveal, W, [1.08, 1])
  const revY = useTransform(reveal, W, [22, 0])
  const revBlurPx = useTransform(reveal, W, [10, 0])
  const revFilter = useMotionTemplate`blur(${revBlurPx}px)`

  const content = (
    <>
      {WATERMARKS.map((wm) => (
        <WatermarkLeaf key={wm.key} leaf={wm} />
      ))}
      {leaves.map((leaf) =>
        reduce || !leaf.animated ? (
          <StaticLeaf key={leaf.key} leaf={leaf} />
        ) : (
          <AnimatedLeaf key={leaf.key} leaf={leaf} progress={scrollYProgress} />
        ),
      )}
    </>
  )

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      {reduce ? (
        <div className="absolute inset-0">{content}</div>
      ) : (
        <m.div
          className="absolute inset-0"
          style={{
            opacity: revOpacity,
            scale: revScale,
            y: revY,
            filter: revFilter,
            transformOrigin: 'center',
          }}
        >
          {content}
        </m.div>
      )}
    </div>
  )
}
