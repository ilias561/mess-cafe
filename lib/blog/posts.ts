import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Post, PostCategory } from './types'

export type { Post, PostCategory }

const CATEGORY_LABELS: Record<PostCategory, string> = {
  kafes: 'Καφές',
  kouzina: 'Κουζίνα',
  koinotita: 'Κοινότητα',
  events: 'Events',
}

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'))
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const category = data.category as PostCategory
    const slug = (data.slug as string | undefined) ?? file.replace(/\.md$/, '')

    return {
      ...data,
      slug,
      category,
      body: content.trim(),
      categoryLabel: CATEGORY_LABELS[category],
      cover: data.cover as string,
    } as Post
  })

  return posts.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, category: PostCategory, limit = 3): Post[] {
  const posts = getAllPosts().filter((post) => post.slug !== currentSlug)
  const sameCategory = posts.filter((post) => post.category === category)
  const fallback = posts.filter((post) => post.category !== category)
  return [...sameCategory, ...fallback].slice(0, limit)
}
