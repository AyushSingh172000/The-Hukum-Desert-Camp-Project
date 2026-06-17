import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contactApi } from '../../api/contactApi'
import { SITE, SOCIALS, NAV_LINKS, ACCOMMODATION_TYPES } from '../../constants'
import Button from '../common/Button'
import SocialIcon from '../common/SocialIcon'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('idle')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubStatus('loading')
    try {
      await contactApi.subscribe({ email })
      setSubStatus('success')
      setEmail('')
    } catch {
      setSubStatus('error')
    }
  }

  return (
    <footer className="footer" role="contentinfo">
      {/* CTA Band */}
      <div className="footer__cta-band">
        <div className="container footer__cta-inner">
          <div>
            <h2 className="footer__cta-heading">Ready for the Desert?</h2>
            <p className="footer__cta-sub">Book your stay at The Hukum Desert Camp and live the golden Thar dream.</p>
          </div>
          <Button as="a" href="/booking" variant="primary" size="lg">
            Book Your Stay
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src={SITE.logo} alt="The Hukum Desert Camp logo" className="footer__logo-img" />
              <span>
                <strong>The Hukum</strong>
                <small>Desert Camp</small>
              </span>
            </Link>
            <p className="footer__brand-desc">
              An authentic luxury desert experience at Sam Sand Dunes, Jaisalmer.
              Swiss tents, starlit dinners, and the spirit of Rajasthan.
            </p>
            <div className="footer__socials">
              {SOCIALS.map((s) => (
                <SocialIcon
                  key={s.name}
                  platform={s.icon}
                  url={s.url}
                  label={`Follow us on ${s.name}`}
                  variant="dark"
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="footer__link">{l.label}</Link>
                </li>
              ))}
              <li><Link to="/booking" className="footer__link">Book Now</Link></li>
            </ul>
          </div>

          {/* Accommodation */}
          <div className="footer__col">
            <h4 className="footer__col-title">Accommodation</h4>
            <ul>
              {ACCOMMODATION_TYPES.map((a) => (
                <li key={a.slug}>
                  <Link to={a.path} className="footer__link">{a.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <address className="footer__contact">
              <p>📍 {SITE.address}</p>
              <a href={`tel:${SITE.phoneRaw}`} className="footer__link">📞 {SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="footer__link">✉️ {SITE.email}</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="footer__link">
                💬 WhatsApp Us
              </a>
            </address>

            <h4 className="footer__col-title" style={{ marginTop: '1.5rem' }}>Newsletter</h4>
            {subStatus === 'success' ? (
              <p className="footer__sub-success">Thank you for subscribing!</p>
            ) : (
              <form className="footer__subscribe" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email for newsletter"
                  className="footer__sub-input"
                />
                <button
                  type="submit"
                  className="footer__sub-btn"
                  disabled={subStatus === 'loading'}
                >
                  {subStatus === 'loading' ? '…' : '→'}
                </button>
              </form>
            )}
            {subStatus === 'error' && (
              <p className="footer__sub-error">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{SITE.copyright}. All rights reserved. &nbsp;|&nbsp; Developed by <a href="https://ayush-singh-17.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-saffron)', textDecoration: 'none' }}>Ayush Kumar Singh</a></p>
          <div className="footer__policy-links">
            <Link to="/policy" className="footer__policy-link">Privacy Policy</Link>
            <Link to="/policy#terms" className="footer__policy-link">Terms of Service</Link>
            <Link to="/policy#refund" className="footer__policy-link">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
