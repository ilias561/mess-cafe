'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CategoryPill from '@/components/blog/category-pill'
import PostMeta from '@/components/blog/post-meta'
import { EASE, fadeUpSoft } from '@/lib/motion'
import type { Post } from '@/lib/blog/posts'

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <motion.article
      {...fadeUpSoft}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-mustard focus-visible:outline-offset-4"
      >
        <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-bone-warm">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            width={760}
            height={950}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5">
          <CategoryPill category={post.category} label={post.categoryLabel} />
          <h3 className="mt-4 font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.15] tracking-[-0.01em] text-charcoal">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 font-sans text-[16px] leading-[1.7] text-concrete">
            {post.excerpt}
          </p>
          <PostMeta post={post} className="mt-4" />
        </div>
      </Link>
    </motion.article>
  )
}
