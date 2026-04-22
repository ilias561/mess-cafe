import type { Metadata } from 'next'
import Link from 'next/link'
import MenuHeader from '@/components/menu/MenuHeader'
import MenuAnchorNav from '@/components/menu/MenuAnchorNav'
import MenuCategory from '@/components/menu/MenuCategory'
import { menuData } from '@/lib/menu-data'

export const metadata: Metadata = {
  title: 'Menu — M.E.S.S. · Specialty Coffee & Healthy Brunch Ιωάννινα',
  description:
    'Φαγητό ως φάρμακο. Specialty καφές, poke bowls, brunch, smoothies και γλυκά χωρίς ζάχαρη. Όλες οι τιμές.',
}

const PHILOSOPHY_INDEX = 3

export default function MenuPage() {
  const beforePhilosophy = menuData.slice(0, PHILOSOPHY_INDEX)
  const afterPhilosophy = menuData.slice(PHILOSOPHY_INDEX)

  return (
    <main className="bg-bone text-charcoal">
      <MenuHeader />
      <MenuAnchorNav />

      {beforePhilosophy.map((category, i) => (
        <MenuCategory key={category.id} category={category} index={i} />
      ))}

      {/* Philosophy callout between Salads and Coffee */}
      <section className="bg-olive px-6 py-32 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-[clamp(24px,4vw,40px)] leading-snug tracking-tight text-bone">
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
      <section className="border-t border-line/30 bg-bone px-6 py-24 text-center md:px-12">
        <p className="font-serif text-[clamp(24px,4vw,40px)] tracking-tight text-charcoal">
          Κάθε μέρα · 08:00 — 22:00
        </p>
        <div className="mt-8">
          <Link
            href="/#contact"
            className="inline-block rounded-full bg-mustard px-8 py-4 font-sans text-sm font-medium text-charcoal transition-colors hover:bg-amber"
          >
            Βρες μας
          </Link>
        </div>
      </section>
    </main>
  )
}
