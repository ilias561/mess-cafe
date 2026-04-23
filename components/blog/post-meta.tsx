import Image from 'next/image'
import { formatPostDate } from '@/lib/blog/format-date'
import type { Post } from '@/lib/blog/posts'

type PostMetaProps = {
  post: Pick<Post, 'publishedAt' | 'readingMinutes' | 'author'>
  showAvatar?: boolean
  className?: string
  light?: boolean
}

export default function PostMeta({ post, showAvatar = false, className = '', light = false }: PostMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 font-sans text-[12px] ${light ? 'text-bone/70' : 'text-concrete'} ${className}`}>
      {showAvatar && post.author.avatar ? (
        <Image
          src={post.author.avatar}
          alt={`Φωτογραφία ${post.author.name}`}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : null}
      <span>{post.author.name}</span>
      <span aria-hidden>·</span>
      <span>{formatPostDate(post.publishedAt)}</span>
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} λεπτά ανάγνωσης</span>
    </div>
  )
}
