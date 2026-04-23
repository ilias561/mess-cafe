'use client'

import { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CategoryPill from '@/components/blog/category-pill'
import PostMeta from '@/components/blog/post-meta'
import type { Post } from '@/lib/blog/posts'
import { EASE } from '@/lib/motion'

type PostHeroProps = {
  post: Post
}

export default function PostHero({ post }: PostHeroProps) {
  const words = useMemo(() => post.title.split(' '), [post.title])
  const imageRef = useRef<HTMLDivElement | null>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (value) => value * 0.03)

  return (
    <section className="px-6 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
          <Link href="/blog" className="hover:text-charcoal transition-colors duration-300">
            Blog
          </Link>{' '}
          / {post.categoryLabel}
        </p>
        <div className="mt-7">
          <CategoryPill category={post.category} label={post.categoryLabel} />
        </div>

        <h1 className="mt-7 max-w-[18ch] font-serif text-[clamp(42px,6vw,84px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-baseline">
              <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
              >
                {word}
                {i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
          className="mt-8 max-w-[62ch] font-sans text-[18px] md:text-[20px] leading-[1.7] text-concrete"
        >
          {post.excerpt}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mt-8"
        >
          <PostMeta post={post} showAvatar />
        </motion.div>

        <motion.div ref={imageRef} style={{ y }} className="mx-auto mt-12 max-w-[1200px]">
          <div className="aspect-[16/9] overflow-hidden rounded-[2px] bg-bone-warm">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              width={1800}
              height={1000}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
