import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ref, push, set } from 'firebase/database'
import { db } from '../../firebase'
import Navbar from '../../components/Navbar'
import './Payment.css'

// QR Code image import
import qrImage from '../../assets/images/qr.png'

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const bookingData = location.state?.bookingData || null
  const [referenceNumber, setReferenceNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!referenceNumber.trim()) {
      alert('Please enter your GCash reference number')
      return
    }

    if (!bookingData) {
      alert('No booking data found. Please start a new booking.')
      navigate('/booking')
      return
    }

    setIsSubmitting(true)

    try {
      // Create a new booking entry in Firebase Realtime Database
      const bookingsRef = ref(db, 'bookings')
      const newBookingRef = push(bookingsRef)
      
      const bookingRecord = {
        ...bookingData,
        // Convert Date objects to ISO strings for Firebase
        checkIn: bookingData.checkIn instanceof Date ? bookingData.checkIn.toISOString() : bookingData.checkIn,
        checkOut: bookingData.checkOut instanceof Date ? bookingData.checkOut.toISOString() : bookingData.checkOut,
        referenceNumber: referenceNumber.trim(),
        paymentStatus: 'pending',
        bookingStatus: 'confirmed',
        createdAt: new Date().toISOString()
      }

      await set(newBookingRef, bookingRecord)
      
      setShowSuccess(true)
      
      // Redirect to home after showing success message
      setTimeout(() => {
        navigate('/')
      }, 3000)
      
    } catch (error) {
      console.error('Error saving booking:', error)
      alert('Failed to save booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!bookingData) {
    return (
      <div id="payment-page-root">
        <Navbar />
        <div className="payment-error">
          <h2>No Booking Data Found</h2>
          <p>Please complete the booking form first.</p>
          <button onClick={() => navigate('/booking')} className="back-btn">
            Go to Booking
          </button>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div id="payment-page-root">
        <Navbar />
        <div className="payment-success">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Payment Submitted!</h2>
          <p>Your booking has been confirmed.</p>
          <p className="success-details">
            Reference: <strong>{referenceNumber}</strong>
          </p>
          <p className="redirect-message">Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return (
    <div id="payment-page-root">
      <Navbar />
      
      <main className="payment-page-content">
        <header className="payment-hero">
          <div className="hero-content">
            <h1>Complete Your Payment</h1>
            <p>Scan the QR code using your GCash app</p>
          </div>
        </header>

        <div className="payment-container">
          <div className="payment-grid">
            {/* Payment Instructions */}
            <section className="payment-instructions">
              <div className="instruction-card">
                <h2><i className="fas fa-mobile-alt"></i> How to Pay</h2>
                <ol className="steps-list">
                  <li>
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Open GCash App</strong>
                      <p>Launch your GCash application on your phone</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Scan QR Code</strong>
                      <p>Use the QR scanner to scan the payment code</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>Enter Amount</strong>
                      <p>Enter the exact amount shown below</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Confirm Payment</strong>
                      <p>Complete the transaction and copy the reference number</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Enter Reference</strong>
                      <p>Paste your GCash reference number below</p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Booking Summary */}
              <div className="payment-summary">
                <h3>Booking Summary</h3>
                <div className="summary-details">
                  <div className="detail-row">
                    <span>Room</span>
                    <span>{bookingData.room?.title} - {bookingData.room?.subtitle}</span>
                  </div>
                  <div className="detail-row">
                    <span>Check-in</span>
                    <span>{bookingData.checkIn ? new Date(bookingData.checkIn).toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not set'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Check-out</span>
                    <span>{bookingData.checkOut ? new Date(bookingData.checkOut).toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not set'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Guests</span>
                    <span>{bookingData.guests} guest(s)</span>
                  </div>
                  <div className="detail-row total">
                    <span>Deposit Amount (50%)</span>
                    <span>₱{bookingData.depositAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* QR Code & Payment Form */}
            <section className="payment-form-section">
              <div className="qr-card">
                <div className="qr-header">
                  <i className="fas fa-qrcode"></i>
                  <span>Scan to Pay</span>
                </div>
                <div className="qr-image-container">
                  <img src={qrImage} alt="GCash QR Code" className="qr-image" />
                </div>
                <div className="qr-amount">
                  <span className="label">Amount to Pay</span>
                  <span className="amount">₱{bookingData.depositAmount?.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="reference-form">
                <h3><i className="fas fa-receipt"></i> Confirm Payment</h3>
                <div className="form-group">
                  <label htmlFor="referenceNumber">GCash Reference Number</label>
                  <input 
                    type="text" 
                    id="referenceNumber"
                    name="referenceNumber"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="Enter your GCash reference number"
                    required
                  />
                  <span className="input-hint">
                    <i className="fas fa-info-circle"></i>
                    Find this in your GCash transaction history
                  </span>
                </div>

                <button 
                  type="submit" 
                  className="submit-payment-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      Confirm Payment
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => navigate('/booking')}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Payment
