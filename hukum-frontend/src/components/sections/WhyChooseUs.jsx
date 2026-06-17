import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { WHY_CHOOSE_US } from '../../constants'
import './WhyChooseUs.css'

export default function WhyChooseUs() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="why section" id="why-choose-us" ref={ref}
      style={{ background: 'var(--color-sand)' }}
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">The Hukum Difference</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Every moment at our camp is crafted to give you an experience that stays with you long
            after the desert dust settles.
          </p>
        </motion.div>

        <div className="why__grid">
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.div
              key={item.title}
              className="why__card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="why__icon" aria-hidden="true">
                <img src={item.iconImg} alt={item.title} loading="lazy" />
              </div>
              <h3 className="why__card-title">{item.title}</h3>
              <p className="why__card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
