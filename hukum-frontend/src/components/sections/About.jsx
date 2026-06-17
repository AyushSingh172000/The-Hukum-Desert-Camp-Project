import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './About.css'

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' } }),
}

export default function About() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container about__inner">
        {/* Images */}
        <div className="about__images">
          <motion.div
            className="about__img-main img-zoom"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <img
              src="https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.06.50-PM-1.jpeg"
              alt="Luxury Swiss tent at The Hukum Desert Camp"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="about__img-accent img-zoom"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <img
              src="https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.08-AM.jpeg"
              alt="Rajasthani cultural decor at the camp"
              loading="lazy"
            />
            <div className="about__badge">
              <span className="about__badge-num">15+</span>
              <span className="about__badge-text">Years of<br/>Hospitality</span>
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="about__text">
          <motion.p className="section-label" custom={0} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            About the Camp
          </motion.p>
          <motion.h2 className="about__heading" custom={1} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            Where the Golden Thar<br />Meets Royal Comfort
          </motion.h2>
          <div className="divider" style={{ marginInline: 0 }} />
          <motion.p className="about__body" custom={2} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            Nestled in the serene dunes of Sam Road, Kanoi, THE HUKUM Desert Camp offers an
            authentic Rajasthani desert experience with modern comfort. Whether you're looking for a
            peaceful escape or an adventurous getaway, our camp blends tradition, hospitality, and
            luxury to create unforgettable memories.
          </motion.p>
          <motion.p className="about__body" custom={3} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            From beautifully designed Swiss tents to thrilling desert safaris, we ensure every moment
            of your stay is special. Folk dance, live music, camel rides at golden hour, and Rajasthani
            thali dinners under a billion stars — this is the living, breathing spirit of the Thar.
          </motion.p>
          <motion.div className="about__features" custom={4} variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            {[
              { icon: '🏕️', label: 'Swiss Tent Luxury' },
              { icon: '🐪', label: 'Desert Safaris' },
              { icon: '🎶', label: 'Cultural Programs' },
              { icon: '🌅', label: 'Sunset & Sunrise Views' },
            ].map((f) => (
              <div key={f.label} className="about__feature">
                <span className="about__feature-icon">{f.icon}</span>
                <span className="about__feature-label">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
