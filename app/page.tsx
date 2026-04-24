import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import MarqueeStrip from '@/components/marquee-strip'
import TodayModule from '@/components/today-module'
import AboutSection from '@/components/about-section'
import MenuPreview from '@/components/menu-preview'
import StoriaSection from '@/components/storia-section'
import ActionsSection from '@/components/actions-section'
import GoalsSection from '@/components/goals-section'
import GallerySection from '@/components/gallery-section'
import ContactSection from '@/components/contact-section'
import ReviewsSection from '@/components/reviews-section'
import FooterSection from '@/components/footer-section'
import { getAllEvents } from '@/lib/events/events'
import { getUpcomingEvents } from '@/lib/events/events'

export default function Home() {
  const actionCards = getUpcomingEvents().slice(0, 4)
  const events = getAllEvents()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <Hero />
      <MarqueeStrip />
      <TodayModule events={events} />
      <AboutSection />
      <MenuPreview />
      <StoriaSection />
      <ActionsSection actionCards={actionCards} />
      <GoalsSection />
      <GallerySection />
      <ContactSection />
      <ReviewsSection />
      <FooterSection />
    </main>
  )
}
