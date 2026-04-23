import type { PostCategory } from '@/lib/blog/posts'

const categoryStyles: Record<PostCategory, string> = {
  kafes: 'border-mustard/50 text-charcoal',
  kouzina: 'border-olive/40 text-olive',
  koinotita: 'border-charcoal/30 text-charcoal',
  events: 'border-amber/60 text-charcoal',
}

type CategoryPillProps = {
  category: PostCategory
  label: string
  className?: string
}

export default function CategoryPill({ category, label, className = '' }: CategoryPillProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.16em] ${categoryStyles[category]} ${className}`}
    >
      {label}
    </span>
  )
}
