import type { Metadata } from 'next'
import { Instagram } from 'lucide-react'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PreFooterCta from '@/components/pre-footer-cta'
import CurtainReveal from '@/components/food-for-medicine/curtain-reveal'
import ChoiceDoors from '@/components/food-for-medicine/choice-doors'
import { ReleaseDivider } from '@/components/decor/ornaments'
import BlogTagFilter from '@/components/blog/BlogTagFilter'
import TipsGrid from '@/components/blog/tips-grid'
import MenuHeader from '@/components/menu/MenuHeader'
import MenuAnchorNav from '@/components/menu/MenuAnchorNav'
import IngredientStandards from '@/components/menu/IngredientStandards'
import MenuCategory from '@/components/menu/MenuCategory'
import { buildPageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/blog/posts'
import { getAllTips } from '@/lib/blog/tips'
import { buildMenuJsonLd } from '@/lib/menu-schema'
import { menuData } from '@/lib/menu-data'

const INSTAGRAM_URL = 'https://www.instagram.com/m.e.s.s._ioannina/'

const firstPost = getAllPosts()[0]

export const metadata: Metadata = buildPageMetadata({
  title: 'Φαγητό ως Φάρμακο — Μενού, συνταγές & κόλπα κουζίνας | M.E.S.S.',
  description:
    'Το πλήρες μενού του M.E.S.S., συνταγές και κόλπα κουζίνας — όλα φτιαγμένα με τοπικά υλικά και τη φιλοσοφία «φαγητό ως φάρμακο».',
  path: '/food-for-medicine',
  ...(firstPost
    ? {
        image: {
          url: firstPost.cover,
          alt: firstPost.coverAlt,
        },
      }
    : {}),
})

export default function BlogPage() {
  const posts = getAllPosts()
  const tips = getAllTips()
  const PHILOSOPHY_INDEX = 3
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
      <CurtainReveal />
      <ChoiceDoors />

      <section id="menu" aria-labelledby="ffm-menu-heading" className="scroll-mt-28">
        <h2 id="ffm-menu-heading" className="sr-only">Μενού M.E.S.S.</h2>
        <MenuHeader />
        <MenuAnchorNav />
        <IngredientStandards />
        {beforePhilosophy.map((category, i) => (
          <MenuCategory key={category.id} category={category} index={i} />
        ))}
        <section className="border-y border-mustard/25 bg-canopy-night px-6 py-24 md:px-12 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-[clamp(24px,3.5vw,36px)] leading-snug tracking-tight text-charcoal">
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
            showFooterBeat={i < afterPhilosophy.length - 1}
          />
        ))}
      </section>

      <ReleaseDivider label="Από την κουζίνα μας" />

      <section id="recipes" className="scroll-mt-28 mt-14 border-t border-line/30 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] tracking-tight text-charcoal">
            Συνταγές &amp; κόλπα κουζίνας με M.E.S.S.
          </h2>
          <p className="mt-3 max-w-[56ch] font-sans text-[15px] leading-relaxed text-concrete">
            Πιάτα από το μενού μας, εξηγημένα με απλά βήματα και τα γιατί πίσω από κάθε υλικό.
          </p>
          <div className="mt-8">
            <BlogTagFilter posts={posts} />
          </div>
        </div>
      </section>

      <section className="border-t border-line/30 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] tracking-tight text-charcoal">
            Καθημερινά tips στο Instagram
          </h2>
          <p className="mt-3 max-w-[56ch] font-sans text-[15px] leading-relaxed text-concrete">
            Γρήγορες ιδέες, στιγμές από την κουζίνα και ό,τι νέο βγαίνει από τον φούρνο μας.
          </p>
          {tips.length > 0 ? (
            <div className="mt-10">
              <TipsGrid tips={tips} />
            </div>
          ) : (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-interactive group mt-10 flex flex-col items-start gap-5 rounded-[2px] border border-line/40 bg-bone-warm p-8 transition-colors duration-200 hover:border-mustard md:flex-row md:items-center md:justify-between md:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mustard text-ink-dark">
                  <Instagram className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="font-serif text-[22px] leading-tight tracking-tight text-charcoal">
                    @m.e.s.s._ioannina
                  </p>
                  <p className="mt-1 font-sans text-[14px] leading-relaxed text-concrete">
                    Τα φρέσκα tips ανεβαίνουν πρώτα εκεί.
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center rounded-full bg-mustard px-7 py-3 font-sans text-sm font-medium text-ink-dark transition-colors duration-200 group-hover:bg-amber">
                Ακολούθησέ μας →
              </span>
            </a>
          )}
        </div>
      </section>

      <PreFooterCta
        variant="mustard"
        eyebrow="ΜΗ ΧΑΣΕΙΣ ΕΠΟΜΕΝΑ"
        heading="Έλα να μαγειρέψουμε μαζί."
        body="Κάθε εβδομάδα νέες συνταγές, νέα στο μενού και ιστορίες από την κουζίνα — πρώτα στο Instagram μας."
        primaryLabel="Instagram"
        primaryHref={INSTAGRAM_URL}
        secondaryLabel="Η φιλοσοφία μας"
        secondaryHref="/#philosophy"
      />
      <FooterSection />
    </main>
  )
}
