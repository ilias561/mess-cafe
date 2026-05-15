import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import ActionsShell from '@/components/events/actions-shell'
import UpcomingDatesMarquee from '@/components/events/upcoming-dates-marquee'
import FeaturedNextEvent from '@/components/events/featured-next-event'
import ActionsHeroHeader from '@/components/events/actions-hero-header'
import ActionsMissionStrip from '@/components/events/actions-mission-strip'
import ActionsManifesto from '@/components/events/actions-manifesto'
import EventsArchiveList from '@/components/events/events-archive-list'
import ActionSpotlight from '@/components/events/action-spotlight'
import PreFooterCta from '@/components/pre-footer-cta'
import FooterSection from '@/components/footer-section'
import { getEventBySlug, getPastEvents, getUpcomingEvents } from '@/lib/events/events'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = {
  title: '#KeepRising — M.E.S.S. | Κοινότητα, αλληλεγγύη και πολιτισμός',
  description: '#KeepRising — οι δράσεις του M.E.S.S. για καθαρό φαγητό, αλληλεγγύη και κοινότητα στα Ιωάννινα.',
  openGraph: {
    title: '#KeepRising — M.E.S.S. | Κοινότητα, αλληλεγγύη και πολιτισμός',
    description: '#KeepRising — οι δράσεις του M.E.S.S. για καθαρό φαγητό, αλληλεγγύη και κοινότητα στα Ιωάννινα.',
    locale: 'el_GR',
    type: 'website',
  },
}

export default function ActionsPage() {
  const settings = getSettings()
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()
  const keepRisingSpotlight = getEventBySlug('keep-rising-ceramics') ?? getEventBySlug('keep-rising-bazaar')
  const featured = upcomingEvents[0] ?? null
  const restUpcoming = upcomingEvents.slice(1)
  const noUpcoming = upcomingEvents.length === 0

  const spotlight = keepRisingSpotlight ? (
    <ActionSpotlight event={keepRisingSpotlight} />
  ) : null

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <ActionsHeroHeader nextEvent={featured} />
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(250px, 40vw, 500px)' }}>
        <img
          src="/images/111/mess-internal-0034.jpg"
          alt="Keep Rising — η πινακίδα του M.E.S.S."
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
      <ActionsShell
        upcomingEvents={upcomingEvents}
        restUpcoming={restUpcoming}
        settings={settings}
        aboveHero={
          <>
            <ActionsMissionStrip variant="lead" />
            <ActionsManifesto />
            {noUpcoming && spotlight}
          </>
        }
      >
        <UpcomingDatesMarquee events={upcomingEvents} />
        {featured && <FeaturedNextEvent event={featured} settings={settings} />}
      </ActionsShell>
      {!noUpcoming && spotlight}
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
