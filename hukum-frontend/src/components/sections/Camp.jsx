import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Camp.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const CAMP_FEATURES = [
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.06.50-PM.jpeg`,
    title: 'Comfortable Accommodation',
    desc: 'Stay in luxuriously designed Swiss tents equipped with modern amenities. Enjoy Rajasthani craftsmanship with every comfort at hand.',
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.22-PM.jpeg`,
    title: 'Evening Cultural Programs',
    desc: 'Kalbelia folk dance, live Rajasthani music, and puppet shows around the bonfire under the open Rajasthani sky.',
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM.jpeg`,
    title: 'Bonfire & Dinner on Dunes',
    desc: 'Authentic Rajasthani thali served under a billion stars with a warm desert bonfire — a meal you will never forget.',
  },
]

export default function Camp() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="camp section" id="camp" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">The Camp</p>
          <h2 className="section-title">Life Under the Desert Sky</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Each evening at The Hukum transforms into a celebration of culture, cuisine, and the
            boundless Rajasthani spirit.
          </p>
        </motion.div>

        <div className="camp__grid">
          {CAMP_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="camp__card img-zoom"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
            >
              <img src={f.img} alt={f.title} loading="lazy" />
              <div className="camp__card-overlay">
                <h3 className="camp__card-title">{f.title}</h3>
                <p className="camp__card-desc">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="camp__cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link to="/accommodation" className="btn btn--secondary btn--md">
            View Accommodation →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
