import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -80px 0px',
    ...options,
  })
  return { ref, isInView }
}
