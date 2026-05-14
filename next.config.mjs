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
  // rewrites() is incompatible with output:'export' — deploy static `out/` to Cloudflare Pages (see wrangler.toml)
}

export default nextConfig
