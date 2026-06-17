import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './DesertExperience.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const EXPERIENCES = [
  {
    icon: '🐪',
    title: 'Camel Safari',
    desc: 'The quintessential Jaisalmer experience. Trek through the undulating Sam Sand Dunes on camelback with an experienced mahout, stopping for sunset photography at the perfect dune ridge.',
    duration: '1–2 hrs',
    bestTime: 'Sunrise / Sunset',
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.01-AM-1.jpeg`,
    highlights: ['Experienced mahout guide', 'Dune photography stops', 'Sunset views', 'Traditional saddle ride'],
  },
  {
    icon: '🚙',
    title: 'Jeep Safari',
    desc: 'Explore the vast Thar in a rugged 4×4. Your guide will take you through desert villages, ancient ruins, and remote dune fields that most tourists never see. Perfect for adventure seekers.',
    duration: '2–4 hrs',
    bestTime: 'Morning / Evening',
    img: `${WP}/2026/04/jeep-1705400895.jpg`,
    highlights: ['Remote desert trails', 'Desert village visits', 'Ancient ruins exploration', 'Expert local guide'],
  },
  {
    icon: '🌅',
    title: 'Sunrise & Sunset Views',
    desc: 'The Thar at dawn and dusk is a masterpiece of light and shadow. Walk to the nearest dune ridge with us and watch the sky transform in hues of saffron, amber, and rose over the endless sand.',
    duration: '1 hr',
    bestTime: 'Sunrise / Sunset',
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM.jpeg`,
    highlights: ['Best dune viewpoints', 'Photography guidance', 'Chai & snacks included', 'Guided walk'],
  },
  {
    icon: '🏂',
    title: 'Sandboarding on the Dunes',
    desc: 'Feel the rush of sliding down towering sand dunes on a board. This thrilling activity is suitable for all ages and is a must-try on the golden slopes of Sam Sand Dunes.',
    duration: '1 hr',
    bestTime: 'Morning',
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.02-AM.jpeg`,
    highlights: ['Equipment provided', 'Expert instructors', 'All age groups', 'Multiple dune runs'],
  },
  {
    icon: '🍽️',
    title: 'Dinner on Dunes',
    desc: 'A feast under a canopy of stars. Authentic Rajasthani thali — dal baati churma, gatte ki sabzi, ker sangri — served around the bonfire with live folk music in the heart of the desert.',
    duration: '2 hrs',
    bestTime: 'Evening',
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM.jpeg`,
    highlights: ['Traditional Rajasthani thali', 'Live folk music', 'Bonfire under the stars', 'Cultural performance'],
  },
  {
    icon: '🌌',
    title: 'Stargazing Night',
    desc: 'Far from city lights, the Thar offers one of India\'s finest night skies. Our astronomy guide walks you through constellations, planets, and the Milky Way band visible to the naked eye.',
    duration: 'After 9 PM',
    bestTime: 'Night',
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.09.46-PM.jpeg`,
    highlights: ['Guided constellation tour', 'Telescope viewing', 'Milky Way photography', 'Hot beverages included'],
  },
]

export default function DesertExperience() {
  const { ref, isInView } = useScrollReveal()

  useEffect(() => {
    document.title = 'Desert Experience — The Hukum Desert Camp'
  }, [])

  return (
    <div style={{ marginTop: 'var(--navbar-height)' }}>
      <div className="page-hero-band de-band">
        <div className="page-hero-band__overlay" />
        <img
          src={`${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-2.jpeg`}
          alt="Desert Experience at The Hukum Desert Camp"
          className="page-hero-band__img"
        />
        <div className="page-hero-band__content container">
          <p className="section-label">Immersive Activities</p>
          <h1 className="page-hero-band__title">Desert Experiences</h1>
          <p className="page-hero-band__sub">Every moment in the Thar is a story waiting to be lived</p>
        </div>
      </div>

      <section className="section" ref={ref}>
        <div className="container">
          <div className="de-grid">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.title}
                className="de-card"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="de-card__img img-zoom">
                  <img src={exp.img} alt={exp.title} loading="lazy" />
                  <span className="de-card__icon">{exp.icon}</span>
                </div>
                <div className="de-card__body">
                  <h3 className="de-card__title">{exp.title}</h3>
                  <p className="de-card__desc">{exp.desc}</p>
                  {exp.highlights && (
                    <ul className="de-card__highlights">
                      {exp.highlights.map((h) => (
                        <li key={h}><span>✓</span> {h}</li>
                      ))}
                    </ul>
                  )}
                  <div className="de-card__meta">
                    <span>⏱ {exp.duration}</span>
                    <span>🕐 {exp.bestTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link to="/booking" className="btn btn--primary btn--lg">Book an Experience →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
