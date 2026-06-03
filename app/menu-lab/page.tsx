import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import Carte from '@/components/menu-lab/Carte'

export const metadata: Metadata = {
  title: 'Menu Lab — The Carte (prototype) | M.E.S.S.',
  robots: { index: false, follow: false },
}

export default function MenuLabPage() {
  return (
    <main className="bg-bone text-charcoal">
      <Navigation />
      <Carte />
      <FooterSection />
    </main>
  )
}
