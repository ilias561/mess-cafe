'use client'

import { useState, type FormEvent } from 'react'
import { subscribeToNewsletter } from '@/lib/newsletter/subscribe'

// Standalone newsletter band for the #KeepRising (/actions) page — sits below
// the content, above the footer. Reuses the Brevo path (subscribeToNewsletter
// returns ok when unconfigured, so it never hard-fails in prod).
export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const disabled = status === 'loading' || !consent || email.trim().length === 0

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (disabled) return
    setStatus('loading')
    setError('')
    const result = await subscribeToNewsletter(email.trim())
    if (!result.ok) {
      setStatus('error')
      setError(result.message ?? 'Δεν ήταν δυνατή η εγγραφή. Δοκίμασε ξανά.')
      return
    }
    setStatus('success')
  }

  return (
    <section className="bg-bone-warm px-6 py-20 text-charcoal md:px-12 md:py-24">
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <span aria-hidden className="block h-px w-10 bg-mustard" />
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-mustard/80">
            NEWSLETTER · #KEEPRISING
          </span>
          <span aria-hidden className="block h-px w-10 bg-mustard" />
        </div>
        <h2 className="u-balance mt-5 font-serif text-[clamp(28px,4vw,44px)] leading-[1.1] text-charcoal">
          Μείνε στο <span className="italic text-mustard">κίνημα</span>.
        </h2>
        <p className="mt-4 max-w-[46ch] font-sans text-[15px] leading-relaxed text-charcoal/70 md:text-[16px]">
          Ιστορίες, δράσεις και events — μία φορά τον μήνα. Χωρίς spam.
        </p>

        {status === 'success' ? (
          <p className="mt-7 inline-flex rounded-[2px] bg-mustard/12 px-4 py-3 font-sans text-[14px] text-charcoal ring-1 ring-mustard/40">
            Ευχαριστούμε! Έλεγξε το email σου για επιβεβαίωση.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-7 flex w-full max-w-[520px] flex-col gap-3" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="kr-newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="kr-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="ui-field min-h-[44px] w-full flex-1 rounded-full border border-line/70 bg-charcoal/10 px-5 py-3 font-sans text-[15px] text-charcoal placeholder:text-charcoal/50"
              />
              <button
                type="submit"
                disabled={disabled}
                className="ui-interactive inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-mustard px-8 py-3 font-sans text-sm font-medium text-ink-dark hover:bg-amber disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? 'Αποστολή...' : 'Εγγραφή'}
              </button>
            </div>
            <label className="flex items-start justify-center gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-mustard"
              />
              <span className="font-sans text-[12px] leading-snug text-charcoal/60">
                Συμφωνώ να λαμβάνω ενημερώσεις μέσω email.
              </span>
            </label>
            {status === 'error' && <p className="font-sans text-[12px] text-amber">{error}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
