import PostCard from '@/components/blog/post-card'
import { getRelatedPosts } from '@/lib/blog/posts'
import type { PostCategory } from '@/lib/blog/posts'

type RelatedPostsProps = {
  currentSlug: string
  category: PostCategory
}

export default function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentSlug, category, 3)

  if (!relatedPosts.length) return null

  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">ΣΧΕΤΙΚΑ ΑΡΘΡΑ</p>
        <h2 className="mt-5 font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.08] tracking-[-0.01em] text-charcoal">
          Συνεχίστε την ανάγνωση
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {relatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
