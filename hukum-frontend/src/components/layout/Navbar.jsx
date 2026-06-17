import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toggleMobileMenu, closeMobileMenu } from '../../features/ui/uiSlice'
import { NAV_LINKS, SITE } from '../../constants'
import Button from '../common/Button'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const dispatch   = useDispatch()
  const { mobileMenuOpen } = useSelector((s) => s.ui)
  const location   = useLocation()
  const menuRef    = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    dispatch(closeMobileMenu())
  }, [location, dispatch])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        dispatch(closeMobileMenu())
      }
    }
    if (mobileMenuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileMenuOpen, dispatch])

  const isHome = location.pathname === '/'

  return (
    <header
      className={`navbar ${scrolled || !isHome ? 'navbar--scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="The Hukum Desert Camp — Home">
          <img src={SITE.logo} alt="The Hukum Desert Camp" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            <strong>The Hukum</strong>
            <small>Desert Camp</small>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA + phone */}
        <div className="navbar__actions">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="navbar__phone"
            aria-label={`Call us at ${SITE.phone}`}
          >
            📞 {SITE.phone}
          </a>
          <Button as="a" href="/booking" size="sm" variant="primary">
            Book Now
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${mobileMenuOpen ? ' is-open' : ''}`}
          onClick={() => dispatch(toggleMobileMenu())}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="navbar__mobile-actions">
              <a href={`tel:${SITE.phoneRaw}`} className="navbar__mobile-phone">
                📞 {SITE.phone}
              </a>
              <Button as="a" href="/booking" variant="primary" size="md">
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
