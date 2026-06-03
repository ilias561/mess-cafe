import type { Event } from '@/lib/events/events'
import { absoluteUrl } from '@/lib/site-url'

const VENUE_ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: 'Ναπολέοντος Ζέρβα 12',
  addressLocality: 'Ιωάννινα',
  postalCode: '45332',
  addressCountry: 'GR',
}

export function buildEventJsonLd(event: Event) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: absoluteUrl(event.coverImage),
    url: absoluteUrl(`/actions/${event.slug}`),
    startDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location || 'M.E.S.S.',
      address: VENUE_ADDRESS,
    },
    organizer: {
      '@type': 'Organization',
      name: 'M.E.S.S.',
      url: absoluteUrl('/'),
    },
    inLanguage: 'el',
  }

  if (event.endDate) jsonLd.endDate = event.endDate
  if (event.price) {
    jsonLd.offers = {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/actions/${event.slug}`),
    }
  }

  return jsonLd
}

export function buildUpcomingEventsJsonLd(events: Event[]) {
  if (events.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@graph': events.map((event) => {
      const node = buildEventJsonLd(event)
      const { '@context': _ctx, ...rest } = node
      return rest
    }),
  }
}
