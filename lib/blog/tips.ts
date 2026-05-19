import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type Tip = {
  slug: string
  title: string
  image: string
  instagramUrl: string
}

const TIPS_DIR = path.join(process.cwd(), 'content/tips')

export function getAllTips(): Tip[] {
  if (!fs.existsSync(TIPS_DIR)) return []

  return fs
    .readdirSync(TIPS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(TIPS_DIR, file), 'utf8')
      const { data } = matter(raw)
      const slug = (data.slug as string | undefined) ?? file.replace(/\.md$/, '')
      return {
        slug,
        title: String(data.title ?? slug),
        image: String(data.image ?? ''),
        instagramUrl: String(data.instagramUrl ?? ''),
      }
    })
}
