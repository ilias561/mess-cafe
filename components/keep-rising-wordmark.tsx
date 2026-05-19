type KeepRisingWordmarkProps = {
  className?: string
  as?: 'h2' | 'p' | 'span'
}

/** Uppercase Fraunces wordmark — use for #KEEPRISING brand moments site-wide. */
export default function KeepRisingWordmark({ className = '', as: Tag = 'h2' }: KeepRisingWordmarkProps) {
  return (
    <Tag
      className={`font-serif font-semibold uppercase tracking-[-0.02em] text-olive-deep ${className}`}
      style={{ fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: 1 }}
    >
      #KEEPRISING
    </Tag>
  )
}
