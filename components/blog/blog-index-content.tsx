'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import BlogIndexHero from '@/components/blog/blog-index-hero'
import FeaturedPost from '@/components/blog/featured-post'
import PostCard from '@/components/blog/post-card'
import { staggerContainer } from '@/lib/motion'
import type { Post, PostCategory } from '@/lib/blog/posts'

type BlogIndexContentProps = {
  posts: Post[]
}

type FilterKey = 'all' | PostCategory

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Όλα' },
  { key: 'kafes', label: 'Καφές' },
  { key: 'kouzina', label: 'Κουζίνα' },
  { key: 'koinotita', label: 'Κοινότητα' },
  { key: 'events', label: 'Events' },
]

export default function BlogIndexContent({ posts }: BlogIndexContentProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [visibleCount, setVisibleCount] = useState(9)

  const featured = posts.find((post) => post.featured) ?? posts[0]
  const nonFeaturedPosts = posts.filter((post) => post.slug !== featured.slug)

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return nonFeaturedPosts
    return nonFeaturedPosts.filter((post) => post.category === activeFilter)
  }, [activeFilter, nonFeaturedPosts])

  const visiblePosts = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  return (
    <section className="px-6 pb-24 md:px-12 md:pb-32">
      <BlogIndexHero />

      <div className="mx-auto mt-16 max-w-[1400px]">
        <FeaturedPost post={featured} />

        <div className="mt-14 flex flex-wrap gap-3 border-t border-line/30 pt-10 md:gap-4">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.key)
                  setVisibleCount(9)
                }}
                className={`rounded-full border px-5 py-2 font-sans text-[12px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isActive
                    ? 'border-olive bg-olive text-bone'
                    : 'border-line/50 text-charcoal hover:border-mustard hover:text-olive'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <motion.div
          {...staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3"
        >
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </motion.div>

        {hasMore ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + 6)}
              className="rounded-full bg-mustard px-8 py-4 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-amber"
            >
              Φόρτωσε περισσότερα
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
