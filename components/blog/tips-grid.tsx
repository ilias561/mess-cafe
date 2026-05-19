'use client'

import { FadeImage } from '@/components/fade-image'
import type { Tip } from '@/lib/blog/tips'

const PLACEHOLDER_COUNT = 6

export default function TipsGrid({ tips }: { tips: Tip[] }) {
  if (tips.length === 0) {
    // TODO(user): add markdown tips in content/tips/ (title, image, instagramUrl frontmatter)
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-[2px] border border-dashed border-line/50 bg-bone-warm"
            aria-hidden
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
      {tips.map((tip) => (
        <a
          key={tip.slug}
          href={tip.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-[2px] bg-bone-warm"
        >
          <div className="relative aspect-square">
            {tip.image ? (
              <FadeImage
                src={tip.image}
                alt={tip.title}
                fill
                unoptimized
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : null}
          </div>
          <p className="p-3 font-sans text-[12px] font-medium text-charcoal">{tip.title}</p>
        </a>
      ))}
    </div>
  )
}
