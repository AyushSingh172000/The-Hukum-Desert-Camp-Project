import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Reservation.css'

const LANDMARKS = [
  { icon: '🏰', name: 'Jaisalmer Fort',       desc: 'A UNESCO-listed living fort rising from the Thar.', dist: '~42 km' },
  { icon: '🕌', name: 'Patwon ki Haveli',     desc: 'Intricately carved heritage mansions of merchants.', dist: '~42 km' },
  { icon: '🏜️', name: 'Sam Sand Dunes',       desc: 'The most iconic desert dunes in all of Rajasthan.', dist: 'On site' },
  { icon: '🎠', name: 'Kuldhara Village',      desc: 'An abandoned 13th-century village with a haunting past.', dist: '~35 km' },
  { icon: '💧', name: 'Gadisar Lake',          desc: 'A tranquil man-made lake surrounded by temples.', dist: '~45 km' },
  { icon: '🌿', name: 'Desert National Park', desc: 'Spot the Great Indian Bustard and desert wildlife.', dist: '~45 km' },
]

export default function Reservation() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="reservation section" id="heritage" ref={ref}>
      <div className="container">
        <div className="reservation__inner">
          <motion.div
            className="reservation__text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Heritage & Sightseeing</p>
            <h2 className="reservation__heading">
              Explore the<br />Golden City
            </h2>
            <div className="divider" style={{ marginInline: 0 }} />
            <p className="reservation__body">
              Jaisalmer's riches extend far beyond the dunes. From the magnificent Sonar Quila
              rising at sunrise to the carved havelis of merchant families, every corner of this
              city holds centuries of stories. Our knowledgeable guides will bring it all alive.
            </p>
            <Link to="/attractions" className="btn btn--primary btn--md" style={{ marginTop: 'var(--space-6)' }}>
              See All Attractions
            </Link>
          </motion.div>

          <div className="reservation__landmarks">
            {LANDMARKS.map((l, i) => (
              <motion.div
                key={l.name}
                className="reservation__landmark"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="reservation__landmark-icon">{l.icon}</span>
                <div>
                  <div className="reservation__landmark-name">{l.name}</div>
                  <div className="reservation__landmark-desc">{l.desc}</div>
                </div>
                <span className="reservation__landmark-dist">{l.dist}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
