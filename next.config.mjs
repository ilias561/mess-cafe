import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Parent dirs may contain another package-lock.json; pin workspace root for Turbopack.
  turbopack: {
    root: __dirname,
  },
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns', 'recharts'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // redirects()/rewrites() are incompatible with output:'export'.
  // /menu → /food-for-medicine#menu is handled by public/_redirects (Cloudflare Pages).
}

export default nextConfig
