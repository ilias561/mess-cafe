import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PostBody from '@/components/blog/post-body'
import EventHero from '@/components/events/event-hero'
import EventBookingCta from '@/components/events/event-booking-cta'
import RelatedEvents from '@/components/events/related-events'
import { buildEventJsonLd } from '@/lib/events/event-json-ld'
import { buildOgImage, buildPageMetadata } from '@/lib/metadata'
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

  const base = buildPageMetadata({
    title: `${event.title} — Δράσεις | M.E.S.S.`,
    description: event.description,
    path: `/actions/${event.slug}`,
    type: 'article',
  })

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [buildOgImage({ url: event.coverImage, alt: event.coverAlt })],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} — Δράσεις | M.E.S.S.`,
      description: event.description,
      images: [buildOgImage({ url: event.coverImage, alt: event.coverAlt }).url],
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) notFound()

  const jsonLd = buildEventJsonLd(event)

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
