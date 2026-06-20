import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/posts'
import { getAllEvents } from '@/lib/events/events'
import { pageUrl } from '@/lib/site-url'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const events = getAllEvents()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: pageUrl('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: pageUrl('/reservations'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: pageUrl('/actions'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: pageUrl('/food-for-medicine'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: pageUrl('/workshops'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: pageUrl('/reviews'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: pageUrl('/privacy'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: pageUrl('/cookies'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: pageUrl('/terms'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: pageUrl(`/food-for-medicine/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: pageUrl(`/actions/${event.slug}`),
    lastModified: event.date ? new Date(event.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...eventRoutes]
}
