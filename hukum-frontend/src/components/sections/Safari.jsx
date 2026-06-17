import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Safari.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const SAFARI_OPTIONS = [
  {
    icon: '🐪',
    title: 'Camel Safari',
    desc: 'Sway through the golden dunes on camelback — the most iconic Jaisalmer experience.',
    duration: '1–2 hours',
    img: `${WP}/2026/04/Untitled-design-71-1.png`,
  },
  {
    icon: '🚙',
    title: 'Jeep Safari',
    desc: 'Explore remote dunes and desert villages in a 4×4 with an experienced local guide.',
    duration: '2–4 hours',
    img: `${WP}/2026/04/jeep-1705400895.jpg`,
  },
  {
    icon: '🌅',
    title: 'Sunrise Safari',
    desc: 'Witness the Thar light up in shades of gold and crimson at the break of dawn.',
    duration: 'Early morning',
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM.jpeg`,
  },
  {
    icon: '🌄',
    title: 'Sunset Safari',
    desc: 'Chase the perfect sunset over Sam Sand Dunes — a memory you will carry forever.',
    duration: 'Evening',
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-2-1.jpeg`,
  },
]

export default function Safari() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="safari section" id="safari" ref={ref}>
      <div className="safari__hero-band" aria-hidden="true">
        <img
          src="https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-2.jpeg"
          alt=""
          className="safari__band-img"
          loading="lazy"
        />
        <div className="safari__band-overlay" />
        <div className="safari__band-text">
          <h2 className="safari__band-heading">Desert Safari</h2>
          <p className="safari__band-sub">Feel the Thar pulse beneath your feet</p>
        </div>
      </div>

      <div className="container">
        <div className="safari__grid">
          {SAFARI_OPTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              className="safari__card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="safari__card-img img-zoom">
                <img src={s.img} alt={s.title} loading="lazy" />
              </div>
              <div className="safari__card-body">
                <span className="safari__icon">{s.icon}</span>
                <h3 className="safari__card-title">{s.title}</h3>
                <p className="safari__card-desc">{s.desc}</p>
                <span className="safari__duration">⏱ {s.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Link to="/desert-experience" className="btn btn--primary btn--lg">
            Explore Desert Experience
          </Link>
        </div>
      </div>
    </section>
  )
}
