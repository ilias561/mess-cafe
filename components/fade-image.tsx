'use client'

import Image, { type ImageProps } from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from 'react'
import { duration as d, ease } from '@/lib/motion'
import { getImageManifestEntry } from '@/lib/image-manifest'

const DEFAULT_SKELETON = 'color-mix(in srgb, var(--color-espresso) 8%, transparent)'

export type FadeImageProps = Omit<ImageProps, 'onLoadingComplete'> & {
  /** Background while loading — warm neutral aligned with brand tokens */
  skeleton?: string
  /** Descriptive Greek alt from the caller, or alt="" when decorative. */
  alt: string
}

export function FadeImage({ skeleton = DEFAULT_SKELETON, ...props }: FadeImageProps) {
  const reduceMotion = useReducedMotion()
  const imgRef = useRef<HTMLImageElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  // The load event can fire before hydration attaches onLoad (native lazy
  // loading prefetches far ahead), leaving the image stuck at opacity 0.
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) setImageLoaded(true)
  }, [])

  // Native lazy loading fires too late on iOS mid-scroll — images visibly pop
  // in after they're already on screen. Flip to eager once the image is within
  // ~1.5 viewports so it's fetched and decoded before the user reaches it.
  const [nearView, setNearView] = useState(false)
  useEffect(() => {
    const img = imgRef.current
    if (!img || nearView) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearView(true)
      },
      { rootMargin: '150% 0px' },
    )
    io.observe(img)
    return () => io.disconnect()
  }, [nearView])
  const loaded = reduceMotion === true || imageLoaded
  const {
    style: imageStyle,
    className,
    onLoad,
    fill,
    priority,
    loading,
    decoding,
    sizes,
    src,
    width,
    height,
    unoptimized: _unoptimized,
    ...imgRest
  } = props
  const isFill = Boolean(fill)
  const resolvedLoading = priority || nearView ? 'eager' : (loading ?? 'lazy')
  const resolvedDecoding = decoding ?? 'async'
  const srcKey = typeof src === 'string' ? src : undefined
  const manifest = srcKey ? getImageManifestEntry(srcKey) : undefined
  const resolvedSizes = sizes ?? (isFill ? '100vw' : undefined)

  const handleLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoaded(true)
    onLoad?.(e)
  }

  const spanStyle: CSSProperties = {
    position: isFill ? 'absolute' : 'relative',
    inset: isFill ? 0 : undefined,
    width: isFill ? '100%' : undefined,
    height: isFill ? '100%' : undefined,
    display: 'block',
    backgroundColor: skeleton,
    backgroundImage: !loaded && manifest?.blurDataURL ? `url(${manifest.blurDataURL})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    minHeight: 0,
  }

  const mergedImageStyle: CSSProperties = {
    ...(imageStyle && typeof imageStyle === 'object' ? imageStyle : {}),
    opacity: loaded ? 1 : 0,
    transition:
      reduceMotion === true
        ? undefined
        : `opacity ${d.slow}s cubic-bezier(${ease.out.join(',')})`,
  }

  const imgClassName = [
    className,
    isFill ? 'h-full w-full object-cover' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (manifest && srcKey) {
    return (
      <span style={spanStyle} className={isFill ? 'min-h-0' : 'h-full w-full'}>
        <picture className={isFill ? 'absolute inset-0 block h-full w-full' : 'block h-full w-full'}>
          {manifest.avifSrcSet ? (
            <source type="image/avif" srcSet={manifest.avifSrcSet} sizes={resolvedSizes} />
          ) : null}
          {manifest.webpSrcSet ? (
            <source type="image/webp" srcSet={manifest.webpSrcSet} sizes={resolvedSizes} />
          ) : null}
          <img
            ref={imgRef}
            src={srcKey}
            alt={props.alt}
            width={isFill ? undefined : (width ?? manifest.width)}
            height={isFill ? undefined : (height ?? manifest.height)}
            loading={resolvedLoading}
            decoding={resolvedDecoding}
            fetchPriority={priority ? 'high' : undefined}
            className={
              isFill
                ? `${imgClassName} absolute inset-0 h-full w-full object-cover`
                : imgClassName
            }
            style={mergedImageStyle}
            onLoad={handleLoad}
          />
        </picture>
      </span>
    )
  }

  return (
    <span style={spanStyle} className={isFill ? 'min-h-0' : 'h-full w-full'}>
      <Image
        {...imgRest}
        ref={imgRef}
        alt={props.alt}
        src={src}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading={resolvedLoading}
        decoding={resolvedDecoding}
        sizes={sizes}
        className={className}
        style={mergedImageStyle}
        onLoad={handleLoad}
      />
    </span>
  )
}
