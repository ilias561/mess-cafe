type ContactFormValues = {
  name: string
  email: string
  message: string
}

type SubmitContactResult = {
  ok: boolean
  message?: string
}

type Web3FormsPayload = {
  success?: boolean
  message?: string
}

function sanitizePhone(value: string | undefined) {
  return (value || '').replace(/[^\d]/g, '')
}

function getWeb3FormsErrorMessage(payload: Web3FormsPayload | null) {
  if (!payload?.message) return 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.'
  if (payload.message.toLowerCase().includes('access key')) {
    return 'Λάθος ρύθμιση φόρμας. Επικοινώνησε με την ομάδα μας.'
  }
  return payload.message
}

function buildCallmebotMessage(formData: ContactFormValues) {
  return `💬 Νέο μήνυμα από το website\n\n👤 ${formData.name}\n📧 ${formData.email}\n\n${formData.message}`
}

export async function submitContact(formData: ContactFormValues): Promise<SubmitContactResult> {
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  if (!web3formsKey) {
    return { ok: false, message: 'Η φόρμα δεν είναι διαθέσιμη αυτή τη στιγμή. Δοκίμασε ξανά αργότερα.' }
  }

  const callmebotPhone = sanitizePhone(process.env.NEXT_PUBLIC_CALLMEBOT_PHONE)
  const callmebotKey = process.env.NEXT_PUBLIC_CALLMEBOT_KEY || ''

  const web3formsPayload = {
    access_key: web3formsKey,
    subject: `Νέο μήνυμα επικοινωνίας από ${formData.name}`,
    from_name: 'M.E.S.S. Website',
    name: formData.name,
    email: formData.email,
    message: formData.message,
  }

  const web3formsRequest = fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(web3formsPayload),
  })

  const callmebotMessage = buildCallmebotMessage(formData)
  const callmebotRequest = callmebotPhone && callmebotKey
    ? fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${callmebotPhone}&text=${encodeURIComponent(callmebotMessage)}&apikey=${callmebotKey}`,
      )
    : Promise.resolve(null)

  const [web3formsResult, callmebotResult] = await Promise.allSettled([web3formsRequest, callmebotRequest])

  if (callmebotResult.status === 'rejected') {
    console.warn('CallMeBot contact request failed:', callmebotResult.reason)
  }

  if (web3formsResult.status === 'rejected') {
    return { ok: false, message: 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.' }
  }

  const response = web3formsResult.value
  const payload = (await response.json().catch(() => null)) as Web3FormsPayload | null
  if (!response.ok || payload?.success === false) {
    return { ok: false, message: getWeb3FormsErrorMessage(payload) }
  }

  return { ok: true }
}
