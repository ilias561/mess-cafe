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
    instance.scrollTo(el, { offset: 0 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return true
}
