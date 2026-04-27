import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type EventCategory = 'workshop' | 'music' | 'culture' | 'collaboration'

export type Event = {
  slug: string
  title: string
  description: string
  category: EventCategory
  categoryLabel: string
  coverImage: string
  coverAlt: string
  coverObjectPosition?: string
  date: string
  endDate?: string
  location: string
  price?: string
  capacity?: number
  body: string
  featured?: boolean
}

const CATEGORY_LABELS: Record<EventCategory, string> = {
  workshop: 'Workshop',
  music: 'Μουσική',
  culture: 'Πολιτισμός',
  collaboration: 'Συνεργασία',
}

const EVENTS_DIR = path.join(process.cwd(), 'content/events')

export function getAllEvents(): Event[] {
  if (!fs.existsSync(EVENTS_DIR)) return []

  const files = fs.readdirSync(EVENTS_DIR).filter((file) => file.endsWith('.md'))
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(EVENTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const category = (data.category as EventCategory | undefined) ?? 'collaboration'
    const slug = (data.slug as string | undefined) ?? file.replace(/\.md$/, '')
    const date = (data.date as string | undefined) ?? (data.startsAt as string | undefined) ?? ''
    const endDate = (data.endDate as string | undefined) ?? (data.endsAt as string | undefined)
    const description = (data.description as string | undefined) ?? (data.excerpt as string | undefined) ?? ''

    return {
      ...data,
      slug,
      category,
      description,
      date,
      endDate,
      body: content.trim(),
      location: (data.location as string | undefined) || 'M.E.S.S. — ΚΕΠΑΒΙ, Ιωάννινα',
      categoryLabel: CATEGORY_LABELS[category],
    } as Event
  })
}

export function getEventBySlug(slug: string): Event | undefined {
  return getAllEvents().find((event) => event.slug === slug)
}

export function getUpcomingEvents(now = new Date()): Event[] {
  return getAllEvents()
    .filter((event) => new Date(event.date).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getPastEvents(now = new Date()): Event[] {
  return getAllEvents()
    .filter((event) => new Date(event.date).getTime() < now.getTime())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedEvents(currentSlug: string, limit = 3): Event[] {
  return getUpcomingEvents().filter((event) => event.slug !== currentSlug).slice(0, limit)
}
