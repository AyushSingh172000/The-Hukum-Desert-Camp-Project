import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { updateForm, createBooking, resetBooking } from '../../features/booking/bookingSlice'
import { ACCOMMODATION_TYPES, SITE } from '../../constants'
import Input from '../../components/common/Input'
import './Booking.css'

export default function Booking() {
  const dispatch  = useDispatch()
  const [params]  = useSearchParams()
  const { form, submitStatus, error, successMessage } = useSelector((s) => s.booking)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    document.title = 'Book Your Stay — The Hukum Desert Camp'
    const roomParam = params.get('room')
    if (roomParam) dispatch(updateForm({ roomSlug: roomParam }))
    return () => dispatch(resetBooking())
  }, [dispatch, params])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(updateForm({ [name]: name === 'guests' ? Number(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createBooking(form))
  }

  if (submitStatus === 'succeeded') {
    return (
      <div className="booking-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          className="booking-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="booking-success__icon">🏕️</div>
          <h2 className="booking-success__title">Booking Request Submitted!</h2>
          <p className="booking-success__body">{successMessage}</p>
          <p className="booking-success__body">
            For immediate assistance, call us at <strong>{SITE.phone}</strong> or WhatsApp us.
          </p>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <div className="container booking-inner">
        <motion.div
          className="booking-form-col"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Reserve Your Stay</p>
          <h1 className="booking-title">Book The Hukum<br />Desert Camp</h1>
          <div className="divider" style={{ marginInline: 0 }} />

          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            {/* Room selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="b-room">Accommodation Type</label>
              <select
                id="b-room" name="roomSlug"
                className="form-input"
                value={form.roomSlug}
                onChange={handleChange}
                required
              >
                <option value="">Select accommodation…</option>
                {ACCOMMODATION_TYPES.map((r) => (
                  <option key={r.slug} value={r.slug}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="booking-form__dates">
              <Input
                id="b-checkin" name="checkIn" label="Check-in Date" type="date"
                min={today} value={form.checkIn} onChange={handleChange} required
              />
              <Input
                id="b-checkout" name="checkOut" label="Check-out Date" type="date"
                min={form.checkIn || today} value={form.checkOut} onChange={handleChange} required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="b-guests">Number of Guests</label>
              <select
                id="b-guests" name="guests"
                className="form-input"
                value={form.guests}
                onChange={handleChange}
              >
                {[1,2,3,4,5,6].map((n) => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-sand)', margin: 'var(--space-2) 0' }} />

            <Input id="b-name"  name="name"  label="Full Name"     type="text"  placeholder="Arjun Sharma"             value={form.name}  onChange={handleChange} required />
            <Input id="b-email" name="email" label="Email Address"  type="email" placeholder="arjun@example.com"         value={form.email} onChange={handleChange} required />
            <Input id="b-phone" name="phone" label="Phone / WhatsApp" type="tel" placeholder="+91 98765 43210"           value={form.phone} onChange={handleChange} required />

            {error && <p className="error-text">{error}</p>}

            <button
              type="submit"
              className="btn btn--primary btn--lg"
              style={{ width: '100%' }}
              disabled={submitStatus === 'loading'}
            >
              {submitStatus === 'loading' ? 'Submitting…' : 'Request Booking →'}
            </button>

            <p className="booking-disclaimer">
              We'll confirm your booking by email within 2 hours. No payment is collected here —
              our team will contact you for confirmation and payment details.
            </p>
          </form>
        </motion.div>

        {/* Info sidebar */}
        <motion.div
          className="booking-info-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="booking-info-card">
            <h3 className="booking-info-card__title">Contact Us Directly</h3>
            <p>Prefer to talk? Our team is available 9 AM – 9 PM daily.</p>
            <a href={`tel:${SITE.phoneRaw}`} className="btn btn--dark btn--md" style={{ marginTop: 'var(--space-4)', width: '100%', justifyContent: 'center' }}>
              📞 {SITE.phone}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--md" style={{ marginTop: 'var(--space-3)', width: '100%', justifyContent: 'center' }}>
              💬 WhatsApp Us
            </a>
          </div>

          <div className="booking-info-card">
            <h3 className="booking-info-card__title">What's Included</h3>
            <ul className="booking-includes">
              {['Accommodation', 'Welcome drink', 'Evening cultural program', 'Bonfire', 'Rajasthani dinner', 'Morning tea & breakfast', 'Camel ride (30 min)'].map((item) => (
                <li key={item}><span style={{ color: 'var(--color-saffron)' }}>✓</span> {item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
