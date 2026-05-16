'use client'

/**
 * Sitewide image/video numbering overlay for client review.
 *
 * Enable by visiting any URL with `?review=1` (e.g. https://site/?review=1).
 * The flag persists across navigation via sessionStorage, so subsequent
 * page changes keep showing numbers without re-adding the query param.
 *
 * To disable: visit any URL with `?review=0`, or close the browser tab.
 *
 * Numbers are assigned in document order top-to-bottom, recomputed on
 * scroll/resize/DOM mutation, and rendered into a single fixed overlay
 * div so no host component has to know about them.
 */

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mess_review_mode_v1'

type Badge = {
  number: number
  top: number
  left: number
}

function isInteractiveMedia(el: HTMLElement): boolean {
  // Skip hidden / 0-size elements (offscreen poster swaps, etc.)
  const rect = el.getBoundingClientRect()
  if (rect.width < 32 || rect.height < 32) return false
  const style = window.getComputedStyle(el)
  if (style.visibility === 'hidden' || style.display === 'none') return false
  if (Number(style.opacity) === 0) return false
  return true
}

export default function ReviewOverlay() {
  const [active, setActive] = useState(false)
  const [badges, setBadges] = useState<Badge[]>([])

  // Read URL flag once on mount, persist via sessionStorage.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('review')
    if (fromUrl === '1') {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setActive(true)
    } else if (fromUrl === '0') {
      sessionStorage.removeItem(STORAGE_KEY)
      setActive(false)
    } else if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      setActive(true)
    }
  }, [])

  useEffect(() => {
    if (!active) {
      setBadges([])
      return
    }

    let rafId = 0
    const recompute = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>('img, video'),
        ).filter(isInteractiveMedia)

        const next: Badge[] = elements.map((el, i) => {
          const rect = el.getBoundingClientRect()
          return {
            number: i + 1,
            top: rect.top + window.scrollY + 8,
            left: rect.left + window.scrollX + rect.width - 36,
          }
        })

        setBadges(next)
      })
    }

    recompute()
    const onScroll = () => recompute()
    const onResize = () => recompute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // Watch for new images (lazy-loaded, lightbox, route change, etc.)
    const observer = new MutationObserver(recompute)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'poster', 'style', 'class'],
    })

    // Recompute periodically too — images that finish loading don't always
    // trigger a mutation we can listen for.
    const interval = window.setInterval(recompute, 1500)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      window.clearInterval(interval)
    }
  }, [active])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 2147483646,
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          position: 'fixed',
          left: 12,
          bottom: 12,
          padding: '8px 12px',
          borderRadius: 999,
          background: 'rgba(28,28,28,0.92)',
          color: '#fff',
          font: '500 12px/1.2 ui-sans-serif, system-ui, sans-serif',
          letterSpacing: 0.4,
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          pointerEvents: 'auto',
          zIndex: 2147483647,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <span>Review mode · {badges.length} εικόνες</span>
        <a
          href={`${typeof window !== 'undefined' ? window.location.pathname : ''}?review=0`}
          style={{
            color: '#e8b547',
            textDecoration: 'none',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          Έξοδος
        </a>
      </div>

      {/* Badges */}
      {badges.map((b) => (
        <div
          key={`${b.number}-${b.top}-${b.left}`}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#e8b547',
            color: '#1c1c1c',
            font: '600 13px/28px ui-sans-serif, system-ui, sans-serif',
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.85)',
            pointerEvents: 'none',
          }}
        >
          {b.number}
        </div>
      ))}
    </div>
  )
}
