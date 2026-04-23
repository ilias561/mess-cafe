import type { Metadata } from 'next'
import EventsGrid from '@/components/events/events-grid'
import EventsIndexHero from '@/components/events/events-index-hero'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PreFooterCta from '@/components/pre-footer-cta'
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

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <EventsIndexHero />
      <EventsGrid upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
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
