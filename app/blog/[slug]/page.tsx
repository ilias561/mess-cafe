import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'
import PostHero from '@/components/blog/post-hero'
import PostBody from '@/components/blog/post-body'
import RelatedPosts from '@/components/blog/related-posts'
import ShareRow from '@/components/blog/share-row'
import PreFooterCta from '@/components/pre-footer-cta'
import { formatPostDate } from '@/lib/blog/format-date'
import { getAllPosts, getPostBySlug } from '@/lib/blog/posts'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Άρθρο — M.E.S.S.',
    }
  }

  return {
    title: `${post.title} — Blog | M.E.S.S.`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Blog | M.E.S.S.`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.cover, alt: post.coverAlt }],
      locale: 'el_GR',
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const canonicalUrl = `https://mess-cafe.gr/blog/${post.slug}`

  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <PostHero post={post} />
      <PostBody markdown={post.body} />

      <ShareRow url={canonicalUrl} />

      {post.author.bio ? (
        <section className="px-6 py-14 md:px-12">
          <div className="mx-auto max-w-[72ch] border border-line/30 bg-bone-warm p-8">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΣΧΕΤΙΚΑ ΜΕ ΤΟΝ ΣΥΓΓΡΑΦΕΑ</p>
            <p className="mt-4 font-serif text-[26px] leading-[1.2] text-charcoal">{post.author.name}</p>
            <p className="mt-3 font-sans text-[16px] leading-[1.7] text-concrete">{post.author.bio}</p>
            <p className="mt-4 font-sans text-[12px] text-concrete">
              Δημοσιεύτηκε στις {formatPostDate(post.publishedAt)}
            </p>
          </div>
        </section>
      ) : null}

      <RelatedPosts currentSlug={post.slug} category={post.category} />
      <PreFooterCta
        variant="olive"
        eyebrow="ΚΑΘΕ ΕΒΔΟΜΑΔΑ ΚΑΤΙ ΝΕΟ"
        heading="Επίσκεψέ μας."
        body="Η καλύτερη έκδοση του blog γράφεται ζωντανά στην καφετέρια. Σε περιμένουμε."
        primaryLabel="Δες το μενού"
        primaryHref="/menu"
        secondaryLabel="Δες τις δράσεις"
        secondaryHref="/actions"
      />
      <FooterSection />
    </main>
  )
}
