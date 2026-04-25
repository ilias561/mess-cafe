import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import EventsIndexHero from '@/components/events/events-index-hero'
import UpcomingDatesMarquee from '@/components/events/upcoming-dates-marquee'
import FeaturedNextEvent from '@/components/events/featured-next-event'
import UpcomingSection from '@/components/events/upcoming-section'
import ActionsManifesto from '@/components/events/actions-manifesto'
import EventsArchiveList from '@/components/events/events-archive-list'
import PreFooterCta from '@/components/pre-footer-cta'
import FooterSection from '@/components/footer-section'
import { getPastEvents, getUpcomingEvents } from '@/lib/events/events'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = {
  title: 'Δράσεις — M.E.S.S. | Workshops, μουσική και πολιτισμός',
  description: 'Όλες οι επόμενες και προηγούμενες δράσεις του M.E.S.S. σε μία ενιαία σελίδα.',
}

export default function ActionsPage() {
  const settings = getSettings()
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()
  const featured = upcomingEvents[0] ?? null
  const restUpcoming = upcomingEvents.slice(1)

  // Render UpcomingSection only when there are rest events to show, OR when
  // there are no upcoming events at all (empty state). When exactly 1 event
  // exists it's already covered by FeaturedNextEvent — no grid needed.
  const showUpcomingSection = restUpcoming.length > 0 || upcomingEvents.length === 0

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <EventsIndexHero />
      <UpcomingDatesMarquee events={upcomingEvents} />
      {featured && <FeaturedNextEvent event={featured} settings={settings} />}
      {showUpcomingSection && <UpcomingSection events={restUpcoming} />}
      <ActionsManifesto />
      {pastEvents.length > 0 && <EventsArchiveList pastEvents={pastEvents} />}
      <PreFooterCta
        variant="charcoal"
        eyebrow="ΘΕΛΕΙΣ ΝΑ ΚΛΕΙΣΕΙΣ ΘΕΣΗ;"
        heading="Μία φόρμα. Λίγα λεπτά."
        body="Διάλεξε event ή πες μας τι έχεις στο μυαλό σου — θα στήσουμε το υπόλοιπο μαζί."
        primaryLabel="Κράτηση"
        primaryHref="/reservations"
        secondaryLabel="WhatsApp"
        secondaryHref={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
      />
      <FooterSection />
    </main>
  )
}
