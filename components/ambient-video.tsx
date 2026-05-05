'use client'

import { useEffect, useRef, useState } from 'react'

interface AmbientVideoProps {
  /** Single src — loops forever */
  src?: string
  /** Multiple srcs — plays each in order, then cycles back */
  srcs?: string[]
  className?: string
  poster?: string
  ariaLabel?: string
  ariaHidden?: boolean
  style?: React.CSSProperties
}

export default function AmbientVideo({ src, srcs, className, poster, ariaLabel, ariaHidden, style }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const playlist = srcs && srcs.length > 1 ? srcs : null
  const [index, setIndex] = useState(0)

  const activeSrc = playlist ? playlist[index] : (src ?? '')

  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Skip on very slow connections to avoid visible buffering
    const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection
    if (conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') return

    // rootMargin fires 400px before the video enters the viewport,
    // giving the browser time to buffer before the user reaches it
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0, rootMargin: '400px 0px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  // Advance playlist when a video ends
  useEffect(() => {
    if (!playlist) return
    const video = ref.current
    if (!video) return

    const onEnded = () => setIndex((i) => (i + 1) % playlist.length)
    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [playlist])

  // When index changes, reload and play the next src
  useEffect(() => {
    if (!playlist) return
    const video = ref.current
    if (!video) return
    video.load()
    video.play().catch(() => {})
  }, [index, playlist])

  return (
    <video
      ref={ref}
      src={activeSrc}
      poster={poster}
      muted
      loop={!playlist}
      playsInline
      preload="metadata"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      style={style}
    />
  )
}
