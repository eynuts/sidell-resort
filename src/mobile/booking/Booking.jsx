import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './Booking.css'

const Booking = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [room, setRoom] = useState(location.state?.room || null)
  const [showGuestsModal, setShowGuestsModal] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: null,
    checkOut: null,
    guests: location.state?.room ? (location.state.room.capacity.match(/\d+/)?.[0] || '1') : '1',
    specialRequests: ''
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    // If somehow navigated here without a room, go back to rooms
    if (!room) {
      navigate('/rooms')
    }
  }, [room, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateChange = (date, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.checkIn || !formData.checkOut) {
      alert('Please select check-in and check-out dates.')
      return
    }
    
    // In a real app, this goes to payment or processes the booking
    const bookingData = {
      room,
      ...formData,
      depositAmount: room.price * 0.5
    }
    navigate('/payment', { state: { bookingData } })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(price)
  }

  if (!room) return null;

  return (
    <div className="mb-container">
      {/* Header */}
      <header className="mb-header">
        <button className="mb-back-btn" onClick={() => navigate(-1)} type="button">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>Reservation</h2>
        <div style={{width: '40px'}}></div>
      </header>

      {/* Selected Room Summary */}
      <div className="mb-summary animate-slide-up">
        <div className="mb-summary-card">
          <img src={room.image} alt={room.title} />
          <div className="mb-summary-info">
            <span className="mb-summary-badge">{room.subtitle}</span>
            <h3>{room.title}</h3>
            <p className="mb-summary-price">{formatPrice(room.price)}<span>/night</span></p>
          </div>
        </div>
      </div>

      <main className="mb-main animate-slide-up" style={{ "--delay": "0.1s" }}>
        <form onSubmit={handleSubmit} className="mb-form">
          {/* Stay Details */}
          <div className="mb-section">
            <h3 className="mb-section-title"><i className="fas fa-calendar-alt"></i> Stay Details</h3>
            
            <div className="mb-date-grid">
              <div className="mb-input-group">
                <label>Check-in</label>
                <div className="mb-date-input">
                  <i className="fas fa-calendar-day"></i>
                  <DatePicker
                    selected={formData.checkIn}
                    onChange={(date) => handleDateChange(date, 'checkIn')}
                    selectsStart
                    startDate={formData.checkIn}
                    endDate={formData.checkOut}
                    minDate={new Date()}
                    placeholderText="Select date"
                    required
                    dateFormat="MMM d, yyyy"
                  />
                </div>
              </div>
              <div className="mb-input-group">
                <label>Check-out</label>
                <div className="mb-date-input">
                  <i className="fas fa-calendar-check"></i>
                  <DatePicker
                    selected={formData.checkOut}
                    onChange={(date) => handleDateChange(date, 'checkOut')}
                    selectsEnd
                    startDate={formData.checkIn}
                    endDate={formData.checkOut}
                    minDate={formData.checkIn || new Date()}
                    placeholderText="Select date"
                    required
                    dateFormat="MMM d, yyyy"
                  />
                </div>
              </div>
            </div>

            <div className="mb-input-group">
              <label>Number of Guests</label>
              <div 
                className="mb-select-wrapper" 
                onClick={() => setShowGuestsModal(true)}
              >
                <i className="fas fa-user-group mb-select-icon"></i>
                <div className="mb-select-display">
                  {formData.guests} {Number(formData.guests) === 1 ? 'Guest' : 'Guests'}
                </div>
                <i className="fas fa-chevron-down mb-select-arrow"></i>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="mb-section">
            <h3 className="mb-section-title"><i className="fas fa-user"></i> Guest Info</h3>
            
            <div className="mb-input-row">
              <div className="mb-input-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" />
              </div>
              <div className="mb-input-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
              </div>
            </div>

            <div className="mb-input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            </div>

            <div className="mb-input-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+63 9xx xxxx xxx" />
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-section mb-payment-summary">
            <h3 className="mb-section-title"><i className="fas fa-credit-card"></i> Payment Details</h3>
            <div className="mb-payment-row">
              <span>Rate per night</span>
              <span>{formatPrice(room.price)}</span>
            </div>
            <div className="mb-payment-row mb-total">
              <span>Required Deposit (50%)</span>
              <span>{formatPrice(room.price * 0.5)}</span>
            </div>
            <p className="mb-payment-note">The remaining balance is paid upon arrival.</p>
          </div>

          {/* Fixed Bottom Button */}
          <div className="mb-bottom-action">
            <button type="submit" className="mb-submit-btn">
              Proceed to Payment
            </button>
          </div>
        </form>
      </main>

      {/* Guests Modal */}
      {showGuestsModal && (
        <div className="mb-modal-overlay animate-fade-in" onClick={() => setShowGuestsModal(false)}>
          <div className="mb-modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="mb-modal-header">
              <h3>Select Guests</h3>
              <button type="button" className="mb-close-btn" onClick={() => setShowGuestsModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-modal-body">
              <div className="mb-guests-grid">
                {[...Array(parseInt(room.capacity.match(/\d+/)?.[0] || '12'))].map((_, i) => {
                  const num = i + 1;
                  return (
                    <button 
                      key={num} 
                      type="button"
                      className={`mb-guest-btn ${Number(formData.guests) === num ? 'active' : ''}`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, guests: String(num) }))
                        setShowGuestsModal(false)
                      }}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking
