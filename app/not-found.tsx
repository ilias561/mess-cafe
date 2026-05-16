import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import NotFoundContent from '@/components/not-found-content'

export const metadata: Metadata = {
  title: '404 — M.E.S.S.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <NotFoundContent />
      <FooterSection variant="minimal" />
    </main>
  )
}
