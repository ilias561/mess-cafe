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
    openGraph: {
      title: `${event.title} — Δράσεις | M.E.S.S.`,
      description: event.description,
      type: 'article',
      locale: 'el_GR',
      images: [{ url: event.coverImage, alt: event.coverAlt }],
    },
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) notFound()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <EventHero event={event} />
      <PostBody markdown={event.body} />
      <EventBookingCta event={event} />
      <RelatedEvents currentSlug={event.slug} />
      <FooterSection />
    </main>
  )
}
