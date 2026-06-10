export type VenueImage = {
  src: string
  alt: string
}

export type VenueSpace = {
  id: 'hall-1' | 'corridor' | 'hall-2' | 'loft'
  name: string
  description: string
  // 'room' spaces are bookable and carry a capacity line; the 'link' space is
  // the semi-outdoor corridor that sits between the two rooms.
  kind: 'room' | 'link'
  images: VenueImage[]
}

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: 'hall-1',
    name: 'Αίθουσα 1',
    description: 'Αίθουσα για workshops, παρουσιάσεις και ιδιωτικά events.',
    kind: 'room',
    images: [
      {
        src: '/images/111/mess-internal-0002.jpg',
        alt: 'Αίθουσα 1 — ο πάγκος self service, ψηλά τραπέζια και φυτά',
      },
      {
        src: '/images/111/mess-internal-0015.jpg',
        alt: 'Αίθουσα 1 — το καθιστικό και η σκάλα, πλαισιωμένα από φυτά',
      },
    ],
  },
  {
    id: 'corridor',
    name: 'Ο διάδρομος',
    description: 'Ανάμεσα στις δύο αίθουσες, ο ημιυπαίθριος διάδρομος — τραπεζάκια και θέα προς τη λίμνη.',
    kind: 'link',
    images: [
      {
        src: '/images/111/mess-internal-0020.jpg',
        alt: 'Ο ημιυπαίθριος διάδρομος ανάμεσα στις δύο αίθουσες, με τραπεζάκια',
      },
    ],
  },
  {
    id: 'hall-2',
    name: 'Αίθουσα 2',
    description: 'Δεύτερη αίθουσα — ευέλικτη διάταξη για μικρότερες ομάδες.',
    kind: 'room',
    images: [
      {
        src: '/images/111/mess-internal-0018.jpg',
        alt: 'Αίθουσα 2 — κίτρινα τραπέζια σε διάταξη ομάδων και έργα τέχνης στον τοίχο',
      },
      {
        src: '/images/111/mess-internal-0019.jpg',
        alt: 'Αίθουσα 2 — τραπέζια και πάγκος στο παράθυρο με θέα στη λίμνη',
      },
    ],
  },
  {
    id: 'loft',
    name: 'Πατάρι',
    description: 'Πατάρι για events με ξεχωριστή ατμόσφαιρα, πάνω από την κύρια αίθουσα.',
    kind: 'room',
    images: [
      {
        src: '/images/111/mess-internal-0008.jpg',
        alt: 'Το πατάρι — μακρύς πάγκος με σκαμπό και κίτρινα τραπέζια',
      },
      {
        src: '/images/111/mess-internal-0010.jpg',
        alt: 'Το πατάρι — η ταμπέλα «Keep Rising» ανάμεσα σε φοίνικες',
      },
    ],
  },
]
