export function formatGreekDate(iso: string): string {
  return new Intl.DateTimeFormat('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

export function formatGreekTime(iso: string): string {
  return new Intl.DateTimeFormat('el-GR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(iso))
}
