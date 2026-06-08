'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

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

// Bushy `fern` stays dominant (~45%) — it's the multi-leaf cluster that builds
// the continuous wall of foliage and keeps the frame dense. The four new hi-res
// single leaves (split-leaf-1/2, monstera-vine, monstera-upright) are sprinkled
// in as accents for variety; the wispy `fan-palm` is kept out of the border (it
// punches gaps) and lives only as a faint watermark. All share LEAF_FILTER, so
// the bright cutouts get crushed to the same dark forest green and read cohesive.
const POOL = [
  'fern',
  'split-leaf-1',
  'fern',
  'monstera-3',
  'fern',
  'leaf-cluster-border',
  'fern',
  'monstera-vine',
  'fern',
  'monstera-3',
  'split-leaf-2',
  'fern',
  'monstera-upright',
  'leaf-cluster-border',
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
  { key: 'wm0', name: 'monstera-upright', w: 768, rot: -12, flip: false, opacity: 0.14, pos: { top: '11%', left: '34%', width: '440px' } },
  { key: 'wm1', name: 'fan-palm', w: 768, rot: 9, flip: true, opacity: 0.12, pos: { top: '37%', left: '40%', width: '380px' } },
  { key: 'wm2', name: 'leaf-cluster-border', w: 768, rot: 0, flip: false, opacity: 0.12, pos: { top: '62%', left: '30%', width: '520px' } },
  { key: 'wm3', name: 'split-leaf-2', w: 768, rot: 14, flip: true, opacity: 0.13, pos: { top: '88%', left: '44%', width: '420px' } },
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
      animated: i % 12 === 0,
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
  // Border leaves render at 130–340px of dark, filtered decorative foliage —
  // w480 is plenty even on retina and ~halves decoded texture memory vs w768
  // (168 leaves at w768 was exhausting GPU memory → pixelation + jank).
  const v = 'w480'
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

/**
 * Dense forest-leaf border framing the host section. Leaves are packed two
 * layers deep around all four edges and sit *behind* the section content.
 *
 * Perf: every leaf is STATIC (no scroll-linked parallax, no infinite sway). The
 * reveal is a single fire-once fade/settle when the border enters view — after
 * it finishes, Framer drops will-change and the whole leaf layer de-promotes to
 * an ordinary painted layer that scrolls for free. The old version kept the big
 * image-dense layer GPU-promoted and churning every frame, which tanked the
 * scroll right at the philosophy→actions hand-off.
 *
 * Render as the first child inside a `position: relative` section, and give the
 * content wrapper a higher stacking order (e.g. `relative z-10`).
 */
/**
 * Live scroll progress for an element, read from its getBoundingClientRect on
 * each scroll frame (rAF-throttled, idle at rest) + a ResizeObserver on <body>.
 * Deliberately NOT framer's useScroll: that caches the target's offset on mount
 * and only re-measures on resize, so the images lazy-loading ABOVE this section
 * shift its position and leave the progress permanently ~0.3 ahead. This reads
 * the live rect, so it stays accurate. 0 ≈ section top at viewport bottom,
 * 1 ≈ section top reaching the top of the viewport.
 */
function useRectProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const measure = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const p = (vh - r.top) / (vh * 0.95)
      progress.set(Math.min(1, Math.max(0, p)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [progress])
  return { ref, progress }
}

export function ScrollLeaves({ leaves = PHILOSOPHY_LEAVES }: { leaves?: Leaf[] }) {
  const reduce = useReducedMotion() ?? false
  const { ref, progress } = useRectProgress()

  // Leaves materialise progressively across the scroll-in instead of one fire-once
  // fade — the canopy grows denser as you scroll deeper into the section.
  const opacity = useTransform(progress, [0.18, 0.78], [0, 1])
  const scale = useTransform(progress, [0.18, 0.78], [1.08, 1])
  const y = useTransform(progress, [0.18, 0.78], [26, 0])
  // GPU-promote only while the reveal is actually in motion; de-promote once
  // fully shown so the image-dense layer scrolls for free afterward.
  const willChange = useTransform(progress, (p) =>
    p > 0.001 && p < 0.999 ? 'opacity, transform' : 'auto',
  )

  const content = (
    <>
      {WATERMARKS.map((wm) => (
        <WatermarkLeaf key={wm.key} leaf={wm} />
      ))}
      {leaves.map((leaf) => (
        <StaticLeaf key={leaf.key} leaf={leaf} />
      ))}
    </>
  )

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {reduce ? (
        <div className="absolute inset-0">{content}</div>
      ) : (
        <m.div
          className="absolute inset-0"
          style={{ opacity, scale, y, willChange, transformOrigin: 'center' }}
        >
          {content}
        </m.div>
      )}
    </div>
  )
}
