/**
 * Image map — local files from /public/images/.
 */
export const images = {
  heroInterior: '/images/hero-interior.jpg',
  aboutInterior: '/images/about-1.jpg',
  aboutBar: '/images/about-2.jpg',
  aboutPlants: '/images/about-4.jpg',
  new1: '/images/111/mess-internal-0007.jpg',
  new2: '/images/111/mess-internal-0006.jpg',
  messPhilosophyPoster: '/images/mess-philosophy-poster.jpg',
} as const

export type ImageKey = keyof typeof images

export function imagePlaceholder() {
  return 'linear-gradient(135deg, var(--color-bone-warm), var(--color-bone), var(--color-bone-warm))'
}
