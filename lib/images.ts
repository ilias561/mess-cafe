/**
 * Image map — local files from /public/images/.
 * menu7 (chocolate cake) keeps Unsplash until a local photo is supplied.
 */
export const images = {
  // Hero
  heroInterior: '/images/hero-interior.jpg',
  heroCup:      '/images/hero-coffee.jpg',
  heroBowl:     '/images/hero-bowl.jpg',

  // Menu cards
  menu1: '/images/menu-poke-teriyaki.jpg',
  menu2: '/images/menu-acai.jpg',
  menu3: '/images/menu-avocado-toast.jpg',
  menu4: '/images/menu-vegan-poke.jpg',
  menu5: '/images/menu-freddo.jpg',
  menu6: '/images/menu-smoothie.jpg',
  // No local photo for chocolate cake yet — swap when ready
  menu7: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80&auto=format&fit=crop',

  /** Raw exports — used on gallery desktop grid (lg+) and lightbox when wide */
  galleryDesktopFood35: '/images/raw/gallery-food-35.png',
  /** Source file was INTERNAL-0028; overwrite `mess-internal-0027-1.png` if you export 0027. */
  galleryDesktopInterior0027: '/images/raw/mess-internal-0027-1.png',
  /** Desktop raw — green doors / plants (about ΦΥΤΑ & ΦΩΣ still) */
  aboutPlantsLight: '/images/raw/about-plants-light.png',
  /** Alias for editorial still; same file as aboutPlantsLight for now */
  aboutMomentsStill: '/images/raw/about-plants-light.png',
  /** START NOW / workspace moment (optional swaps) */
  aboutSpaceStart: '/images/raw/about-space-start.png',

  // Gallery
  gallery1: '/images/gallery-1.jpg',
  gallery2: '/images/gallery-2.jpg',
  gallery3: '/images/gallery-3.jpg',
  gallery4: '/images/gallery-4.jpg',
  gallery5: '/images/gallery-5.jpg',
  gallery6: '/images/gallery-6.jpg',
  gallery7: '/images/gallery-7.jpg',
  gallery8: '/images/gallery-8.jpg',

  // About / space photos
  aboutInterior: '/images/about-1.jpg',
  aboutBar:      '/images/about-2.jpg',
  aboutStairs:   '/images/about-3.jpg',
  aboutPlants:   '/images/about-4.jpg',
  new1:          '/images/111/mess-internal-0007.jpg',
  new2:          '/images/111/mess-internal-0006.jpg',
  menuNew1:      '/images/111/mess-internal-0009.jpg',
  menuNew2:      '/images/111/mess-internal-0016.jpg',
} as const

export type ImageKey = keyof typeof images

export function imagePlaceholder() {
  return 'linear-gradient(135deg, var(--color-bone-warm), var(--color-bone), var(--color-bone-warm))'
}
