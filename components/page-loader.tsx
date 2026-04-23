'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const MIN_MS = 950

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const started = performance.now()

    const finish = () => {
      const elapsed = performance.now() - started
      window.setTimeout(() => setVisible(false), Math.max(0, MIN_MS - elapsed))
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => window.removeEventListener('load', finish)
  }, [])

  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bone"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
        >
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.45, ease: EASE } }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className="font-serif text-[clamp(28px,6vw,40px)] font-medium tracking-tight text-charcoal">M.E.S.S.</span>
            <motion.div
              className="h-px w-28 origin-center bg-olive/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
            />
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-concrete">Specialty · Ioannina</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
