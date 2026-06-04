import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import CloudflareAnalytics from '@/components/analytics/CloudflareAnalytics'
import { PHONE_NUMBER } from '@/lib/constants'
import { featuredQuote, reviews } from '@/lib/reviews-data'
import { absoluteUrl, getSiteUrl } from '@/lib/site-url'
import AnchorScroll from '@/components/anchor-scroll'
import PageLoader from '@/components/page-loader'
import DeferredOverlays from '@/components/deferred-overlays'
import RouteScrollTop from '@/components/route-scroll-top'
import SmoothScroll from '@/components/smooth-scroll'
import WhatsAppFloat from '@/components/whatsapp-float'
import MotionProvider from '@/components/motion-provider'
import './globals.css'

/** Fraunces has no Google Fonts Greek subset — Greek serif falls back via adjustFontFallback. */
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
})

const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: true,
  preload: false,
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
  description:
    'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα. Φαγητό ως φάρμακο — poke bowls, acai, smoothies, γλυκά χωρίς ζάχαρη. Ανοιχτά 08:00–23:00, 7 μέρες.',
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
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'M.E.S.S. Café — Ιωάννινα' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M.E.S.S. — Specialty Coffee & Brunch · Ιωάννινα',
    description: 'Specialty coffee, healthy brunch και θέα στη λίμνη στο ΚΕΠΑΒΙ, Ιωάννινα.',
    images: ['/images/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2b2b28',
}

/** First-party review nodes built from the data shown in the on-page reviews section. */
const schemaReviews = [featuredQuote, ...reviews.slice(1, 3)].map((review) => ({
  '@type': 'Review',
  author: { '@type': 'Person', name: review.name },
  reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
  reviewBody: review.text,
}))

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'M.E.S.S.',
  alternateName: 'M.E.S.S. Specialty Coffee & Brunch',
  url: siteUrl,
  logo: absoluteUrl('/icon.svg'),
  image: [
    absoluteUrl('/images/hero-interior.jpg'),
    absoluteUrl('/images/menu/piata-0009.jpg'),
    absoluteUrl('/images/menu/piata-0022.jpg'),
  ],
  hasMenu: absoluteUrl('/food-for-medicine#menu'),
  acceptsReservations: true,
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
  telephone: PHONE_NUMBER,
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
  servesCuisine: ['Greek', 'Brunch', 'Mediterranean'],
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8', // first-party: matches the 4.8 rating chip in components/reviews-section.tsx
    bestRating: '5',
    // TODO(owner): add reviewCount from the live Google Business Profile.
    // Deliberately omitted (not shipped as 0) so we never publish a fabricated
    // count; the AggregateRating becomes rich-result-eligible once this is set.
  },
  review: schemaReviews,
  sameAs: [
    'https://www.instagram.com/m.e.s.s._ioannina/',
    'https://www.facebook.com/people/MESS-Ioannina/61572192848077/',
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
        <link rel="preconnect" href="https://static.cloudflareinsights.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
      </head>
      <body className="bg-forest font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <PageLoader />
          <SmoothScroll />
          <RouteScrollTop />
          <AnchorScroll />
          <WhatsAppFloat />
          {children}
          <DeferredOverlays />
        </MotionProvider>
        <CloudflareAnalytics />
      </body>
    </html>
  )
}
