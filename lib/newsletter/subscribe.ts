type NewsletterSubscribeResult = {
  ok: boolean
  /** true when a double-opt-in confirmation email was sent (visitor must click) */
  pending?: boolean
  message?: string
}

// The Brevo key lives server-side in the Cloudflare Pages Function at
// /api/subscribe (functions/api/subscribe.js) — never in this client bundle.
// In `next dev` / a plain static preview that endpoint doesn't exist, so the
// call fails and the form shows an error; use `wrangler pages dev out` to test.
export async function subscribeToNewsletter(
  email: string,
  consent = true,
  honeypot = '',
): Promise<NewsletterSubscribeResult> {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, consent, _gotcha: honeypot }),
    })
    const data = (await response.json().catch(() => null)) as NewsletterSubscribeResult | null
    if (!response.ok || !data?.ok) {
      return { ok: false, message: data?.message ?? 'Δεν ήταν δυνατή η εγγραφή. Δοκίμασε ξανά.' }
    }
    return { ok: true, pending: Boolean(data.pending) }
  } catch {
    return { ok: false, message: 'Σφάλμα δικτύου. Δοκίμασε ξανά.' }
  }
}
