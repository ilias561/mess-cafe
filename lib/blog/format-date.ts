import { formatGreekDate } from '@/lib/format-date'

export function formatPostDate(iso: string): string {
  return formatGreekDate(iso)
}
