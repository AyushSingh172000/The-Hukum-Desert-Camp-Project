import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { contactApi } from '../../api/contactApi'
import { SITE, SOCIALS } from '../../constants'
import Input from '../../components/common/Input'
import SocialIcon from '../../components/common/SocialIcon'
import './Contact.css'

export default function Contact() {
  const { ref, isInView } = useScrollReveal()
  const [form, setForm]   = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState(null)

  useEffect(() => {
    document.title = 'Contact Us — The Hukum Desert Camp'
  }, [])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    try {
      await contactApi.submit(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <div style={{ marginTop: 'var(--navbar-height)' }}>
      <div className="page-hero-band">
        <div className="page-hero-band__overlay" />
        <img src="https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.08-AM.jpeg" alt="Contact The Hukum Desert Camp" className="page-hero-band__img" />
        <div className="page-hero-band__content container">
          <p className="section-label">Get in Touch</p>
          <h1 className="page-hero-band__title">Contact Us</h1>
        </div>
      </div>

      <section className="section" ref={ref}>
        <div className="container contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="contact-info__title">We'd love to hear from you</h2>
            <p className="contact-info__sub">
              Planning a trip, have a question about our packages, or need a custom arrangement?
              We're here to help make your desert dream come true.
            </p>

            <div className="contact-info__items">
              <div className="contact-info__item">
                <span className="contact-info__icon">📍</span>
                <div>
                  <div className="contact-info__label">Address</div>
                  <div className="contact-info__value">{SITE.address}</div>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">📞</span>
                <div>
                  <div className="contact-info__label">Phone</div>
                  <a href={`tel:${SITE.phoneRaw}`} className="contact-info__value link">{SITE.phone}</a>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">✉️</span>
                <div>
                  <div className="contact-info__label">Email</div>
                  <a href={`mailto:${SITE.email}`} className="contact-info__value link">{SITE.email}</a>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">💬</span>
                <div>
                  <div className="contact-info__label">WhatsApp</div>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-info__value link">
                    Chat with us directly
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info__socials">
              <p className="contact-info__label">Follow Our Journey</p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                {SOCIALS.map((s) => (
                  <SocialIcon
                    key={s.name}
                    platform={s.icon}
                    url={s.url}
                    label={`Follow us on ${s.name}`}
                    variant="light"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="success-banner">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Thank You!</h3>
                <p>Your message has been sent. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h3 className="contact-form__title">Send us a Message</h3>

                <Input
                  id="c-name" name="name" label="Your Name" type="text"
                  placeholder="Arjun Sharma" required
                  value={form.name} onChange={handleChange}
                />
                <Input
                  id="c-email" name="email" label="Email Address" type="email"
                  placeholder="arjun@example.com" required
                  value={form.email} onChange={handleChange}
                />
                <Input
                  id="c-phone" name="phone" label="Phone Number" type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone} onChange={handleChange}
                />
                <Input
                  id="c-message" name="message" label="Message" as="textarea"
                  placeholder="Tell us about your trip plans, number of guests, preferred dates…"
                  required rows={5}
                  value={form.message} onChange={handleChange}
                />

                {error && <p className="error-text">{error}</p>}

                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  style={{ width: '100%' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
