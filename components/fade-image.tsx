'use client'

import Image, { type ImageProps } from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState, type CSSProperties, type SyntheticEvent } from 'react'
import { duration as d, ease } from '@/lib/motion'

const DEFAULT_SKELETON = 'color-mix(in srgb, var(--color-espresso) 8%, transparent)'

export type FadeImageProps = Omit<ImageProps, 'onLoadingComplete'> & {
  /** Background while loading — warm neutral aligned with brand tokens */
  skeleton?: string
  /** Descriptive Greek alt from the caller, or alt="" when decorative. */
  alt: string
}

export function FadeImage({ skeleton = DEFAULT_SKELETON, ...props }: FadeImageProps) {
  const reduceMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const {
    style: imageStyle,
    className,
    onLoad,
    fill,
    priority,
    loading,
    decoding,
    ...imgRest
  } = props
  const isFill = Boolean(fill)
  const resolvedLoading = priority ? 'eager' : (loading ?? 'lazy')
  const resolvedDecoding = decoding ?? 'async'

  useEffect(() => {
    if (reduceMotion) setLoaded(true)
  }, [reduceMotion])

  const handleLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true)
    onLoad?.(e)
  }

  const spanStyle: CSSProperties = {
    position: isFill ? 'absolute' : 'relative',
    inset: isFill ? 0 : undefined,
    width: isFill ? '100%' : undefined,
    height: isFill ? '100%' : undefined,
    display: 'block',
    backgroundColor: skeleton,
    overflow: 'hidden',
    minHeight: 0,
  }

  const mergedImageStyle: CSSProperties = {
    ...(imageStyle && typeof imageStyle === 'object' ? imageStyle : {}),
    opacity: loaded ? 1 : 0,
    transition: `opacity ${d.slow}s cubic-bezier(${ease.out.join(',')})`,
  }

  return (
    <span style={spanStyle} className={isFill ? 'min-h-0' : 'h-full w-full'}>
      <Image
        {...imgRest}
        fill={fill}
        priority={priority}
        loading={resolvedLoading}
        decoding={resolvedDecoding}
        className={className}
        style={mergedImageStyle}
        onLoad={handleLoad}
      />
    </span>
  )
}
