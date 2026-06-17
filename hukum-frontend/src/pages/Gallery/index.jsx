import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { fetchGallery, setCategory, openLightbox } from '../../features/gallery/gallerySlice'
import { GALLERY_CATEGORIES } from '../../constants'
import Lightbox from '../../components/common/Lightbox'
import Loader from '../../components/common/Loader'
import './Gallery.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const PLACEHOLDER = [
  { id:  1, title: 'Camp Life',             image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.08.27-PM.jpeg`,      category: 'Camp' },
  { id:  2, title: 'Swiss Tent Interior',   image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.08.32-PM.jpeg`,      category: 'Rooms' },
  { id:  3, title: 'Desert Ambience',       image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.09.46-PM.jpeg`,      category: 'Camp' },
  { id:  4, title: 'Golden Dunes',          image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.09.52-PM.jpeg`,      category: 'Camp' },
  { id:  5, title: 'Cultural Evening',      image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.15-PM.jpeg`,      category: 'Cultural' },
  { id:  6, title: 'Folk Performance',      image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.22-PM.jpeg`,      category: 'Cultural' },
  { id:  7, title: 'Rajasthani Night',      image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.26-PM.jpeg`,      category: 'Cultural' },
  { id:  8, title: 'Camp Bonfire',          image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.31-PM.jpeg`,      category: 'Camp' },
  { id:  9, title: 'Desert Night',          image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.37-PM.jpeg`,      category: 'Camp' },
  { id: 10, title: 'Rajasthani Thali',      image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.11.57-PM.jpeg`,      category: 'Food' },
  { id: 11, title: 'Desert Feast',          image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.12.01-PM.jpeg`,      category: 'Food' },
  { id: 12, title: 'Camp Overview',         image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.12.09-PM.jpeg`,      category: 'Camp' },
  { id: 13, title: 'Tent Exterior',         image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-17-at-1.12.11-PM.jpeg`,      category: 'Rooms' },
  { id: 14, title: 'Camel Safari',          image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.01-AM-1.jpeg`,  category: 'Safari' },
  { id: 15, title: 'Desert Safari',         image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.01-AM-2.jpeg`,  category: 'Safari' },
  { id: 16, title: 'Sand Dune Explorer',    image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.02-AM.jpeg`,    category: 'Safari' },
  { id: 17, title: 'Thar Landscape',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.02-AM-1.jpeg`,  category: 'Camp' },
  { id: 18, title: 'Desert Morning',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.03-AM-1.jpeg`,  category: 'Camp' },
  { id: 19, title: 'Golden Dunes View',     image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM.jpeg`,    category: 'Safari' },
  { id: 20, title: 'Thar Desert',           image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.04-AM-3.jpeg`,  category: 'Safari' },
  { id: 21, title: 'Sunset Safari',         image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-1.jpeg`,  category: 'Safari' },
  { id: 22, title: 'Dune Crest',            image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-2-1.jpeg`, category: 'Safari' },
  { id: 23, title: 'Traditional Dance',     image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.07-AM.jpeg`,    category: 'Cultural' },
  { id: 24, title: 'Rajasthani Folk',       image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.06-AM.jpeg`,    category: 'Cultural' },
  { id: 25, title: 'Cultural Performance',  image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.07-AM-1.jpeg`,  category: 'Cultural' },
  { id: 26, title: 'Luxury Tent',           image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.08-AM-1.jpeg`,  category: 'Rooms' },
  { id: 27, title: 'Swiss Tent Suite',      image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.09-AM.jpeg`,    category: 'Rooms' },
  { id: 28, title: 'Heritage Tent',         image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.08-AM-2.jpeg`,  category: 'Rooms' },
  { id: 29, title: 'Camp Serenity',         image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.09-AM-1.jpeg`,  category: 'Camp' },
  { id: 30, title: 'Desert Retreat',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.09-AM-2.jpeg`,  category: 'Camp' },
  { id: 31, title: 'Dinner on Dunes',       image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM.jpeg`,    category: 'Food' },
  { id: 32, title: 'Starlit Dinner',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.11-AM.jpeg`,    category: 'Food' },
  { id: 33, title: 'Under the Stars',       image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM-1-1.jpeg`, category: 'Food' },
  { id: 34, title: 'Bonfire Dinner',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.11-AM-1.jpeg`,  category: 'Food' },
  { id: 35, title: 'Morning at Camp',       image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.12-AM.jpeg`,    category: 'Camp' },
  { id: 36, title: 'Desert Sunrise',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.13-AM.jpeg`,    category: 'Camp' },
  { id: 37, title: 'Camel Trek',            image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.12-AM-1.jpeg`,  category: 'Safari' },
  { id: 38, title: 'Dune Adventure',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.13-AM-1.jpeg`,  category: 'Safari' },
  { id: 39, title: 'Evening Celebration',   image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.13-AM-2.jpeg`,  category: 'Cultural' },
  { id: 40, title: 'Tent Decor',            image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.14-AM.jpeg`,    category: 'Rooms' },
  { id: 41, title: 'Desert Life',           image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.14-AM-1.jpeg`,  category: 'Camp' },
]

export default function Gallery() {
  const dispatch = useDispatch()
  const { items, activeCategory, status } = useSelector((s) => s.gallery)

  useEffect(() => {
    document.title = 'Gallery — The Hukum Desert Camp'
    if (status === 'idle') dispatch(fetchGallery())
  }, [status, dispatch])

  const displayItems = items.length > 0 ? items : PLACEHOLDER
  const filtered = activeCategory === 'All'
    ? displayItems
    : displayItems.filter((i) => i.category === activeCategory)

  return (
    <div style={{ marginTop: 'var(--navbar-height)' }}>
      <div className="page-hero-band">
        <div className="page-hero-band__overlay" />
        <img src={`${WP}/2026/04/Untitled-design-69.png`} alt="Gallery — The Hukum Desert Camp" className="page-hero-band__img" />
        <div className="page-hero-band__content container">
          <p className="section-label">Our Story in Pictures</p>
          <h1 className="page-hero-band__title">Gallery</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div className="gallery-filter">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter__btn${activeCategory === cat ? ' gallery-filter__btn--active' : ''}`}
                onClick={() => dispatch(setCategory(cat))}
              >
                {cat}
              </button>
            ))}
          </div>

          {status === 'loading' && <Loader />}

          <motion.div className="gallery-masonry" layout>
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                className="gallery-item img-zoom"
                onClick={() => dispatch(openLightbox(i))}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                aria-label={`Open ${item.title}`}
                layout
              >
                {/* TODO: replace asset — use real photos from API */}
                <img
                  src={item.image_url || `https://picsum.photos/seed/${item.id}/600/450`}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="gallery-item__hover">
                  <span>🔍 {item.title}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {filtered.length === 0 && status !== 'loading' && (
            <p style={{ textAlign: 'center', color: 'var(--color-charcoal-light)', padding: 'var(--space-12)' }}>
              No images in this category yet.
            </p>
          )}
        </div>
      </section>

      <Lightbox />
    </div>
  )
}
