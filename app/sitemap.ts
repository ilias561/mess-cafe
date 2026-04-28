import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/posts'
import { getAllEvents } from '@/lib/events/events'

export const dynamic = 'force-static'

const BASE = 'https://mess-cafe.gr'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const events = getAllEvents()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/menu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/actions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/reservations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${BASE}/actions/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes, ...eventRoutes]
}
