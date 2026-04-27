import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PreFooterCta from '@/components/pre-footer-cta'
import BlogTagFilter from '@/components/blog/BlogTagFilter'
import { getAllPosts } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Blog — M.E.S.S. | Ιστορίες για καφέ και κοινότητα',
  description:
    'Ιστορίες, συνταγές και στιγμές από το M.E.S.S. στα Ιωάννινα — από τους μπαρίστα στους πελάτες μας.',
  openGraph: {
    title: 'Blog — M.E.S.S. | Ιστορίες για καφέ και κοινότητα',
    description:
      'Ιστορίες, συνταγές και στιγμές από το M.E.S.S. στα Ιωάννινα — από τους μπαρίστα στους πελάτες μας.',
    type: 'website',
    locale: 'el_GR',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />

      {/* Page header */}
      <section className="px-6 pb-0 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-sans text-[12px] font-medium uppercase tracking-wider text-mustard [font-variant-caps:small-caps]">
            Blog
          </p>
          <h1 className="mt-5 max-w-[20ch] font-serif text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
            Καφές, γεύσεις και ό,τι συμβαίνει στην κοινότητα.
          </h1>
        </div>
      </section>

      {/* Tag filter + grid */}
      <section className="mt-16 px-6 pb-24 md:px-12 md:pb-32">
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
