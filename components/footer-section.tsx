import FooterSectionClient from '@/components/footer-section-client'
import { getSettings } from '@/lib/settings'

type Props = {
  variant?: 'full' | 'minimal'
}

export default function FooterSection({ variant }: Props) {
  const settings = getSettings()
  return <FooterSectionClient settings={settings} variant={variant} />
}
