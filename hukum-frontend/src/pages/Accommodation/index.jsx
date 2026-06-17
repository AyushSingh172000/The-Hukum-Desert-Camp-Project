import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ACCOMMODATION_TYPES } from '../../constants'
import './Accommodation.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const ROOM_DETAILS = {
  'desert-camp':  { img: `${WP}/2026/06/desert-camp-hotel-murad-haveli-jaisalmer.jpg`,    price: '₹4,500', maxGuests: 2 },
  'deluxe-rooms': { img: `${WP}/2026/06/deluxe-room-hotel-murad-haveli-jaisalmer.jpg`,    price: '₹6,500', maxGuests: 3 },
  'eco-farm-stay':{ img: `${WP}/2026/06/eco-farm-stay-hotel-murad-haveli-jaisalmer.jpg`,  price: '₹3,500', maxGuests: 2 },
  'glass-house':  { img: `${WP}/2026/06/Glass-House.png`,                                  price: '₹9,500', maxGuests: 2 },
}

export default function Accommodation() {
  const { ref, isInView } = useScrollReveal()

  useEffect(() => {
    document.title = 'Accommodation — The Hukum Desert Camp'
  }, [])

  return (
    <div className="page-accommodation">
      {/* Hero band */}
      <div className="page-hero-band">
        <div className="page-hero-band__overlay" />
        <img src="https://thehukumdesertcamp.com/wp-content/uploads/2026/06/desert-camp-hotel-murad-haveli-jaisalmer.jpg" alt="Accommodation at The Hukum Desert Camp" className="page-hero-band__img" />
        <div className="page-hero-band__content container">
          <p className="section-label">Where You'll Stay</p>
          <h1 className="page-hero-band__title">Accommodation</h1>
          <p className="page-hero-band__sub">Four unique ways to sleep beneath the Thar stars</p>
        </div>
      </div>

      <section className="section" ref={ref}>
        <div className="container">
          <div className="accom-grid">
            {ACCOMMODATION_TYPES.map((room, i) => {
              const extra = ROOM_DETAILS[room.slug] || {}
              return (
                <motion.div
                  key={room.slug}
                  className="accom-card img-zoom"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                >
                  <img src={extra.img} alt={room.name} loading="lazy" />
                  <div className="accom-card__body">
                    <div className="accom-card__meta">
                      {extra.price && <span className="accom-card__price">{extra.price} / night</span>}
                      {extra.maxGuests && <span className="accom-card__guests">👤 Up to {extra.maxGuests}</span>}
                    </div>
                    <h2 className="accom-card__title">{room.name}</h2>
                    <p className="accom-card__desc">{room.shortDesc}</p>
                    <div className="accom-card__actions">
                      <Link to={room.path} className="btn btn--secondary btn--sm">View Details</Link>
                      <Link to="/booking" className="btn btn--primary btn--sm">Book Now</Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
