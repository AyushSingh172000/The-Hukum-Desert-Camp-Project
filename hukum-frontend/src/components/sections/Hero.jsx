import { useRef, useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SITE } from '../../constants'
import Button from '../common/Button'
import BookingWidget from './BookingWidget'
import './Hero.css'

/* ── Taglines that cycle ──────────────────────────────────── */
const TAGLINES = [
  { text: 'केसरिया बालम… पधारो म्हारे देस', lang: 'hi', cls: 'tagline-devanagari' },
  { text: 'Welcome to Jaisalmer',              lang: 'en', cls: 'hero__tagline--en'  },
]

/* ── Cycling typewriter ───────────────────────────────────── */
function CyclingTypewriter() {
  const [started, setStarted] = useState(false)
  const [idx,     setIdx]     = useState(0)
  const [count,   setCount]   = useState(0)
  const [phase,   setPhase]   = useState('typing') // 'typing' | 'deleting'

  // [...text] splits string into proper Unicode code-points (Devanagari safe)
  const chars = useMemo(() => [...TAGLINES[idx].text], [idx])
  const current = TAGLINES[idx]

  // Small delay so the hero title finishes animating first
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!started) return
    let t

    if (phase === 'typing') {
      if (count < chars.length) {
        // Type next character
        t = setTimeout(() => setCount(c => c + 1), 70)
      } else {
        // Fully typed — hold, then start deleting
        t = setTimeout(() => setPhase('deleting'), 2200)
      }
    } else {
      // deleting
      if (count > 0) {
        t = setTimeout(() => setCount(c => c - 1), 38)
      } else {
        // Fully deleted — switch to next tagline
        setIdx(i => (i + 1) % TAGLINES.length)
        setPhase('typing')
        // count is already 0
      }
    }

    return () => clearTimeout(t)
  }, [started, phase, count, chars])

  const display    = chars.slice(0, count).join('')
  const showCursor = started && (
    (phase === 'typing'   && count < chars.length) ||
    (phase === 'deleting' && count > 0)
  )

  return (
    <p
      className={`hero__tagline ${current.cls}`}
      lang={current.lang}
      aria-live="polite"
      aria-label={`${TAGLINES[0].text} — ${TAGLINES[1].text}`}
    >
      {display || ' '}{/* nbsp keeps height stable when empty */}
      {showCursor && <span className="hero__cursor" aria-hidden="true" />}
    </p>
  )
}

/* ── Hero section ─────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section className="hero" ref={sectionRef} aria-label="Hero">
      {/* Parallax video background */}
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.06.50-PM-1.jpeg"
          aria-hidden="true"
        >
          <source src="https://thehukumdesertcamp.com/wp-content/uploads/2026/06/WhatsApp-Video-2026-06-16-at-4.17.55-PM.mp4" type="video/mp4" />
          <source src="https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Video-2026-04-17-at-1.20.14-PM.mp4" type="video/mp4" />
        </video>
        <div
          className="hero__video-fallback"
          style={{ backgroundImage: `url(https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.06.50-PM-1.jpeg)` }}
          aria-hidden="true"
        />
      </motion.div>

      <div className="hero__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="container hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.p
            className="hero__overline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Sam Sand Dunes, Jaisalmer
          </motion.p>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            {SITE.name}
          </motion.h1>

          {/* Cycling typewriter — same spot, loops Hindi ↔ English */}
          <CyclingTypewriter />

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Button as="a" href="/booking" variant="primary" size="lg">
              Book Now
            </Button>
            <Button as={Link} to="/desert-experience" variant="ghost" size="lg">
              Explore Experience
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__widget-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <BookingWidget />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero__scroll-hint"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {/* <span>↓</span>
        <span className="hero__scroll-text">Scroll</span> */}
      </motion.div>
    </section>
  )
}
