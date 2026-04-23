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
  light?: boolean
}

export default function CategoryPill({ category, label, className = '', light = false }: CategoryPillProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.16em] ${
        light ? 'border-bone/30 bg-bone/10 text-bone' : categoryStyles[category]
      } ${className}`}
    >
      {label}
    </span>
  )
}
