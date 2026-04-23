import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import PageLoader from '@/components/page-loader'
import ScrollProgress from '@/components/scroll-progress'
import SmoothScroll from '@/components/smooth-scroll'
import WhatsAppFloat from '@/components/whatsapp-float'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
  description:
    'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα. Φαγητό ως φάρμακο — poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη. Ανοιχτά 08:00–22:00, 7 μέρες.',
  keywords: ['specialty coffee Ioannina', 'καφές Ιωάννινα', 'brunch Ioannina', 'MESS café', 'ΚΕΠΑΒΙ', 'vegan Ioannina', 'acai bowl', 'poke bowl', 'υγιεινό φαγητό Ιωάννινα', 'καφέ λίμνη Ιωαννίνων'],
  openGraph: {
    title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
    description:
      'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα. Φαγητό ως φάρμακο — poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη. Ανοιχτά 08:00–22:00.',
    type: 'website',
    locale: 'el_GR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="el" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PageLoader />
        <ScrollProgress />
        <WhatsAppFloat />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
