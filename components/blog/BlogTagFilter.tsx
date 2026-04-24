'use client'

import { useMemo, useState } from 'react'
import BlogPostCard from '@/components/blog/BlogPostCard'
import type { Post, PostCategory } from '@/lib/blog/types'

type FilterKey = 'all' | PostCategory

const PILLS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'kafes', label: 'Coffee' },
  { key: 'kouzina', label: 'Kitchen' },
  { key: 'koinotita', label: 'Community' },
  { key: 'events', label: 'Events' },
]

type BlogTagFilterProps = {
  posts: Post[]
}

export default function BlogTagFilter({ posts }: BlogTagFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const categoryCounts = useMemo(
    () =>
      posts.reduce<Partial<Record<PostCategory, number>>>((acc, post) => {
        acc[post.category] = (acc[post.category] ?? 0) + 1
        return acc
      }, {}),
    [posts],
  )

  const filteredPosts = useMemo(
    () => (activeFilter === 'all' ? posts : posts.filter((p) => p.category === activeFilter)),
    [posts, activeFilter],
  )

  return (
    <div>
      {/* Sticky tag filter bar */}
      <div className="sticky top-16 z-20 -mx-6 border-y border-line/30 bg-bone/90 px-6 py-4 backdrop-blur-md md:-mx-12 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3">
          {PILLS.map(({ key, label }) => {
            const isActive = activeFilter === key
            const isEmpty = key !== 'all' && !categoryCounts[key as PostCategory]

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (!isEmpty) setActiveFilter(key)
                }}
                className={[
                  'rounded-full border px-5 py-2 font-sans text-[12px] tracking-[0.12em] transition-colors duration-200',
                  isActive
                    ? 'border-mustard bg-mustard text-charcoal'
                    : isEmpty
                      ? 'cursor-default border-line/50 text-charcoal opacity-50'
                      : 'cursor-pointer border-line/50 text-charcoal hover:bg-bone-warm',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Post grid */}
      <div className="mx-auto mt-12 max-w-[1400px] grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
