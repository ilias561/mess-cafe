import FooterSectionClient from '@/components/footer-section-client'
import { getSettings } from '@/lib/settings'

type FooterVariant = 'full' | 'minimal'

type FooterSectionProps = {
  variant?: FooterVariant
}

export default function FooterSection({ variant = 'full' }: FooterSectionProps) {
  const settings = getSettings()
  return <FooterSectionClient settings={settings} variant={variant} />
}
