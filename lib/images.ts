/**
 * Image map — local files from /public/images/.
 */
export const images = {
  heroInterior: '/images/hero-interior.jpg',
  // 820w q7 re-cut of about-1.jpg — it only serves as a <video poster>, which
  // can't pick responsive variants, and the 708KB original throttled phones.
  aboutInterior: '/images/about-editorial-poster.jpg',
  aboutBar: '/images/about-2.jpg',
  aboutPlants: '/images/gallery-1.jpg',
  philosophyBright: '/images/111/mess-internal-0004.jpg',
  philosophyStairs: '/images/111/mess-internal-0005.jpg',
  philosophyCounter: '/images/111/mess-internal-0023.jpg',
  philosophyHall: '/images/111/mess-internal-0018.jpg',
  messPhilosophyPoster: '/images/mess-philosophy-poster.jpg',
} as const

export type ImageKey = keyof typeof images

export function imagePlaceholder() {
  return 'linear-gradient(135deg, var(--color-bone-warm), var(--color-bone), var(--color-bone-warm))'
}
