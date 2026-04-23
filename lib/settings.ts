import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type Settings = {
  addressLine1: string
  addressLine2: string
  phone: string
  whatsapp: string
  email: string
  hours: { day: string; open: string; close: string }[]
  instagram?: string
  facebook?: string
}

export function getSettings(): Settings {
  const file = path.join(process.cwd(), 'content/settings/general.md')
  const raw = fs.readFileSync(file, 'utf8')
  const { data } = matter(raw)
  return data as Settings
}
