import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(l: Lenis | null) {
  instance = l
}

export function getLenis() {
  return instance
}

/** Smooth-scroll to an element by id. Routes through Lenis when active, else native. */
export function scrollToId(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  if (instance) {
    // Recompute scroll limits first: on a cold load the hero video + lazy images
    // grow the page after Lenis cached its dimensions, so the first scrollTo would
    // otherwise clamp to a stale limit and land short. `force` scrolls even if Lenis
    // is momentarily stopped/locked. Offset clears the fixed header.
    instance.resize()
    instance.scrollTo(el, { offset: -90, force: true })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return true
}
