import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Navbar from '../../components/Navbar'
import './Booking.css'

// Image imports
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'

const Booking = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const accommodations = [
    {
      id: 1,
      title: 'Modern Kubo',
      subtitle: 'Family',
      image: image1,
      price: 1500,
      capacity: 'Up to 5 guests',
      category: 'kubo',
      features: ['Private toilet', 'Traditional design', 'Air circulation', 'Outdoor seating']
    },
    {
      id: 2,
      title: 'Modern Kubo',
      subtitle: 'Couple',
      image: image2,
      price: 1300,
      capacity: '1-2 guests',
      category: 'kubo',
      features: ['Private toilet', 'Romantic setting', 'Quiet location', 'Cozy ambiance']
    },
    {
      id: 3,
      title: 'Brown House',
      subtitle: 'Entire Home',
      image: image3,
      price: 5000,
      capacity: 'Up to 15 guests',
      category: 'house',
      features: ['5 Rooms', 'Full kitchen', 'Dining area', 'Balcony', 'Free stove & fridge']
    },
    {
      id: 4,
      title: 'Big Kubo',
      subtitle: 'Function Hall',
      image: image4,
      price: 3000,
      capacity: 'Up to 8 guests',
      category: 'kubo',
      features: ['Private toilet', 'Function space', 'Ground floor rental', 'Event ready']
    }
  ]

  const [room, setRoom] = useState(location.state?.room || null)
   const [showRoomSelector, setShowRoomSelector] = useState(false)
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
  }, [])

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

  const handleRoomChange = (newRoom) => {
    setRoom(newRoom)
    setFormData(prev => ({
      ...prev,
      guests: newRoom.capacity.match(/\d+/)?.[0] || '1'
    }))
    setShowRoomSelector(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!room) {
      alert('Please select a room first.')
      setShowRoomSelector(true)
      return
    }
    if (!formData.checkIn || !formData.checkOut) {
      alert('Please select check-in and check-out dates.')
      return
    }
    // Navigate to payment page with booking data
    const bookingData = {
      room,
      ...formData,
      depositAmount: room.price * 0.5
    }
    navigate('/payment', { state: { bookingData } })
  }

  return (
    <div id="booking-page-root">
      <Navbar />
      
      <main className="booking-page-content">
        <header className="booking-hero">
          <div className="hero-content">
            <h1>Complete Your Reservation</h1>
            <p>You're just one step away from your beach getaway</p>
          </div>
        </header>

        <div className="booking-container">
          <div className="booking-grid">
            {/* Booking Form */}
            <section className="booking-form-section">
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-section">
                  <h2><i className="fas fa-user"></i> Personal Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                        placeholder="John"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                        placeholder="+63 9xx xxxx xxx"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2><i className="fas fa-calendar-alt"></i> Stay Details</h2>
                  <div className="form-row">
                    <div className="form-group date-group">
                      <label>Check-in Date</label>
                      <div className="input-with-icon">
                        <i className="fas fa-calendar-day"></i>
                        <DatePicker
                          selected={formData.checkIn}
                          onChange={(date) => handleDateChange(date, 'checkIn')}
                          selectsStart
                          startDate={formData.checkIn}
                          endDate={formData.checkOut}
                          minDate={new Date()}
                          placeholderText="Select check-in"
                          className="datepicker-input"
                          required
                          dateFormat="MMMM d, yyyy"
                          fixedHeight
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    </div>
                    <div className="form-group date-group">
                      <label>Check-out Date</label>
                      <div className="input-with-icon">
                        <i className="fas fa-calendar-check"></i>
                        <DatePicker
                          selected={formData.checkOut}
                          onChange={(date) => handleDateChange(date, 'checkOut')}
                          selectsEnd
                          startDate={formData.checkIn}
                          endDate={formData.checkOut}
                          minDate={formData.checkIn || new Date()}
                          placeholderText="Select check-out"
                          className="datepicker-input"
                          required
                          dateFormat="MMMM d, yyyy"
                          fixedHeight
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Number of Guests</label>
                    <select name="guests" value={formData.guests} onChange={handleChange}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h2><i className="fas fa-comment-alt"></i> Special Requests</h2>
                  <div className="form-group">
                    <textarea 
                      name="specialRequests" 
                      value={formData.specialRequests} 
                      onChange={handleChange} 
                      placeholder="Any special requirements or requests?"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="submit-booking-btn">
                  Confirm Booking & Pay Deposit
                </button>
                <p className="payment-note">
                  * A 50% down payment is required to confirm your reservation.
                </p>
              </form>
            </section>

            {/* Booking Summary */}
            <aside className="booking-summary-section">
              {room ? (
                <div className="summary-card">
                  <div className="summary-image">
                    <img src={room.image} alt={room.title} />
                  </div>
                  <div className="summary-content">
                    <div className="summary-header">
                      <p className="room-type">{room.subtitle}</p>
                      <button 
                        type="button" 
                        className="change-room-link"
                        onClick={() => setShowRoomSelector(true)}
                      >
                        Change Room
                      </button>
                    </div>
                    <h3>{room.title}</h3>
                    
                    <div className="summary-details">
                      <div className="detail-item">
                        <span className="label">Rate per night</span>
                        <span className="value">₱{room.price.toLocaleString()}</span>
                      </div>
                      <div className="detail-item total">
                        <span className="label">Reservation Deposit (50%)</span>
                        <span className="value">₱{(room.price * 0.5).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="summary-features">
                      <h4>Included Amenities:</h4>
                      <ul>
                        {room.features.slice(0, 4).map((f, i) => (
                          <li key={i}><i className="fas fa-check"></i> {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="summary-card empty">
                  <div className="empty-summary-placeholder">
                    <div className="placeholder-icon">
                      <i className="fas fa-bed"></i>
                    </div>
                    <h3>No Room Selected</h3>
                    <p>Please select an accommodation to continue with your booking.</p>
                    <button 
                      type="button" 
                      className="choose-room-btn"
                      onClick={() => setShowRoomSelector(true)}
                    >
                      Choose a Room
                    </button>
                  </div>
                </div>
              )}

              <div className="help-card">
                <h4>Need Help?</h4>
                <p>Contact our support team for any questions regarding your booking.</p>
                <a href="tel:+639000000000" className="help-link">
                  <i className="fas fa-phone"></i> +63 9xx xxxx xxx
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Room Selection Modal */}
      {showRoomSelector && (
        <div className="room-selector-overlay" onClick={() => setShowRoomSelector(false)}>
          <div className="room-selector-content" onClick={(e) => e.stopPropagation()}>
            <div className="selector-header">
              <h2>Select a Different Room</h2>
              <button onClick={() => setShowRoomSelector(false)} className="close-selector">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="rooms-list">
              {accommodations.map((acc) => (
                <div 
                  key={acc.id} 
                  className={`room-select-card ${room?.id === acc.id ? 'active' : ''}`}
                  onClick={() => handleRoomChange(acc)}
                >
                  <div className="room-select-image">
                    <img src={acc.image} alt={acc.title} />
                  </div>
                  <div className="room-select-info">
                    <div className="room-select-header">
                      <span className="type">{acc.subtitle}</span>
                      <span className="price">₱{acc.price.toLocaleString()}/night</span>
                    </div>
                    <h3>{acc.title}</h3>
                    <p className="capacity"><i className="fas fa-user-group"></i> {acc.capacity}</p>
                    {room?.id === acc.id && <span className="current-badge">Currently Selected</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking
