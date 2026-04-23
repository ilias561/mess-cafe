import type { BookingFormValues } from '@/lib/reservations/schema'

type SubmitBookingResult = {
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

function buildCallmebotMessage(formData: BookingFormValues) {
  return `🎉 Νέα κράτηση event!\n\n👤 ${formData.name}\n📞 ${formData.phone}\n📧 ${formData.email}\n🎯 ${formData.eventType}\n📅 ${formData.date}\n👥 ${formData.guests} άτομα\n\n${formData.message || ''}`
}

export async function submitBooking(formData: BookingFormValues): Promise<SubmitBookingResult> {
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  if (!web3formsKey) {
    return {
      ok: false,
      message: 'Η φόρμα δεν είναι διαθέσιμη αυτή τη στιγμή. Δοκίμασε ξανά αργότερα.',
    }
  }

  const callmebotPhone = sanitizePhone(process.env.NEXT_PUBLIC_CALLMEBOT_PHONE)
  const callmebotKey = process.env.NEXT_PUBLIC_CALLMEBOT_KEY || ''

  const web3formsPayload = {
    access_key: web3formsKey,
    subject: `Νέα κράτηση event: ${formData.eventType}`,
    from_name: 'M.E.S.S. Website',
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    eventType: formData.eventType,
    date: formData.date,
    guests: formData.guests,
    message: formData.message || '',
    eventSlug: formData.eventSlug || '',
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
    console.warn('CallMeBot request failed:', callmebotResult.reason)
  }

  if (web3formsResult.status === 'rejected') {
    return {
      ok: false,
      message: 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.',
    }
  }

  if (!web3formsResult.value.ok) {
    const payload = (await web3formsResult.value.json().catch(() => null)) as Web3FormsPayload | null
    return {
      ok: false,
      message: getWeb3FormsErrorMessage(payload),
    }
  }

  const payload = (await web3formsResult.value.json().catch(() => null)) as Web3FormsPayload | null
  if (payload && payload.success === false) {
    return {
      ok: false,
      message: getWeb3FormsErrorMessage(payload),
    }
  }

  return { ok: true }
}
