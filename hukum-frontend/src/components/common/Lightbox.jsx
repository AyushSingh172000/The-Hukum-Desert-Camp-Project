import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { closeLightbox, nextLightbox, prevLightbox } from '../../features/gallery/gallerySlice'
import './Lightbox.css'

export default function Lightbox() {
  const dispatch = useDispatch()
  const { items, lightboxIndex, activeCategory } = useSelector((s) => s.gallery)

  const filtered = items.filter(
    (i) => activeCategory === 'All' || i.category === activeCategory
  )
  const image = lightboxIndex !== null ? filtered[lightboxIndex] : null

  useEffect(() => {
    if (image) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [image])

  useEffect(() => {
    const handleKey = (e) => {
      if (!image) return
      if (e.key === 'ArrowRight') dispatch(nextLightbox())
      if (e.key === 'ArrowLeft')  dispatch(prevLightbox())
      if (e.key === 'Escape')     dispatch(closeLightbox())
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [image, dispatch])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(closeLightbox())}
        >
          <button
            className="lightbox-btn lightbox-btn--prev"
            onClick={(e) => { e.stopPropagation(); dispatch(prevLightbox()) }}
            aria-label="Previous image"
          >‹</button>

          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{ scale: 0.85,    opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* TODO: replace asset — use real image URL from API */}
            <img
              src={image.image_url || `https://picsum.photos/seed/${image.id}/1200/800`}
              alt={image.title || 'Gallery image'}
              className="lightbox-img"
            />
            {image.title && (
              <p className="lightbox-caption">{image.title}</p>
            )}
          </motion.div>

          <button
            className="lightbox-btn lightbox-btn--next"
            onClick={(e) => { e.stopPropagation(); dispatch(nextLightbox()) }}
            aria-label="Next image"
          >›</button>

          <button
            className="lightbox-close"
            onClick={() => dispatch(closeLightbox())}
            aria-label="Close lightbox"
          >✕</button>

          <p className="lightbox-counter">
            {lightboxIndex + 1} / {filtered.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
