'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const LOADER_DONE_EVENT = 'mess:loader-complete'
const CURTAIN_TOTAL_MS = 1200

export default function PageLoader() {
  const pathname = usePathname()
  const isFirstPath = useRef(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    if (!isFirstPath.current) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    isFirstPath.current = false

    const timeout = window.setTimeout(() => setVisible(false), CURTAIN_TOTAL_MS)
    return () => window.clearTimeout(timeout)
  }, [pathname])

  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  useEffect(() => {
    if (!visible) {
      window.dispatchEvent(new CustomEvent(LOADER_DONE_EVENT))
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] overflow-hidden bg-espresso"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          <motion.span
            className="absolute left-1/2 top-[17%] -translate-x-1/2 font-serif text-[clamp(26px,4vw,34px)] tracking-tight text-bone"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
            transition={{ duration: 1.2, times: [0, 0.33, 0.66, 1], ease: EASE }}
          >
            M.E.S.S.
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
