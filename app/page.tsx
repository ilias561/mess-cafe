import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import MarqueeStrip from '@/components/marquee-strip'
import AboutSection from '@/components/about-section'
import MenuPreview from '@/components/menu-preview'
import StoriaSection from '@/components/storia-section'
import ActionsSection from '@/components/actions-section'
import GallerySection from '@/components/gallery-section'
import ReviewsSection from '@/components/reviews-section'
import FooterSection from '@/components/footer-section'
import { getUpcomingEvents } from '@/lib/events/events'

export default function Home() {
  const actionCards = getUpcomingEvents().slice(0, 4)

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <MenuPreview />
      <StoriaSection />
      <ActionsSection actionCards={actionCards} />
      <GallerySection />
      <ReviewsSection />
      <FooterSection />
    </main>
  )
}
