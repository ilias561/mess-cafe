import type { ReactNode } from 'react'
import Navigation from '@/components/navigation'
import FooterSection from '@/components/footer-section'

type LegalDocumentLayoutProps = {
  title: string
  updatedLabel: string
  children: ReactNode
}

export default function LegalDocumentLayout({
  title,
  updatedLabel,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <main id="main-content" className="bg-bone text-charcoal">
      <Navigation />
      <article className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[720px]">
          <p className="font-sans text-[12px] text-concrete">{updatedLabel}</p>
          <h1 className="mt-4 font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-tight text-charcoal">
            {title}
          </h1>
          <div className="mt-10 space-y-6 font-sans text-[15px] leading-relaxed [&_a]:text-charcoal [&_a]:underline [&_a]:decoration-mustard [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-[22px] [&_h2]:text-charcoal [&_li]:text-concrete [&_p]:text-concrete [&_strong]:text-charcoal [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </article>
      <FooterSection variant="minimal" />
    </main>
  )
}
