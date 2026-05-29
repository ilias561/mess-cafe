import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import { buildPageMetadata } from '@/lib/metadata'
import Hero from '@/components/hero'
import HeroCaption from '@/components/hero-caption'
import MessAcronym from '@/components/mess-acronym'
import PhilosophySection from '@/components/philosophy-section'
import ActionsSection from '@/components/actions-section'
import ContactSection from '@/components/contact-section'
import FooterSection from '@/components/footer-section'

const GalleryMenuPreview = dynamic(() => import('@/components/gallery-menu-preview'))
const ReviewsSection = dynamic(() => import('@/components/reviews-section'))
import { getEventBySlug, type Event } from '@/lib/events/events'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = buildPageMetadata({
  title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
  description:
    'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα. Φαγητό ως φάρμακο — poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη.',
  path: '/',
})

export default function Home() {
  const keepRisingNext = getEventBySlug('keep-rising-vol-3')
  const keepRising = getEventBySlug('keep-rising')
  const actionCards = [keepRisingNext, keepRising].filter((e): e is Event => !!e)
  const settings = getSettings()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <Hero />
      <HeroCaption />
      <MessAcronym />
      <PhilosophySection />
      <ActionsSection actionCards={actionCards} />
      <GalleryMenuPreview />
      <ReviewsSection />
      <ContactSection settings={settings} />
      <FooterSection />
    </main>
  )
}
