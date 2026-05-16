import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PreFooterCta from '@/components/pre-footer-cta'
import BlogTagFilter from '@/components/blog/BlogTagFilter'
import { buildPageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/blog/posts'

const firstPost = getAllPosts()[0]

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog — M.E.S.S. | Ιστορίες για καφέ και κοινότητα',
  description:
    'Ιστορίες, συνταγές και στιγμές από το M.E.S.S. στα Ιωάννινα — από τους μπαρίστα στους πελάτες μας.',
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

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />

      {/* Page header */}
      <section className="px-6 pb-0 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-mustard">
            Blog
          </p>
          <h1 className="mt-5 max-w-[20ch] font-serif text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
            Καφές, γεύσεις και ό,τι συμβαίνει στην κοινότητα.
          </h1>
        </div>
      </section>

      {/* Tag filter + grid */}
      <section className="mt-8 px-6 pb-24 md:px-12 md:pb-32">
        <BlogTagFilter posts={posts} />
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
