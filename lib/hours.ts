type HourEntry = {
  day: string
  open: string
  close: string
}

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

export type OpenStatus = {
  open: boolean
  isOpen: boolean
  label: string
  nextChangeLabel: string | null
}

function parseClock(value: string): number | null {
  const [hours, minutes] = value.split(':').map(Number)
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null
  }
  return hours * 60 + minutes
}

export function getOpenStatus(hours?: HourEntry[]): OpenStatus {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  if (!hours || hours.length === 0) {
    const isOpen = currentMinutes >= 480 && currentMinutes < 1320
    return isOpen
      ? { open: true, isOpen: true, label: 'Ανοιχτά τώρα', nextChangeLabel: 'μέχρι 22:00' }
      : { open: false, isOpen: false, label: 'Κλειστά · Ανοίγουμε στις 08:00', nextChangeLabel: 'στις 08:00' }
  }

  const todayKey = DAY_KEYS[now.getDay()]
  const todayHours = hours.find((entry) => entry.day.toLowerCase().slice(0, 3) === todayKey)

  if (!todayHours) {
    return { open: false, isOpen: false, label: 'Κλειστά σήμερα', nextChangeLabel: null }
  }

  const openMinutes = parseClock(todayHours.open)
  const closeMinutes = parseClock(todayHours.close)
  if (openMinutes === null || closeMinutes === null) {
    return { open: false, isOpen: false, label: 'Ωράριο μη διαθέσιμο', nextChangeLabel: null }
  }

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes
  return isOpen
    ? { open: true, isOpen: true, label: 'Ανοιχτά τώρα', nextChangeLabel: `μέχρι ${todayHours.close}` }
    : {
        open: false,
        isOpen: false,
        label: `Κλειστά · Ανοίγουμε στις ${todayHours.open}`,
        nextChangeLabel: `στις ${todayHours.open}`,
      }
}
