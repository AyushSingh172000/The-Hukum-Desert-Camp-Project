import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-cream)', paddingTop: 'var(--navbar-height)' }}>
      <motion.div
        style={{ textAlign: 'center', padding: 'var(--space-12)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: '5rem', marginBottom: 'var(--space-4)' }}>🏜️</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-6xl)', color: 'var(--color-saffron)', marginBottom: 'var(--space-2)' }}>404</h1>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', color: 'var(--color-charcoal)', marginBottom: 'var(--space-4)' }}>Lost in the Desert</h2>
        <p style={{ color: 'var(--color-charcoal-light)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)' }}>
          Even the best desert guides take a wrong turn sometimes.
        </p>
        <Link to="/" className="btn btn--primary btn--lg">← Back to Camp</Link>
      </motion.div>
    </div>
  )
}
