import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Attractions.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const ATTRACTIONS = [
  {
    img: `${WP}/2026/04/Untitled-design-69.png`,
    name: 'Jaisalmer Fort (Sonar Quila)',
    category: 'Heritage',
    dist: '~42 km',
    desc: 'A 12th-century golden sandstone fort and one of the world\'s few living forts. Over 3,000 families reside within its massive walls alongside museums, Jain temples, and the iconic Rajmahal Palace.',
    highlights: ['Jain Temples', 'Rajmahal Palace', 'Museum', 'Panoramic Views'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM.jpeg`,
    name: 'Sam Sand Dunes',
    category: 'Nature',
    dist: 'On site',
    desc: 'Iconic crescent-shaped dunes stretching to the horizon — the perfect canvas for camel safaris, jeep rides, and unforgettable sunsets right at your doorstep from The Hukum.',
    highlights: ['Camel Safari', 'Jeep Safari', 'Sunset Views', 'Photography'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM.jpeg`,
    name: 'Gadisar Lake',
    category: 'Nature',
    dist: '~43 km',
    desc: 'A serene man-made reservoir built in 1367 AD, surrounded by ghats, temples, and shrines. Enjoy a peaceful boat ride as the sun sets over the shimmering water.',
    highlights: ['Boat Rides', 'Temple Visits', 'Bird Watching', 'Sunset Photography'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.09.46-PM.jpeg`,
    name: 'Kuldhara — The Ghost Village',
    category: 'Heritage',
    dist: '~35 km',
    desc: 'An eerie abandoned village from the 13th century, said to have been deserted overnight by 1,500 Paliwal Brahmin families. The ruins and legends make it unlike anywhere else.',
    highlights: ['Ancient Ruins', 'Heritage Walk', 'Photography', 'Mystery & History'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.09-AM-1.jpeg`,
    name: 'Tanot Mata Temple',
    category: 'Spiritual',
    dist: '~120 km',
    desc: 'A sacred temple near the Pakistan border, believed to have miraculously survived Pakistani bombing in 1965. Maintained by the BSF and revered by thousands of pilgrims.',
    highlights: ['Sacred Temple', 'Border Heritage', 'BSF Museum', 'Spiritual Visit'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.13-AM.jpeg`,
    name: 'Longewala War Memorial',
    category: 'Heritage',
    dist: '~115 km',
    desc: 'A tribute to the legendary Battle of Longewala (1971) where Indian forces repelled a massive Pakistani armoured attack. War relics and tanks are on display at this moving memorial.',
    highlights: ['War Museum', 'Tank Display', 'Historical Memorial', 'BSF Tour'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.12-AM.jpeg`,
    name: 'Jaisalmer War Museum',
    category: 'Heritage',
    dist: '~42 km',
    desc: 'Dedicated to the valour of Indian soldiers in wars fought from Rajasthan\'s border. Features aircraft, tanks, artillery, and personal accounts of the soldiers who served here.',
    highlights: ['Military Aircraft', 'Artillery Display', 'Soldiers\' Stories', 'Photo Gallery'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.02-AM-1.jpeg`,
    name: 'Khaba Fort',
    category: 'Heritage',
    dist: '~40 km',
    desc: 'An ancient fortified village near Kuldhara, now mostly in ruins. The site offers sweeping desert views and a glimpse into medieval Rajasthani life with minimal tourist crowds.',
    highlights: ['Ancient Fort Ruins', 'Desert Views', 'Nearby Kuldhara', 'Off-beat Destination'],
  },
  {
    img: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.04-AM-3.jpeg`,
    name: 'Desert National Park',
    category: 'Wildlife',
    dist: '~45 km',
    desc: 'One of India\'s largest national parks, home to the endangered Great Indian Bustard, desert foxes, chinkaras, and over 120 species of birds. A rare desert ecosystem.',
    highlights: ['Great Indian Bustard', 'Chinkara Deer', 'Bird Watching', 'Desert Ecosystem'],
  },
  {
    img: `${WP}/2026/04/Untitled-design-70.png`,
    name: 'Bada Bagh',
    category: 'Heritage',
    dist: '~38 km',
    desc: 'A royal garden complex with the cenotaphs (chhatris) of the Maharajas of Jaisalmer. At sunset the carved sandstone turns deep amber — otherworldly and hauntingly beautiful.',
    highlights: ['Royal Cenotaphs', 'Sunset Photography', 'Sandstone Architecture', 'Heritage Garden'],
  },
]

export default function Attractions() {
  const { ref, isInView } = useScrollReveal()

  useEffect(() => {
    document.title = 'Nearby Attractions — The Hukum Desert Camp'
  }, [])

  return (
    <div style={{ marginTop: 'var(--navbar-height)' }}>
      <div className="page-hero-band">
        <div className="page-hero-band__overlay" />
        <img
          src={`${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-2-1.jpeg`}
          alt="Jaisalmer Attractions"
          className="page-hero-band__img"
        />
        <div className="page-hero-band__content container">
          <p className="section-label">Nearby</p>
          <h1 className="page-hero-band__title">Attractions & Sightseeing</h1>
          <p className="page-hero-band__sub">Jaisalmer's finest — all within easy reach of our camp</p>
        </div>
      </div>

      <section className="section" ref={ref}>
        <div className="container">
          <div className="attractions-grid">
            {ATTRACTIONS.map((a, i) => (
              <motion.div
                key={a.name}
                className="attraction-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="attraction-card__img img-zoom">
                  <img src={a.img} alt={a.name} loading="lazy" />
                  <span className="attraction-card__cat">{a.category}</span>
                </div>
                <div className="attraction-card__body">
                  <h3 className="attraction-card__name">{a.name}</h3>
                  <p className="attraction-card__desc">{a.desc}</p>
                  {a.highlights && (
                    <div className="attraction-card__highlights">
                      {a.highlights.map((h) => (
                        <span key={h} className="attraction-card__tag">{h}</span>
                      ))}
                    </div>
                  )}
                  <span className="attraction-card__dist">📍 {a.dist} from camp</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
