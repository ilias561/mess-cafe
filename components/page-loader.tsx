'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import {
  CURTAIN_SLIDE_MS,
  LOADER_HOLD_MS,
  LOADING_DURATION_MS,
  UNDERLINE_DURATION_MS,
  WORDMARK_LETTER_DURATION_MS,
  WORDMARK_STAGGER_MS,
} from '@/lib/timing'

const LOADER_DONE_EVENT = 'mess:loader-complete'
const SESSION_KEY = 'mess_loader_seen_v1'

export default function PageLoader() {
  const [visible, setVisible] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(true)

  const letters = useMemo(() => 'M.E.S.S.'.split(''), [])

  const completeLoader = () => {
    ;(window as Window & { __messLoaderComplete?: boolean }).__messLoaderComplete = true
    window.dispatchEvent(new CustomEvent(LOADER_DONE_EVENT))
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasSeenLoader = sessionStorage.getItem(SESSION_KEY) === '1'

    if (prefersReducedMotion || hasSeenLoader) {
      setSkipAnimation(true)
      setVisible(false)
      completeLoader()
      return
    }

    sessionStorage.setItem(SESSION_KEY, '1')
    setSkipAnimation(false)
    setVisible(true)
    const timeout = window.setTimeout(() => setVisible(false), LOADING_DURATION_MS)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  useEffect(() => {
    if (!visible) {
      completeLoader()
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
          transition={{ duration: CURTAIN_SLIDE_MS / 1000, delay: skipAnimation ? 0 : 1.48, ease: EASE }}
        >
          <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex overflow-hidden font-serif text-[clamp(30px,5vw,44px)] tracking-tight text-cream">
              {letters.map((letter, index) => (
                <span key={`${letter}-${index}`} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: WORDMARK_LETTER_DURATION_MS / 1000,
                      ease: EASE,
                      delay: (WORDMARK_STAGGER_MS * index) / 1000,
                    }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </span>
            <motion.span
              className="mt-2 block h-px w-full origin-left bg-terracotta"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: UNDERLINE_DURATION_MS / 1000,
                ease: EASE,
                delay: (((letters.length - 1) * WORDMARK_STAGGER_MS) + WORDMARK_LETTER_DURATION_MS) / 1000,
              }}
            />
            <motion.span
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: EASE,
                delay: ((((letters.length - 1) * WORDMARK_STAGGER_MS) + WORDMARK_LETTER_DURATION_MS + UNDERLINE_DURATION_MS + LOADER_HOLD_MS) / 1000) - 0.2,
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
