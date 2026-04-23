import FooterSectionClient from '@/components/footer-section-client'
import { getSettings } from '@/lib/settings'

export default function FooterSection() {
  const settings = getSettings()
  return <FooterSectionClient settings={settings} />
}
