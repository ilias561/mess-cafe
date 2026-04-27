'use client'

import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '@/lib/contact/submit'
import { EASE } from '@/lib/motion'

const INPUT_BASE =
  'w-full rounded-[3px] border border-bone/20 bg-white/5 px-4 py-3.5 font-sans text-[15px] text-bone placeholder:text-bone/35 transition-all duration-150 focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')
    setErrorMsg('')
    setSending(true)
    const form = event.currentTarget
    const fd = new FormData(form)

    if (String(fd.get('_gotcha') || '').trim()) {
      setSending(false)
      return
    }

    try {
      const result = await submitContact({
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        message: String(fd.get('message') || ''),
      })
      if (!result.ok) {
        setStatus('error')
        setErrorMsg(result.message || 'Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά.')
      } else {
        setStatus('success')
        form.reset()
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-28 bg-olive-deep px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-5">

          {/* Left: heading */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-sans text-[11px] uppercase tracking-[0.22em] text-mustard/80"
            >
              ΕΠΙΚΟΙΝΩΝΙΑ
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.08 }}
              className="mt-4 font-serif text-[clamp(32px,4.5vw,56px)] leading-[1.05] tracking-tight text-bone"
            >
              Πες μας τι σκέφτεσαι.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
              className="mt-5 font-sans text-[15px] leading-relaxed text-bone/60"
            >
              Ερωτήσεις, συνεργασίες, παρατηρήσεις — όλα καλοδεχούμενα. Απαντάμε μέσα σε 24 ώρες.
            </motion.p>
          </div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
            aria-live="polite"
          >
            {status === 'success' ? (
              <div className="rounded-2xl border border-bone/15 bg-bone/5 p-8">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-mustard/80">ΕΥΧΑΡΙΣΤΟΥΜΕ</p>
                <h3 className="mt-3 font-serif text-[clamp(24px,3vw,34px)] leading-[1.1] text-bone">
                  Λάβαμε το μήνυμά σου!
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-bone/60">
                  Θα επικοινωνήσουμε μαζί σου σύντομα.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-sans text-[11px] uppercase tracking-[0.18em] text-bone/50">Όνομα</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Όνομα"
                    className={INPUT_BASE}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-sans text-[11px] uppercase tracking-[0.18em] text-bone/50">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    className={INPUT_BASE}
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="contact-message" className="font-sans text-[11px] uppercase tracking-[0.18em] text-bone/50">Μήνυμα</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Μήνυμα"
                    className={`${INPUT_BASE} resize-none`}
                  />
                </div>
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                {status === 'error' && (
                  <p className="font-sans text-[12px] text-red-300 md:col-span-2">
                    {errorMsg}
                  </p>
                )}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="rounded-full bg-mustard px-8 py-3.5 font-sans text-[13px] uppercase tracking-[0.18em] text-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber hover:shadow-lg disabled:opacity-70"
                  >
                    {sending ? 'Αποστολή...' : 'Στείλε μήνυμα'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
