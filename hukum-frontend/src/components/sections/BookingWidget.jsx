import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateForm } from '../../features/booking/bookingSlice'
import './BookingWidget.css'

export default function BookingWidget() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { form }  = useSelector((s) => s.booking)

  const today     = new Date().toISOString().split('T')[0]

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/booking')
  }

  return (
    <form className="booking-widget" onSubmit={handleSearch} aria-label="Quick booking search">
      <h3 className="booking-widget__title">Check Availability</h3>

      <div className="booking-widget__fields">
        <div className="booking-widget__field">
          <label htmlFor="bw-checkin" className="booking-widget__label">Check In</label>
          <input
            id="bw-checkin"
            type="date"
            className="booking-widget__input"
            min={today}
            value={form.checkIn}
            onChange={(e) => dispatch(updateForm({ checkIn: e.target.value }))}
            required
          />
        </div>

        <div className="booking-widget__field">
          <label htmlFor="bw-checkout" className="booking-widget__label">Check Out</label>
          <input
            id="bw-checkout"
            type="date"
            className="booking-widget__input"
            min={form.checkIn || today}
            value={form.checkOut}
            onChange={(e) => dispatch(updateForm({ checkOut: e.target.value }))}
            required
          />
        </div>

        <div className="booking-widget__field">
          <label htmlFor="bw-guests" className="booking-widget__label">Guests</label>
          <select
            id="bw-guests"
            className="booking-widget__input"
            value={form.guests}
            onChange={(e) => dispatch(updateForm({ guests: Number(e.target.value) }))}
          >
            {[1,2,3,4,5,6].map((n) => (
              <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="booking-widget__btn">
        Check Availability →
      </button>
    </form>
  )
}
