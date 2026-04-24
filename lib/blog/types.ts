export type PostCategory = 'kafes' | 'kouzina' | 'koinotita' | 'events'

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  categoryLabel: string
  cover: string
  coverAlt: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string
  readingMinutes: number
  featured?: boolean
  body: string
  tags?: string[]
}
