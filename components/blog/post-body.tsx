import Image from 'next/image'

type PostBodyProps = {
  markdown: string
}

export default function PostBody({ markdown }: PostBodyProps) {
  const blocks = markdown
    .trim()
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean)

  const renderInline = (text: string) => {
    const segments = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).filter(Boolean)
    return segments.map((segment, index) => {
      const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        return (
          <a
            key={`${label}-${index}`}
            href={href}
            className="underline decoration-mustard decoration-[1.5px] underline-offset-[6px] transition-colors duration-300 hover:text-olive"
          >
            {label}
          </a>
        )
      }

      if (segment.startsWith('`') && segment.endsWith('`')) {
        return (
          <code key={`${segment}-${index}`} className="rounded-[2px] bg-bone-warm px-1.5 py-0.5 font-mono text-[14px]">
            {segment.slice(1, -1)}
          </code>
        )
      }

      return <span key={`${segment}-${index}`}>{segment}</span>
    })
  }

  const renderBlock = (block: string, index: number) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={`h2-${index}`} className="mt-16 mb-6 font-serif text-[clamp(28px,3.4vw,40px)] leading-[1.1] tracking-[-0.01em] text-charcoal">
          {block.replace(/^## /, '')}
        </h2>
      )
    }

    if (block.startsWith('### ')) {
      return (
        <h3 key={`h3-${index}`} className="mt-12 mb-4 font-serif text-[clamp(22px,2.4vw,28px)] text-charcoal">
          {block.replace(/^### /, '')}
        </h3>
      )
    }

    if (block.startsWith('> ')) {
      return (
        <blockquote
          key={`quote-${index}`}
          className="my-10 border-l-2 border-mustard pl-6 font-serif text-[22px] md:text-[26px] italic leading-[1.4] text-charcoal"
        >
          {renderInline(block.replace(/^>\s*/, ''))}
        </blockquote>
      )
    }

    if (block.startsWith('![')) {
      const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (!imageMatch) return null
      const [, alt, src] = imageMatch

      return (
        <figure key={`img-${index}`} className="my-10">
          <Image
            src={src}
            alt={alt || 'Εικόνα άρθρου'}
            width={1400}
            height={900}
            className="h-auto w-full rounded-[2px]"
          />
          {alt ? (
            <figcaption className="mt-3 font-sans text-[11px] uppercase tracking-[0.2em] text-olive">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      )
    }

    if (block.startsWith('- ')) {
      const items = block.split('\n').map((item) => item.replace(/^- /, '').trim()).filter(Boolean)
      return (
        <ul key={`ul-${index}`} className="my-6 list-disc space-y-2 pl-6 marker:text-mustard">
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      )
    }

    return (
      <p key={`p-${index}`} className="mb-6">
        {renderInline(block)}
      </p>
    )
  }

  return (
    <section className="px-6 py-14 md:px-12 md:py-16">
      <div className="mx-auto max-w-[72ch] font-sans text-[17px] md:text-[18px] leading-[1.75] text-charcoal">
        {blocks.map(renderBlock)}
      </div>
    </section>
  )
}
