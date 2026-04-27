import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import ActionsShell from '@/components/events/actions-shell'
import UpcomingDatesMarquee from '@/components/events/upcoming-dates-marquee'
import FeaturedNextEvent from '@/components/events/featured-next-event'
import ActionsManifesto from '@/components/events/actions-manifesto'
import EventsArchiveList from '@/components/events/events-archive-list'
import ActionSpotlight from '@/components/events/action-spotlight'
import PreFooterCta from '@/components/pre-footer-cta'
import FooterSection from '@/components/footer-section'
import { getEventBySlug, getPastEvents, getUpcomingEvents } from '@/lib/events/events'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = {
  title: 'Δράσεις — M.E.S.S. | Workshops, μουσική και πολιτισμός',
  description: 'Όλες οι επόμενες και προηγούμενες δράσεις του M.E.S.S. σε μία ενιαία σελίδα.',
}

export default function ActionsPage() {
  const settings = getSettings()
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()
  const keepRisingSpotlight = getEventBySlug('keep-rising-ceramics') ?? getEventBySlug('keep-rising-bazaar')
  const featured = upcomingEvents[0] ?? null
  const restUpcoming = upcomingEvents.slice(1)

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <ActionsShell
        upcomingEvents={upcomingEvents}
        restUpcoming={restUpcoming}
        settings={settings}
      >
        <UpcomingDatesMarquee events={upcomingEvents} />
        {featured && <FeaturedNextEvent event={featured} settings={settings} />}
      </ActionsShell>
      <ActionsManifesto />
      {keepRisingSpotlight ? <ActionSpotlight event={keepRisingSpotlight} /> : null}
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
