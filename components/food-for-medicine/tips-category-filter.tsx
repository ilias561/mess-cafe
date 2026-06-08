'use client'

import { useMemo, useState } from 'react'
import BlogPostCard from '@/components/blog/BlogPostCard'
import type { Post, PostCategory } from '@/lib/blog/types'

type FilterKey = 'all' | PostCategory

const PILLS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Όλες' },
  { key: 'brunch', label: 'Brunch' },
  { key: 'bowls', label: 'Bowls' },
  { key: 'rofimata', label: 'Ροφήματα' },
  { key: 'glyka', label: 'Γλυκά' },
]

type TipsCategoryFilterProps = {
  posts: Post[]
}

export default function TipsCategoryFilter({ posts }: TipsCategoryFilterProps) {
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
      <div className="sticky top-20 z-20 -mx-6 border-y border-line/30 bg-bone/90 px-6 py-3 backdrop-blur-md md:-mx-12 md:px-12 md:py-4">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-2 md:gap-3">
          {PILLS.map(({ key, label }) => {
            const isActive = activeFilter === key
            const isEmpty = key !== 'all' && !categoryCounts[key as PostCategory]

            return (
              <button
                key={key}
                type="button"
                aria-label={`Φίλτρο: ${label}`}
                aria-pressed={isActive}
                onClick={() => {
                  if (!isEmpty) setActiveFilter(key)
                }}
                className={[
                  'ui-interactive inline-flex min-h-[44px] items-center rounded-full border px-5 py-2 font-sans text-[12px] tracking-[0.12em] md:min-h-0 md:py-2',
                  isActive
                    ? 'border-mustard bg-mustard text-ink-dark'
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

      <div className="mx-auto mt-12 max-w-[1400px] grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
