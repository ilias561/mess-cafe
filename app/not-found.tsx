import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import NotFoundContent from '@/components/not-found-content'

export default function NotFound() {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <NotFoundContent />
      <FooterSection variant="minimal" />
    </main>
  )
}
