'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CategoryPill from '@/components/blog/category-pill'
import PostMeta from '@/components/blog/post-meta'
import { EASE, fadeUp } from '@/lib/motion'
import type { Post } from '@/lib/blog/posts'

type FeaturedPostProps = {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.section {...fadeUp} className="border-t border-line/30 pt-12 md:pt-16">
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 focus-visible:outline-2 focus-visible:outline-mustard focus-visible:outline-offset-4"
      >
        <div className="md:col-span-7">
          <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-bone-warm md:aspect-[5/6]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              width={980}
              height={1200}
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center md:col-span-5">
          <CategoryPill category={post.category} label={post.categoryLabel} />
          <h2 className="mt-6 font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-0.02em] text-charcoal">
            {post.title}
          </h2>
          <p className="mt-5 font-sans text-[16px] md:text-[17px] leading-[1.7] text-concrete">
            {post.excerpt}
          </p>
          <PostMeta post={post} className="mt-6" />
          <motion.span
            whileHover={{ x: 3 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-8 inline-flex w-fit items-center gap-1 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal underline decoration-mustard underline-offset-[6px]"
          >
            Διάβασε →
          </motion.span>
        </div>
      </Link>
    </motion.section>
  )
}
