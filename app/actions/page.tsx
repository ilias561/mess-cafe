import type { Metadata } from 'next'
import EventsGrid from '@/components/events/events-grid'
import EventsIndexHero from '@/components/events/events-index-hero'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import { getPastEvents, getUpcomingEvents } from '@/lib/events/events'

export const metadata: Metadata = {
  title: 'Δράσεις — M.E.S.S. | Workshops, μουσική και πολιτισμός',
  description: 'Όλες οι επόμενες και προηγούμενες δράσεις του M.E.S.S. σε μία ενιαία σελίδα.',
}

export default function ActionsPage() {
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <EventsIndexHero />
      <EventsGrid upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <FooterSection />
    </main>
  )
}
