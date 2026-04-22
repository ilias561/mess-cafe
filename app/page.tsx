import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import MarqueeStrip from '@/components/marquee-strip'
import AboutSection from '@/components/about-section'
import MenuPreview from '@/components/menu-preview'
import StoriaSection from '@/components/storia-section'
import GallerySection from '@/components/gallery-section'
import ReviewsSection from '@/components/reviews-section'
import FooterSection from '@/components/footer-section'

export default function Home() {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <MenuPreview />
      <StoriaSection />
      <GallerySection />
      <ReviewsSection />
      <FooterSection />
    </main>
  )
}
