/**
 * Placeholder remote images (Unsplash). Swap for local `/public` assets when ready.
 * Used by sections that opt into this map — hero may still use `/images/*` until migrated.
 */
export const images = {
  heroInterior:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&auto=format&fit=crop',
  heroCup:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop',
  heroBowl:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80&auto=format&fit=crop',
  menu1:
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80&auto=format&fit=crop',
  menu2:
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80&auto=format&fit=crop',
  menu3:
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80&auto=format&fit=crop',
  menu4:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop',
  menu5:
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop',
  menu6:
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&q=80&auto=format&fit=crop',
  gallery1:
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1000&q=80&auto=format&fit=crop',
  gallery2:
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80&auto=format&fit=crop',
  gallery3:
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&q=80&auto=format&fit=crop',
  gallery4:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop',
  gallery5:
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80&auto=format&fit=crop',
  gallery6:
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80&auto=format&fit=crop',
  gallery7:
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80&auto=format&fit=crop',
  gallery8:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&auto=format&fit=crop',
  aboutInterior:
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80&auto=format&fit=crop',
  aboutBar:
    'https://images.unsplash.com/photo-1559305616-3f99cd43e932?w=900&q=80&auto=format&fit=crop',
  aboutStairs:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop',
  aboutPlants:
    'https://images.unsplash.com/photo-1463947628408-f8581a2f4aca?w=900&q=80&auto=format&fit=crop',
  menu7:
    'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80&auto=format&fit=crop',
} as const

export type ImageKey = keyof typeof images
