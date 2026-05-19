import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PreFooterCta from '@/components/pre-footer-cta'
import BlogTagFilter from '@/components/blog/BlogTagFilter'
import TipsGrid from '@/components/blog/tips-grid'
import { buildPageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/blog/posts'
import { getAllTips } from '@/lib/blog/tips'

const firstPost = getAllPosts()[0]

export const metadata: Metadata = buildPageMetadata({
  title: 'Food for Medicine — M.E.S.S.',
  description: 'Hints & tips από την κουζίνα μας — άρθρα, συνταγές και στιγμές από το M.E.S.S.',
  path: '/blog',
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

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />

      <section className="px-6 pb-0 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">Blog</p>
          <h1 className="mt-5 max-w-[20ch] font-serif text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
            Food for Medicine
          </h1>
          <p className="mt-6 max-w-[48ch] font-serif text-[18px] italic text-charcoal/75">
            Hints &amp; tips από την κουζίνα μας
          </p>
        </div>
      </section>

      <section className="mt-12 border-t border-line/30 px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] tracking-tight text-charcoal">Άρθρα</h2>
          <div className="mt-8">
            <BlogTagFilter posts={posts} />
          </div>
        </div>
      </section>

      <section className="border-t border-line/30 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] tracking-tight text-charcoal">Hints &amp; tips</h2>
          <p className="mt-3 font-sans text-[14px] text-concrete">Στιγμές και ιδέες από την κουζίνα μας — ακολούθησέ μας στο Instagram.</p>
          <div className="mt-10">
            <TipsGrid tips={tips} />
          </div>
        </div>
      </section>

      <PreFooterCta
        variant="mustard"
        eyebrow="ΜΗ ΧΑΣΕΙΣ ΕΠΟΜΕΝΑ"
        heading="Ακολούθησέ μας."
        body="Ό,τι συμβαίνει στο M.E.S.S. — νέα events, νέα στο μενού, ιστορίες από την κουζίνα — πρώτα στο Instagram."
        primaryLabel="Instagram"
        primaryHref="https://www.instagram.com/m.e.s.s._ioannina/"
        secondaryLabel="Ποιοι είμαστε"
        secondaryHref="/#about-us"
      />
      <FooterSection />
    </main>
  )
}
