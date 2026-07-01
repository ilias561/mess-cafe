/**
 * Cloudflare Pages Function — newsletter subscribe proxy.
 *
 * Keeps the Brevo API key server-side (env.BREVO_API_KEY) so it never ships to
 * the browser, unlike the old NEXT_PUBLIC_ client path. The newsletter forms
 * POST same-origin to /api/subscribe → this Function → Brevo.
 *
 * Env vars (Cloudflare Pages → Settings → Variables & Secrets; or .dev.vars for
 * `wrangler pages dev`):
 *   BREVO_API_KEY          (SECRET)   contacts-scoped Brevo key
 *   BREVO_LIST_ID          (var)      numeric id of the Brevo contact list
 *   BREVO_DOI_TEMPLATE_ID  (var, opt) Brevo double-opt-in template id. Set it to
 *                                     send a confirmation email (recommended);
 *                                     omit for single opt-in.
 *   BREVO_DOI_REDIRECT_URL (var, opt) where the confirm link lands
 *                                     (default https://messcafe.gr/thank-you/)
 */

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS })
}

export async function onRequestPost({ request, env }) {
  let payload
  try {
    payload = await request.json()
  } catch {
    return json(400, { ok: false, message: 'Μη έγκυρο αίτημα.' })
  }

  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : ''
  const consent = payload?.consent === true
  const honeypot = typeof payload?._gotcha === 'string' ? payload._gotcha.trim() : ''

  // Bot filled the hidden field — accept silently, never touch Brevo.
  if (honeypot) return json(200, { ok: true, pending: false })

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json(400, { ok: false, message: 'Μη έγκυρο email.' })
  }
  if (!consent) {
    return json(400, { ok: false, message: 'Απαιτείται η συγκατάθεσή σου.' })
  }

  const apiKey = env.BREVO_API_KEY
  const listId = Number(env.BREVO_LIST_ID)
  if (!apiKey || !Number.isFinite(listId)) {
    console.log('Newsletter not configured (BREVO_API_KEY / BREVO_LIST_ID missing)')
    return json(503, { ok: false, message: 'Η εγγραφή δεν είναι διαθέσιμη προς το παρόν.' })
  }

  const doiTemplateId = Number(env.BREVO_DOI_TEMPLATE_ID)
  const useDoi = Number.isFinite(doiTemplateId) && doiTemplateId > 0

  const brevoHeaders = {
    'content-type': 'application/json',
    accept: 'application/json',
    'api-key': apiKey,
  }

  // Brevo returns 400 with a duplicate/"already exist" code when the contact is
  // already on the list — that's a success from the visitor's point of view.
  const isAlreadySubscribed = (status, detail) =>
    status === 400 && /exist|duplicate/i.test(detail)

  try {
    if (useDoi) {
      // Double opt-in: Brevo emails a confirmation link; the contact is added to
      // the list only after the visitor clicks it.
      const redirectUrl = env.BREVO_DOI_REDIRECT_URL || 'https://messcafe.gr/thank-you/'
      const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
        method: 'POST',
        headers: brevoHeaders,
        body: JSON.stringify({
          email,
          includeListIds: [listId],
          templateId: doiTemplateId,
          redirectionUrl: redirectUrl,
        }),
      })
      if (res.ok) return json(200, { ok: true, pending: true })
      const detail = await res.text()
      if (isAlreadySubscribed(res.status, detail)) return json(200, { ok: true, pending: false })
      console.log('Brevo DOI error', res.status, detail)
      return json(502, { ok: false, message: 'Δεν ήταν δυνατή η εγγραφή. Δοκίμασε ξανά.' })
    }

    // Single opt-in: add/update the contact directly.
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    })
    if (res.ok) return json(200, { ok: true, pending: false })
    const detail = await res.text()
    if (isAlreadySubscribed(res.status, detail)) return json(200, { ok: true, pending: false })
    console.log('Brevo contact error', res.status, detail)
    return json(502, { ok: false, message: 'Δεν ήταν δυνατή η εγγραφή. Δοκίμασε ξανά.' })
  } catch (err) {
    console.log('Newsletter proxy exception', err && err.message)
    return json(502, { ok: false, message: 'Σφάλμα δικτύου. Δοκίμασε ξανά.' })
  }
}
