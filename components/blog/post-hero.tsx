'use client'

import CategoryPill from '@/components/blog/category-pill'
import ParallaxImage from '@/components/parallax-image'
import PostMeta from '@/components/blog/post-meta'
import type { Post } from '@/lib/blog/posts'

type PostHeroProps = {
  post: Post
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <ParallaxImage
        src={post.coverImage}
        alt={post.coverAlt}
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-12 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <CategoryPill category={post.category} label={post.categoryLabel} light />
          <h1 className="mt-5 max-w-[22ch] font-serif text-[clamp(36px,6vw,78px)] leading-[1.02] tracking-[-0.02em] text-bone">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[62ch] font-sans text-[16px] leading-[1.7] text-bone/75 md:text-[18px]">
            {post.excerpt}
          </p>
          <PostMeta post={post} className="mt-6" light />
        </div>
      </div>
    </section>
  )
}
