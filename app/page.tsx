import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import MarqueeStrip from '@/components/marquee-strip'
import TodayModule from '@/components/today-module'
import AboutUsSection from '@/components/about-us-section'
import MenuPreview from '@/components/menu-preview'
import GoalsSection from '@/components/goals-section'
import ActionsSection from '@/components/actions-section'
import GallerySection from '@/components/gallery-section'
import ReviewsSection from '@/components/reviews-section'
import ContactSection from '@/components/contact-section'
import FooterSection from '@/components/footer-section'
import { getAllEvents, getEventBySlug, type Event } from '@/lib/events/events'

export default function Home() {
  const keepRisingBazaar = getEventBySlug('keep-rising-bazaar')
  const keepRisingDelivery = getEventBySlug('keep-rising-ceramics')
  const actionCards = [keepRisingBazaar, keepRisingDelivery].filter((e): e is Event => !!e)
  const events = getAllEvents()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <Hero />
      <MarqueeStrip />
      <TodayModule events={events} />
      <AboutUsSection />
      <MenuPreview />
      <GoalsSection />
      <ActionsSection actionCards={actionCards} />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
