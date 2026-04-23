type NewsletterSubscribeResult = {
  ok: boolean
  message?: string
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscribeResult> {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY
  const listIdRaw = process.env.NEXT_PUBLIC_BREVO_LIST_ID
  const listId = Number(listIdRaw)

  // This key must be scoped to contacts:write only and rotated if leaked.
  if (!apiKey || !listIdRaw || !Number.isFinite(listId)) {
    console.info('Newsletter not configured')
    return { ok: true }
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    })

    if (!response.ok) {
      return { ok: false, message: 'Δεν ήταν δυνατή η εγγραφή. Δοκίμασε ξανά.' }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: 'Σφάλμα δικτύου. Δοκίμασε ξανά.' }
  }
}
