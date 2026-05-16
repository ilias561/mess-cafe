import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/posts'
import { getAllEvents } from '@/lib/events/events'
import { absoluteUrl, getSiteUrl } from '@/lib/site-url'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const posts = getAllPosts()
  const events = getAllEvents()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/menu'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    {
      url: absoluteUrl('/reservations'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    { url: absoluteUrl('/actions'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/blog'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/privacy'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: absoluteUrl('/cookies'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: absoluteUrl('/terms'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: absoluteUrl(`/actions/${event.slug}`),
    lastModified: event.date ? new Date(event.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...eventRoutes]
}
