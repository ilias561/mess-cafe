import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import { buildPageMetadata } from '@/lib/metadata'
import Hero from '@/components/hero'
import HeroCaption from '@/components/hero-caption'
import MarqueeStrip from '@/components/marquee-strip'
import TodayModule from '@/components/today-module'
import WelcomeSection from '@/components/welcome-section'
import PhilosophySection from '@/components/philosophy-section'
import AboutUsSection from '@/components/about-us-section'
import GoalsSection from '@/components/goals-section'
import ActionsSection from '@/components/actions-section'
import GallerySection from '@/components/gallery-section'
import GalleryMenuPreview from '@/components/gallery-menu-preview'
import ReviewsSection from '@/components/reviews-section'
import ContactSection from '@/components/contact-section'
import FooterSection from '@/components/footer-section'
import { getAllEvents, getEventBySlug, type Event } from '@/lib/events/events'

export const metadata: Metadata = buildPageMetadata({
  title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
  description:
    'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα. Φαγητό ως φάρμακο — poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη.',
  path: '/',
})

export default function Home() {
  const keepRisingBazaar = getEventBySlug('keep-rising-bazaar')
  const keepRisingDelivery = getEventBySlug('keep-rising-ceramics')
  const actionCards = [keepRisingBazaar, keepRisingDelivery].filter((e): e is Event => !!e)
  const events = getAllEvents()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <Hero />
      <HeroCaption />
      <MarqueeStrip />
      <TodayModule events={events} />
      <WelcomeSection />
      <PhilosophySection />
      <AboutUsSection />
      <GoalsSection />
      <ActionsSection actionCards={actionCards} />
      <GallerySection />
      <GalleryMenuPreview />
      <ReviewsSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
