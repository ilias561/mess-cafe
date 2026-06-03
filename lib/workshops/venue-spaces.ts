export type VenueSpace = {
  id: 'hall-1' | 'hall-2' | 'loft'
  name: string
  description: string
  /** Placeholder until owner confirms photo ↔ room mapping */
  imageSrc: string
  imageAlt: string
}

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: 'hall-1',
    name: 'Αίθουσα 1',
    description: 'Αίθουσα για workshops, παρουσιάσεις και ιδιωτικά events.',
    imageSrc: '/images/about-1.jpg',
    imageAlt: 'M.E.S.S. — εσωτερικός χώρος (ανάθεση φωτογραφίας σε εξέλιξη)',
  },
  {
    id: 'hall-2',
    name: 'Αίθουσα 2',
    description: 'Δεύτερη αίθουσα — ευέλικτη διάταξη για μικρότερες ομάδες.',
    imageSrc: '/images/about-2.jpg',
    imageAlt: 'M.E.S.S. — εσωτερικός χώρος (ανάθεση φωτογραφίας σε εξέλιξη)',
  },
  {
    id: 'loft',
    name: 'Πατάρι',
    description: 'Πατάρι για events με ξεχωριστή ατμόσφαιρα.',
    imageSrc: '/images/111/mess-internal-0006.jpg',
    imageAlt: 'M.E.S.S. — πατάρι (ανάθεση φωτογραφίας σε εξέλιξη)',
  },
]
