import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PostBody from '@/components/blog/post-body'
import EventHero from '@/components/events/event-hero'
import EventBookingCta from '@/components/events/event-booking-cta'
import RelatedEvents from '@/components/events/related-events'
import { getAllEvents, getEventBySlug } from '@/lib/events/events'

type EventPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllEvents().map((event) => ({ slug: event.slug }))
  // Next.js 16 static export throws when generateStaticParams returns [].
  // Returning a sentinel keeps the build green; the page calls notFound() for it.
  return slugs.length > 0 ? slugs : [{ slug: '_' }]
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    return { title: 'Δράση — M.E.S.S.' }
  }

  return {
    title: `${event.title} — Δράσεις | M.E.S.S.`,
    description: event.description,
    alternates: {
      canonical: `/actions/${event.slug}`,
    },
    openGraph: {
      title: `${event.title} — Δράσεις | M.E.S.S.`,
      description: event.description,
      type: 'article',
      locale: 'el_GR',
      images: [{ url: event.coverImage, alt: event.coverAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} — Δράσεις | M.E.S.S.`,
      description: event.description,
      images: [event.coverImage],
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: event.coverImage,
    url: `https://mess-cafe.gr/actions/${event.slug}`,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.location || 'M.E.S.S.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ναπολέοντος Ζέρβα 12',
        addressLocality: 'Ιωάννινα',
        postalCode: '45332',
        addressCountry: 'GR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'M.E.S.S.',
      url: 'https://mess-cafe.gr',
    },
    inLanguage: 'el',
  }

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <EventHero event={event} />
      <PostBody markdown={event.body} />
      <EventBookingCta event={event} />
      <RelatedEvents currentSlug={event.slug} />
      <FooterSection />
    </main>
  )
}
