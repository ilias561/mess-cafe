import type { BookingFormValues } from '@/lib/reservations/schema'

type SubmitBookingResult = {
  ok: boolean
  message?: string
}

function buildCallmebotMessage(formData: BookingFormValues) {
  return `🎉 Νέα κράτηση event!\n\n👤 ${formData.name}\n📞 ${formData.phone}\n📧 ${formData.email}\n🎯 ${formData.eventType}\n📅 ${formData.date}\n👥 ${formData.guests} άτομα\n\n${formData.message || ''}`
}

export async function submitBooking(formData: BookingFormValues): Promise<SubmitBookingResult> {
  const web3formsPayload = {
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
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
  const callmebotRequest = fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${process.env.NEXT_PUBLIC_CALLMEBOT_PHONE || ''}&text=${encodeURIComponent(callmebotMessage)}&apikey=${process.env.NEXT_PUBLIC_CALLMEBOT_KEY || ''}`,
  )

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
    return {
      ok: false,
      message: 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.',
    }
  }

  const payload = (await web3formsResult.value.json().catch(() => null)) as { success?: boolean } | null
  if (payload && payload.success === false) {
    return {
      ok: false,
      message: 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.',
    }
  }

  return { ok: true }
}
