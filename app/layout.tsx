import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import AnchorScroll from '@/components/anchor-scroll'
import NewsletterPopup from '@/components/newsletter-popup'
import PageLoader from '@/components/page-loader'
import RouteScrollTop from '@/components/route-scroll-top'
import WhatsAppFloat from '@/components/whatsapp-float'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mess-cafe.gr'),
  title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
  description:
    'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα. Φαγητό ως φάρμακο — poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη. Ανοιχτά 08:00–23:00, 7 μέρες.',
  keywords: ['specialty coffee Ioannina', 'καφές Ιωάννινα', 'brunch Ioannina', 'MESS café', 'ΚΕΠΑΒΙ', 'vegan Ioannina', 'acai bowl', 'poke bowl', 'υγιεινό φαγητό Ιωάννινα', 'καφέ λίμνη Ιωαννίνων'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
    description:
      'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα. Φαγητό ως φάρμακο — poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη. Ανοιχτά 08:00–23:00.',
    type: 'website',
    locale: 'el_GR',
    images: [{ url: '/images/hero-interior.jpg', width: 1200, height: 630, alt: 'M.E.S.S. Café — Ιωάννινα' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
    description: 'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα.',
    images: ['/images/hero-interior.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2b2b28',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'M.E.S.S.',
  alternateName: 'M.E.S.S. Specialty Coffee & Brunch',
  url: 'https://mess-cafe.gr',
  logo: 'https://mess-cafe.gr/icon.svg',
  image: 'https://mess-cafe.gr/images/hero-interior.jpg',
  description: 'Specialty coffee, healthy brunch και πολιτιστικές δράσεις στο ΚΕΠΑΒΙ, Ιωάννινα. Poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ναπολέοντος Ζέρβα 12',
    addressLocality: 'Ιωάννινα',
    postalCode: '45332',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.6624739,
    longitude: 20.8602479,
  },
  telephone: '+302651000000',
  email: 'info@messcafe.gr',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '09:00',
      closes: '24:00',
    },
  ],
  servesCuisine: ['Specialty Coffee', 'Healthy Brunch', 'Vegan', 'Acai Bowl', 'Poke Bowl'],
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  sameAs: [
    'https://www.instagram.com/m.e.s.s._ioannina/',
    'https://www.facebook.com/messcafe',
    'https://www.google.com/maps/place/M.E.S.S./@39.6624739,20.8602479',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="el" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PageLoader />
        <RouteScrollTop />
        <AnchorScroll />
        <WhatsAppFloat />
        <NewsletterPopup />
        {children}
      </body>
    </html>
  )
}
