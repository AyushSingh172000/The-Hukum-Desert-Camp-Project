import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fetchRoom } from '../../features/rooms/roomsSlice'
import Loader from '../../components/common/Loader'
import '../Accommodation/Accommodation.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const FALLBACK_DATA = {
  'desert-camp': {
    name: 'Desert Camp',
    description: 'Our signature Swiss tents are luxury redefined in the desert. Each tent features a plush king-size bed with handwoven Rajasthani textiles, a private veranda overlooking the dunes, and en-suite bathroom. Wake up to silence, then step outside to gold.',
    price_per_night: 4500,
    max_guests: 2,
    image_url: `${WP}/2026/06/desert-camp-hotel-murad-haveli-jaisalmer.jpg`,
    amenities: ['King-size bed', 'Private veranda', 'En-suite bathroom', 'Air cooling', 'Daily housekeeping', 'Wi-Fi'],
  },
  'deluxe-rooms': {
    name: 'Deluxe Rooms',
    description: 'Permanent structures with the soul of Rajasthan. Stone walls, carved jharokha windows, and hand-painted murals combine with modern comforts for a stay that feels both timeless and indulgent.',
    price_per_night: 6500,
    max_guests: 3,
    image_url: `${WP}/2026/06/deluxe-room-hotel-murad-haveli-jaisalmer.jpg`,
    amenities: ['Super-king bed', 'Balcony', 'Bath & shower', 'Air conditioning', 'Mini-bar', 'Smart TV'],
  },
  'eco-farm-stay': {
    name: 'ECO Farm Stay',
    description: 'Live sustainably and simply. Solar-powered mud huts with traditional architecture blend seamlessly with the desert flora, offering a mindful escape for nature lovers.',
    price_per_night: 3500,
    max_guests: 2,
    image_url: `${WP}/2026/06/eco-farm-stay-hotel-murad-haveli-jaisalmer.jpg`,
    amenities: ['Handcrafted furniture', 'Courtyard', 'Shared bath', 'Solar electricity', 'Organic meals', 'Farm activities'],
  },
  'glass-house': {
    name: 'Glass House',
    description: 'A contemporary jewel in the desert. Floor-to-ceiling glass panels offer 270° panoramic views of the sand dunes from your bed, your bath, and your private terrace.',
    price_per_night: 9500,
    max_guests: 2,
    image_url: `${WP}/2026/06/Glass-House.png`,
    amenities: ['Panoramic glass walls', 'Private terrace', 'Jacuzzi bath', 'Air conditioning', 'Complimentary champagne', 'Butler service'],
  },
}

export default function AccomDetail() {
  const { slug }    = useParams()
  const dispatch    = useDispatch()
  const { current, status } = useSelector((s) => s.rooms)

  useEffect(() => {
    dispatch(fetchRoom(slug))
  }, [slug, dispatch])

  const room = current || FALLBACK_DATA[slug]

  useEffect(() => {
    if (room) document.title = `${room.name} — The Hukum Desert Camp`
  }, [room])

  if (status === 'loading' && !room) return <Loader fullPage text="Loading room details…" />

  if (!room) return (
    <div className="container section" style={{ marginTop: 'var(--navbar-height)' }}>
      <p>Room not found. <Link to="/accommodation">Back to Accommodation</Link></p>
    </div>
  )

  return (
    <div style={{ marginTop: 'var(--navbar-height)' }}>
      {/* Header image */}
      <div className="page-hero-band">
        <div className="page-hero-band__overlay" />
        <img src={room.image_url} alt={room.name} className="page-hero-band__img" />
        <div className="page-hero-band__content container">
          <Link to="/accommodation" className="section-label" style={{ textDecoration: 'none' }}>
            ← Accommodation
          </Link>
          <h1 className="page-hero-band__title">{room.name}</h1>
          <p className="page-hero-band__sub">₹{room.price_per_night?.toLocaleString()} per night · Up to {room.max_guests} guests</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-12)', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>About this stay</h2>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.75, color: 'var(--color-charcoal-light)', marginBottom: 'var(--space-8)' }}>
              {room.description}
            </p>
            {room.amenities && (
              <>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Amenities</h3>
                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  {room.amenities.map((a) => (
                    <li key={a} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-base)', color: 'var(--color-charcoal-light)' }}>
                      <span style={{ color: 'var(--color-saffron)' }}>✓</span> {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>

          {/* Booking sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ background: 'var(--color-sand-light)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', position: 'sticky', top: 'calc(var(--navbar-height) + var(--space-8))' }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', color: 'var(--color-saffron)', fontWeight: 700 }}>
              ₹{room.price_per_night?.toLocaleString()}
              <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-charcoal-light)', fontWeight: 400, fontFamily: 'var(--font-sans)' }}> / night</span>
            </p>
            <div className="divider" style={{ marginInline: 0, marginBlock: 'var(--space-4)' }} />
            <Link
              to={`/booking?room=${slug}`}
              className="btn btn--primary btn--lg"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 'var(--space-3)' }}
            >
              Book This Room
            </Link>
            <Link to="/contact" className="btn btn--secondary btn--md" style={{ width: '100%', justifyContent: 'center' }}>
              Ask a Question
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
