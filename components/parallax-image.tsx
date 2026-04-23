'use client'

import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxImage(props: Omit<ImageProps, 'ref'>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div ref={ref} style={{ y }} className="h-full w-full">
      <Image {...props} className={`h-full w-full object-cover ${props.className ?? ''}`} />
    </motion.div>
  )
}
