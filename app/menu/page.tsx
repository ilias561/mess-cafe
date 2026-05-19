import type { Metadata } from 'next'
import Link from 'next/link'
import MenuHeader from '@/components/menu/MenuHeader'
import MenuAnchorNav from '@/components/menu/MenuAnchorNav'
import MenuSpecialsSection from '@/components/menu/MenuSpecialsSection'
import MenuCategory from '@/components/menu/MenuCategory'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import { buildMenuJsonLd } from '@/lib/menu-schema'
import { menuData } from '@/lib/menu-data'
import { buildPageMetadata } from '@/lib/metadata'
import { getSettings } from '@/lib/settings'

export const metadata: Metadata = buildPageMetadata({
  title: 'Menu — M.E.S.S. · Specialty Coffee & Healthy Brunch Ιωάννινα',
  description:
    'Φαγητό ως φάρμακο. Specialty καφές, poke bowls, brunch, smoothies και γλυκά χωρίς ζάχαρη. Όλες οι τιμές.',
  path: '/menu',
  image: {
    url: '/images/menu/piata-0028.jpg',
    alt: 'Poke bowl με φρέσκα λαχανικά και σολομό — επιλογή από το μενού M.E.S.S.',
  },
})

const PHILOSOPHY_INDEX = 3

export default function MenuPage() {
  const updatedAt = new Date().toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const settings = getSettings()
  const beforePhilosophy = menuData.slice(0, PHILOSOPHY_INDEX)
  const afterPhilosophy = menuData.slice(PHILOSOPHY_INDEX)
  const menuJsonLd = buildMenuJsonLd()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <Navigation />
      <MenuHeader updatedAt={updatedAt} />
      <MenuSpecialsSection />
      <MenuAnchorNav />

      {beforePhilosophy.map((category, i) => (
        <MenuCategory key={category.id} category={category} index={i} />
      ))}

      {/* Philosophy callout between Salads and Coffee */}
      <section className="border-y border-line/30 bg-bone-warm px-6 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-[clamp(24px,3.5vw,36px)] leading-snug tracking-tight text-bone">
            &ldquo;Το MESS δημιουργήθηκε για να προάγει ένα πιο υγιές lifestyle — με κεντρικό άξονα την δημιουργικότητα, την πρωτοβουλία και την δικτύωση.&rdquo;
          </p>
          <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">
            — Απόστολος, ιδιοκτήτης
          </p>
        </div>
      </section>

      {afterPhilosophy.map((category, i) => (
        <MenuCategory
          key={category.id}
          category={category}
          index={PHILOSOPHY_INDEX + i}
        />
      ))}

      {/* CTA */}
      <section className="border-t border-line/30 bg-bone px-6 py-24 text-center md:px-12 md:py-32">
        <p className="font-serif text-[clamp(24px,4vw,40px)] tracking-tight text-charcoal">
          Κάθε μέρα · {settings.hours?.[0]?.open ?? '08:00'} — {settings.hours?.[0]?.close ?? '22:00'}
        </p>
        <div className="mt-8">
          <Link
            href="/#map"
            className="ui-interactive inline-block rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-charcoal hover:shadow-lg hover:bg-amber"
          >
            Βρες μας
          </Link>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
