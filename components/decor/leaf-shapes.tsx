'use client'

import type { CSSProperties } from 'react'

type LeafProps = {
  className?: string
  style?: CSSProperties
  /** Kept for backwards compat — no longer used (PNGs have their own colors) */
  color?: string
  /** 0–1 */
  opacity?: number
}

const ASSET = {
  palm: '/images/decor/photo/palm-frond.png',
  palmCluster: '/images/decor/photo/palm-cluster.png',
  monstera: '/images/decor/photo/monstera-1.png',
  monsteraTall: '/images/decor/photo/monstera-2.png',
  monsteraWide: '/images/decor/photo/monstera-3.png',
  banana: '/images/decor/photo/banana-leaf.png',
  fern: '/images/decor/photo/fern.png',
  border: '/images/decor/photo/leaf-cluster-border.png',
} as const

function PhotoLeaf({
  src,
  alt,
  className,
  style,
  opacity = 1,
}: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  opacity?: number
}) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden
      draggable={false}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        ...style,
        opacity,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        userSelect: 'none',
      }}
    />
  )
}

export function PalmFrond({ className, style, opacity }: LeafProps) {
  return <PhotoLeaf src={ASSET.palm} alt="" className={className} style={style} opacity={opacity} />
}

export function MonsteraLeaf({ className, style, opacity }: LeafProps) {
  return <PhotoLeaf src={ASSET.monstera} alt="" className={className} style={style} opacity={opacity} />
}

export function FernSprig({ className, style, opacity }: LeafProps) {
  return <PhotoLeaf src={ASSET.fern} alt="" className={className} style={style} opacity={opacity} />
}

/** Tall multi-leaf monstera plant — good for big top/edge accents */
export function MonsteraTall({ className, style, opacity }: LeafProps) {
  return <PhotoLeaf src={ASSET.monsteraTall} alt="" className={className} style={style} opacity={opacity} />
}

/** Sago/cycad palm cluster — wider than the single frond, good for bottom rising */
export function PalmCluster({ className, style, opacity }: LeafProps) {
  return <PhotoLeaf src={ASSET.palmCluster} alt="" className={className} style={style} opacity={opacity} />
}

/** Wide banana leaf — bold single-shape accent */
export function BananaLeaf({ className, style, opacity }: LeafProps) {
  return <PhotoLeaf src={ASSET.banana} alt="" className={className} style={style} opacity={opacity} />
}

/** Horizontal leaf cluster — rotate 90deg for a vertical side-strip canopy edge */
export function LeafBorderStrip({ className, style, opacity }: LeafProps) {
  return <PhotoLeaf src={ASSET.border} alt="" className={className} style={style} opacity={opacity} />
}
