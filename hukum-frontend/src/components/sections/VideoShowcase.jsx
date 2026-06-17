import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './VideoShowcase.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const CAMP_VIDEOS = [
  {
    src: `${WP}/2026/06/WhatsApp-Video-2026-06-16-at-4.17.55-PM.mp4`,
    poster: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.06.50-PM-1.jpeg`,
    title: 'The Hukum Experience',
  },
  {
    src: `${WP}/2026/04/WhatsApp-Video-2026-04-17-at-1.20.14-PM.mp4`,
    poster: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.15-PM.jpeg`,
    title: 'Camp Life',
  },
  {
    src: `${WP}/2026/04/WhatsApp-Video-2026-04-17-at-1.19.46-PM.mp4`,
    poster: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.22-PM.jpeg`,
    title: 'Cultural Evening',
  },
  {
    src: `${WP}/2026/04/WhatsApp-Video-2026-04-17-at-1.19.35-PM.mp4`,
    poster: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.09.46-PM.jpeg`,
    title: 'Golden Dunes',
  },
]

export default function VideoShowcase() {
  const [active, setActive] = useState(0)
  const { ref, isInView } = useScrollReveal()
  const current = CAMP_VIDEOS[active]

  return (
    <section className="video-showcase section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Virtual Tour</p>
          <h2 className="section-title">Experience the Camp</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Take a cinematic tour of The Hukum Desert Camp — from the golden dunes to the starlit
            bonfire dinner.
          </p>
        </motion.div>

        <motion.div
          className="video-showcase__player"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <video
            key={current.src}
            className="video-showcase__video"
            controls
            autoPlay
            muted
            loop
            playsInline
            poster={current.poster}
          >
            <source src={current.src} type="video/mp4" />
          </video>
        </motion.div>

        <motion.div
          className="video-showcase__thumbs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {CAMP_VIDEOS.map((v, i) => (
            <button
              key={v.src}
              className={`video-showcase__thumb-btn${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Play ${v.title}`}
            >
              <img src={v.poster} alt={v.title} loading="lazy" />
              <div className="video-showcase__thumb-overlay">
                <span className="video-showcase__thumb-play" aria-hidden="true">▶</span>
              </div>
              <span className="video-showcase__thumb-title">{v.title}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
