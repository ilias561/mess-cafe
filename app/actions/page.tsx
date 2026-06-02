import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import ActionsHeroHeader from '@/components/events/actions-hero-header'
import KeepRisingActions from '@/components/events/keep-rising-actions'
import FooterSection from '@/components/footer-section'
import { getAllEvents, getPastEvents, getUpcomingEvents } from '@/lib/events/events'
import { buildPageMetadata } from '@/lib/metadata'
import { getSettings } from '@/lib/settings'

const firstEventCover = getAllEvents()[0]

export const metadata: Metadata = buildPageMetadata({
  title: '#KeepRising — M.E.S.S. | Κοινότητα, αλληλεγγύη και πολιτισμός',
  description: '#KeepRising — οι δράσεις του M.E.S.S. για καθαρό φαγητό, αλληλεγγύη και κοινότητα στα Ιωάννινα.',
  path: '/actions',
  ...(firstEventCover
    ? {
        image: {
          url: firstEventCover.coverImage,
          alt: firstEventCover.coverAlt,
        },
      }
    : {}),
})

export default function ActionsPage() {
  const settings = getSettings()
  const upcoming = getUpcomingEvents()
  const past = getPastEvents()
  const featured = upcoming[0] ?? null

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <ActionsHeroHeader nextEvent={featured} />
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(250px, 40vw, 500px)' }}>
        <img
          src="/images/111/mess-internal-0034.jpg"
          alt="Ο εσωτερικός χώρος M.E.S.S. με πινακίδα #Keep Rising"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
      <KeepRisingActions upcoming={upcoming} past={past} settings={settings} />
      <FooterSection />
    </main>
  )
}
