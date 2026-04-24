import type { Metadata } from 'next'
import BlogIndexContent from '@/components/blog/blog-index-content'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PreFooterCta from '@/components/pre-footer-cta'
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
      <BlogIndexContent posts={posts} />
      <PreFooterCta
        variant="mustard"
        eyebrow="ΜΗ ΧΑΣΕΙΣ ΕΠΟΜΕΝΑ"
        heading="Ακολούθησέ μας."
        body="Ό,τι συμβαίνει στο M.E.S.S. — νέα events, νέα στο μενού, ιστορίες από την κουζίνα — πρώτα στο Instagram."
        primaryLabel="Instagram"
        primaryHref="https://instagram.com/messcafe"
        secondaryLabel="Ποιοι είμαστε"
        secondaryHref="/#about-us"
      />
      <FooterSection />
    </main>
  )
}
