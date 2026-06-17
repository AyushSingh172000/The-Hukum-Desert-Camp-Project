import { useEffect } from 'react'
import { SITE } from '../../constants'
import './Policy.css'

export default function Policy() {
  useEffect(() => {
    document.title = 'Policies — The Hukum Desert Camp'
  }, [])

  return (
    <div style={{ marginTop: 'var(--navbar-height)' }}>
      <div className="page-hero-band">
        <div className="page-hero-band__overlay" />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-sunset)' }} />
        <div className="page-hero-band__content container">
          <h1 className="page-hero-band__title">Policies</h1>
        </div>
      </div>

      <section className="section">
        <div className="container container--narrow">
          <div className="policy-nav">
            <a href="#privacy"  className="policy-nav__link">Privacy Policy</a>
            <a href="#terms"    className="policy-nav__link">Terms of Service</a>
            <a href="#refund"   className="policy-nav__link">Refund Policy</a>
          </div>

          {/* Privacy */}
          <article className="policy-section" id="privacy">
            <h2 className="policy-heading">Privacy Policy</h2>
            <p className="policy-date">Effective: January 1, 2026</p>
            <p>The Hukum Desert Camp ("{SITE.name}") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard the personal information you provide when booking with us or using our website.</p>

            <h3 className="policy-subheading">Information We Collect</h3>
            <ul className="policy-list">
              <li>Contact details (name, email, phone number) provided during booking or enquiry.</li>
              <li>Booking information (check-in/out dates, number of guests, accommodation preference).</li>
              <li>Newsletter subscription email addresses.</li>
              <li>Anonymised usage data (pages visited, browser type) via web analytics.</li>
            </ul>

            <h3 className="policy-subheading">How We Use Your Information</h3>
            <ul className="policy-list">
              <li>To confirm and manage your reservation.</li>
              <li>To send booking confirmations, itineraries, and pre-arrival information.</li>
              <li>To respond to your queries.</li>
              <li>To send newsletter updates (only if you subscribed).</li>
            </ul>

            <h3 className="policy-subheading">Data Security</h3>
            <p>We implement industry-standard security measures. We do not store payment card details on our servers — payments are processed via trusted third-party gateways.</p>

            <h3 className="policy-subheading">Contact</h3>
            <p>For privacy concerns, email us at <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a>.</p>
          </article>

          {/* Terms */}
          <article className="policy-section" id="terms">
            <h2 className="policy-heading">Terms of Service</h2>
            <p className="policy-date">Effective: January 1, 2026</p>
            <p>By accessing our website or making a booking, you agree to these terms. Please read them carefully.</p>

            <h3 className="policy-subheading">Reservations</h3>
            <ul className="policy-list">
              <li>Bookings are confirmed only after receiving a written confirmation from our team.</li>
              <li>A deposit may be required to secure the reservation.</li>
              <li>Prices are in Indian Rupees and include applicable taxes unless stated otherwise.</li>
            </ul>

            <h3 className="policy-subheading">Guest Conduct</h3>
            <ul className="policy-list">
              <li>Guests are expected to respect the local culture, wildlife, and other guests.</li>
              <li>Alcohol consumption is subject to local regulations and camp rules.</li>
              <li>No damage to camp property or natural surroundings.</li>
            </ul>

            <h3 className="policy-subheading">Liability</h3>
            <p>The Hukum Desert Camp is not liable for loss of personal belongings, medical emergencies, or events beyond our reasonable control (extreme weather, natural events).</p>
          </article>

          {/* Refund */}
          <article className="policy-section" id="refund">
            <h2 className="policy-heading">Refund & Cancellation Policy</h2>
            <p className="policy-date">Effective: January 1, 2026</p>

            <h3 className="policy-subheading">Cancellation by Guest</h3>
            <div className="policy-table-wrap">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Cancellation Notice</th>
                    <th>Refund</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>15+ days before check-in</td><td>100% refund</td></tr>
                  <tr><td>7–14 days before check-in</td><td>50% refund</td></tr>
                  <tr><td>Less than 7 days</td><td>No refund</td></tr>
                  <tr><td>No-show</td><td>No refund</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="policy-subheading">Cancellation by The Hukum Desert Camp</h3>
            <p>In the rare event we must cancel your booking (extreme weather, force majeure), we will provide a full refund or offer alternative dates of your choice.</p>

            <h3 className="policy-subheading">Refund Processing</h3>
            <p>Approved refunds are processed within 7–10 business days to the original payment method.</p>

            <h3 className="policy-subheading">Contact for Cancellations</h3>
            <p>
              Email <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a> or call{' '}
              <a href={`tel:${SITE.phoneRaw}`} className="link">{SITE.phone}</a>.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
