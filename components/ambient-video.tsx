'use client'

import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '@/lib/use-is-mobile'

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
  // Defer ALL video fetching until the IntersectionObserver below calls play()
  // (play() forces the load). preload stays "none" on every device: useIsMobile
  // is false during SSR, so `isMobile ? 'none' : 'metadata'` shipped
  // preload="metadata" in the initial HTML on EVERY device — phones included —
  // and the client flip to "none" lands too late to stop the browser issuing a
  // metadata range request per clip at load, contending with the hero on the
  // ~13 Mbps link. isMobile only tunes the IO margins below — desktop still
  // buffers 400px early via the play() call, so nothing regresses there.
  const isMobile = useIsMobile()

  const activeSrc = playlist ? playlist[index] : (src ?? '')

  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Skip on very slow connections to avoid visible buffering
    const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection
    if (conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g') return

    // Desktop: start buffering 400px early. Phones: wait until the clip is
    // genuinely on screen — these are MB-scale files, and fetching them ahead
    // of the viewport starves the section photos on slow mobile connections
    // (images sat on their blur placeholders while the videos downloaded).
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
      isMobile
        ? { threshold: 0.15, rootMargin: '0px' }
        : { threshold: 0, rootMargin: '400px 0px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [isMobile])

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
      preload="none"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      style={style}
    />
  )
}
