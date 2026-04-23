type ContactFormValues = {
  name: string
  email: string
  message: string
}

type SubmitContactResult = {
  ok: boolean
  message?: string
}

function buildCallmebotMessage(formData: ContactFormValues) {
  return `💬 Νέο μήνυμα από το website\n\n👤 ${formData.name}\n📧 ${formData.email}\n\n${formData.message}`
}

export async function submitContact(formData: ContactFormValues): Promise<SubmitContactResult> {
  const web3formsPayload = {
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
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
  const callmebotRequest = fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${process.env.NEXT_PUBLIC_CALLMEBOT_PHONE || ''}&text=${encodeURIComponent(callmebotMessage)}&apikey=${process.env.NEXT_PUBLIC_CALLMEBOT_KEY || ''}`,
  )

  const [web3formsResult, callmebotResult] = await Promise.allSettled([web3formsRequest, callmebotRequest])

  if (callmebotResult.status === 'rejected') {
    console.warn('CallMeBot contact request failed:', callmebotResult.reason)
  }

  if (web3formsResult.status === 'rejected') {
    return { ok: false, message: 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.' }
  }

  const response = web3formsResult.value
  const payload = (await response.json().catch(() => null)) as { success?: boolean } | null
  if (!response.ok || payload?.success === false) {
    return { ok: false, message: 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.' }
  }

  return { ok: true }
}
