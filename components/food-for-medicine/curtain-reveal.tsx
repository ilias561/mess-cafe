'use client'

import { startTransition, useEffect, useState } from 'react'
import { m, useReducedMotion, AnimatePresence } from 'framer-motion'

const SESSION_KEY = 'ffm-curtain-shown'

export default function CurtainReveal() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined') return
    if (window.location.hash) return
    if (sessionStorage.getItem(SESSION_KEY) === '1') return
    sessionStorage.setItem(SESSION_KEY, '1')
    startTransition(() => setShow(true))
  }, [reduce])

  return (
    <AnimatePresence>
      {show ? (
        <m.div
          key="curtain"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100]"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <m.div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                'linear-gradient(90deg, #0e2208 0%, #1d3a16 70%, #2d5a27 100%)',
              boxShadow: 'inset -1px 0 0 rgba(232,181,71,0.55)',
            }}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ delay: 0.35, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setShow(false)}
          />
          <m.div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background:
                'linear-gradient(270deg, #0e2208 0%, #1d3a16 70%, #2d5a27 100%)',
              boxShadow: 'inset 1px 0 0 rgba(232,181,71,0.55)',
            }}
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ delay: 0.35, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <m.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.8] }}
            transition={{ duration: 0.6, times: [0, 0.3, 0.7, 1], ease: 'easeOut' }}
          >
            <span className="block h-2 w-2 rounded-full bg-mustard shadow-[0_0_24px_rgba(232,181,71,0.8)]" />
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
