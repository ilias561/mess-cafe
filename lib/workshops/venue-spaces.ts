export type VenueSpace = {
  id: 'hall-1' | 'hall-2' | 'loft'
  name: string
  description: string
  imageSrc: string
  imageAlt: string
}

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: 'hall-1',
    name: 'Αίθουσα 1',
    description: 'Αίθουσα για workshops, παρουσιάσεις και ιδιωτικά events.',
    imageSrc: '/images/111/mess-internal-0014.jpg',
    imageAlt: 'Αίθουσα 1 — μεγάλο ξύλινο τραπέζι και οθόνη για παρουσιάσεις',
  },
  {
    id: 'hall-2',
    name: 'Αίθουσα 2',
    description: 'Δεύτερη αίθουσα — ευέλικτη διάταξη για μικρότερες ομάδες.',
    imageSrc: '/images/111/mess-internal-0002.jpg',
    imageAlt: 'Αίθουσα 2 — ευέλικτη διάταξη με κίτρινα τραπέζια και φυτά',
  },
  {
    id: 'loft',
    name: 'Πατάρι',
    description: 'Πατάρι για events με ξεχωριστή ατμόσφαιρα.',
    imageSrc: '/images/111/mess-internal-0015.jpg',
    imageAlt: 'Το πατάρι και η σκάλα του, πάνω από την κύρια αίθουσα',
  },
]
