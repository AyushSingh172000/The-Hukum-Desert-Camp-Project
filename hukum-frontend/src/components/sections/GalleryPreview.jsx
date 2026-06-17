import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGallery } from '../../features/gallery/gallerySlice'
import { openLightbox } from '../../features/gallery/gallerySlice'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Lightbox from '../common/Lightbox'
import './GalleryPreview.css'

const WP = 'https://thehukumdesertcamp.com/wp-content/uploads'

const PLACEHOLDER_IMAGES = [
  { id: 1, title: 'Desert Camp Life',    image_url: `${WP}/2026/04/Untitled-design-69.png`,                          category: 'Camp' },
  { id: 2, title: 'Desert Safari',       image_url: `${WP}/2026/04/imag3.png`,                                       category: 'Safari' },
  { id: 3, title: 'Desert Ambience',     image_url: `${WP}/2026/04/Untitled-design-68.png`,                          category: 'Camp' },
  { id: 4, title: 'Camp Moments',        image_url: `${WP}/2026/04/Untitled-design-70.png`,                          category: 'Cultural' },
  { id: 5, title: 'Camel Safari',        image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.01-AM-1.jpeg`, category: 'Safari' },
  { id: 6, title: 'Dinner on Dunes',     image_url: `${WP}/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM.jpeg`,   category: 'Food' },
]

export default function GalleryPreview() {
  const dispatch = useDispatch()
  const { items, status } = useSelector((s) => s.gallery)
  const { ref, isInView } = useScrollReveal()

  useEffect(() => {
    if (status === 'idle') dispatch(fetchGallery())
  }, [status, dispatch])

  const displayItems = items.length > 0 ? items.slice(0, 6) : PLACEHOLDER_IMAGES

  return (
    <section className="gallery-preview section" style={{ background: 'var(--color-sand)' }} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Gallery</p>
          <h2 className="section-title">Glimpses of The Hukum</h2>
          <div className="divider" />
        </motion.div>

        <div className="gallery-preview__grid">
          {displayItems.map((item, i) => (
            <motion.button
              key={item.id}
              className="gallery-preview__item img-zoom"
              onClick={() => dispatch(openLightbox(i))}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.image_url || `https://picsum.photos/seed/${item.id}/600/450`}
                alt={item.title}
                loading="lazy"
              />
              <div className="gallery-preview__hover">
                <span className="gallery-preview__zoom">🔍</span>
                <span className="gallery-preview__caption">{item.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link to="/gallery" className="btn btn--secondary btn--lg">
            View Full Gallery →
          </Link>
        </motion.div>
      </div>

      <Lightbox />
    </section>
  )
}
