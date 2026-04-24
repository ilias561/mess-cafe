import Image from 'next/image'
import Link from 'next/link'
import { formatPostDate } from '@/lib/blog/format-date'
import type { Post } from '@/lib/blog/types'

type BlogPostCardProps = {
  post: Post
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block cursor-pointer bg-cream transition-shadow duration-200 hover:shadow-sm"
    >
      {/* Cover image — aspect-[4/3], no radius, darken on hover */}
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          width={800}
          height={600}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={false}
          className="h-full w-full object-cover transition-[filter] duration-200 group-hover:brightness-95"
        />
      </div>

      {/* Text block */}
      <div className="px-6 py-6 md:px-8 md:py-8">
        {/* Eyebrow + meta row */}
        <div className="flex items-center justify-between gap-3">
          <p className="font-sans text-[12px] font-medium uppercase tracking-wider text-mustard [font-variant-caps:small-caps]">
            {post.categoryLabel}
          </p>
          <p className="shrink-0 font-sans text-[12px] text-concrete">
            {formatPostDate(post.publishedAt)} · {post.readingMinutes} min
          </p>
        </div>

        {/* Title — 2-line clamp, Fraunces */}
        <h3 className="mt-3 line-clamp-2 font-serif text-[22px] leading-tight tracking-tight text-charcoal md:text-[26px]">
          {post.title}
        </h3>

        {/* Excerpt — 3-line clamp */}
        <p className="mt-3 line-clamp-3 font-sans text-[15px] leading-relaxed text-espresso">
          {post.excerpt}
        </p>

        {/* Author */}
        <p className="mt-5 font-sans text-[13px] text-concrete">
          By {post.author.name}
        </p>

        {/* Read arrow — bottom-left, slides 4px right on card hover */}
        <span className="mt-3 inline-flex items-center font-sans text-[14px] font-medium text-mustard">
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            Read →
          </span>
        </span>
      </div>
    </Link>
  )
}
