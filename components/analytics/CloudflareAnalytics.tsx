'use client'

// Cloudflare Web Analytics is cookieless — no consent banner required.
const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN?.trim()

export default function CloudflareAnalytics() {
  if (!token) return null

  const beacon = JSON.stringify({ token })

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={beacon}
    />
  )
}
