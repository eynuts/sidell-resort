import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './Accommodations.css'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import { useAuth } from '../../AuthContext'

const Accommodations = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const { user, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    { id: 'all', label: 'All Rooms' },
    { id: 'kubo', label: 'Kubo' },
    { id: 'house', label: 'House' }
  ]

  const accommodations = [
    {
      id: 1,
      title: 'Modern Kubo',
      subtitle: 'Family',
      image: image1,
      price: 1500,
      capacity: 'Up to 5 guests',
      category: 'kubo',
      description: 'Experience authentic Filipino architecture with modern comforts. Perfect for families seeking a traditional yet comfortable beach retreat.',
      features: ['Private toilet', 'Traditional design', 'Air circulation', 'Outdoor seating'],
      popular: true
    },
    {
      id: 2,
      title: 'Modern Kubo',
      subtitle: 'Couple',
      image: image2,
      price: 1300,
      capacity: '1-2 guests',
      category: 'kubo',
      description: 'Intimate and cozy space ideal for couples or solo travelers seeking peace and tranquility.',
      features: ['Private toilet', 'Romantic setting', 'Quiet location', 'Cozy ambiance'],
      popular: false
    },
    {
      id: 3,
      title: 'Brown House',
      subtitle: 'Entire Home',
      image: image3,
      price: 5000,
      capacity: 'Up to 15 guests',
      category: 'house',
      description: 'Spacious family house with multiple rooms, full kitchen, and stunning views. Perfect for large gatherings.',
      features: ['5 Rooms', 'Full kitchen', 'Dining area', 'Balcony', 'Free stove & fridge'],
      popular: true
    },
    {
      id: 4,
      title: 'Big Kubo',
      subtitle: 'Function Hall',
      image: image4,
      price: 3000,
      capacity: 'Up to 8 guests',
      category: 'kubo',
      description: 'Traditional large kubo with function hall space. Ideal for group retreats, celebrations, and team buildings.',
      features: ['Private toilet', 'Function space', 'Ground floor rental', 'Event ready'],
      popular: false
    }
  ]

  const filteredRooms = activeCategory === 'all' 
    ? accommodations 
    : accommodations.filter(room => room.category === activeCategory)

  const entranceFees = [
    { item: 'Entrance Fee', price: '₱20', unit: '/person', note: 'Adults & children' },
    { item: 'Kayak Rental', price: '₱200', unit: '/hour' },
    { item: 'Salbabida', price: '₱100', unit: '/day' },
    { item: 'Extra Table + Bench', price: '₱300', unit: '/set' },
    { item: 'Table & Benches', price: '₱500', unit: '/set' }
  ]

  const amenities = [
    'Free BBQ Area Access',
    'Hot & Cold Showers',
    'Spacious Parking',
    'Piso WiFi Available'
  ]

  const policies = [
    { title: 'Check-in', value: '1:00 PM' },
    { title: 'Check-out', value: '11:00 AM' },
    { title: 'Kids', value: 'Free (9 & below)' },
    { title: 'Deposit', value: '50% required' }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(price)
  }

  return (
    <div id="rooms-page-root">
      <Navbar />
      
      <main className="accommodations-page-content">
        {/* Hero Section */}
        <header className="accommodations-hero">
          <div className="hero-content">
            <h1>Room & Accommodation Rates</h1>
            <p>Choose your perfect retreat from our selection of comfortable accommodations</p>
          </div>
        </header>

        {/* Category Filters */}
        <section className="filters-section">
          <div className="filters-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Rooms Swiper */}
        <section className="rooms-section">
          <div className="rooms-container">
            <Swiper
              key={activeCategory}
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={true}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
              className="rooms-swiper"
            >
              {filteredRooms.map((room) => (
                <SwiperSlide key={room.id}>
                  <article className="room-card">
                    {/* Image */}
                    <div className="room-image-container">
                      <img src={room.image} alt={room.title} className="room-image" />
                      
                      {/* Badges */}
                      <div className="room-badges">
                        {room.popular && <span className="room-badge popular">Popular</span>}
                        <span className="room-badge type">{room.subtitle}</span>
                      </div>

                      {/* Price */}
                      <div className="room-price-tag">
                        <span className="price">{formatPrice(room.price)}</span>
                        <span className="unit">/night</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="room-details">
                      <p className="room-capacity">
                        <i className="fas fa-user-group"></i>
                        {room.capacity}
                      </p>
                      <h3 className="room-title">{room.title}</h3>
                      <p className="room-description">{room.description}</p>

                      {/* Features */}
                      <div className="room-features">
                        {room.features.slice(0, 3).map((feature, i) => (
                          <span key={i}>{feature}</span>
                        ))}
                      </div>

                      {/* Button */}
                      <button onClick={() => setSelectedRoom(room)} className="room-btn">
                        View Details
                      </button>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Info Section */}
        <section className="info-section">
          <div className="info-container">
            <div className="info-grid">
              {/* Entrance Fees */}
              <div className="info-card">
                <h2><i className="fas fa-ticket-alt"></i> Entrance & Rentals</h2>
                {entranceFees.map((fee, i) => (
                  <div key={i} className="fee-item">
                    <span className="name">{fee.item}</span>
                    <span className="price">{fee.price}<span className="note">{fee.unit}</span></span>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="info-card">
                <h2><i className="fas fa-star"></i> Resort Amenities</h2>
                {amenities.map((item, i) => (
                  <div key={i} className="amenity-row">
                    <i className="fas fa-check"></i>
                    <span>{item}</span>
                  </div>
                ))}
                <div className="quote-box">
                  <p>"We strive to provide all our guests with the most comfortable and enjoyable beach experience possible."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Policies Section */}
        <section className="policies-section">
          <div className="policies-container">
            <div className="policies-header">
              <h2>Resort Information</h2>
              <p>Important details for your stay</p>
            </div>

            <div className="policies-grid">
              {policies.map((policy, i) => (
                <div key={i} className="policy-item">
                  <h3>{policy.title}</h3>
                  <p>{policy.value}</p>
                </div>
              ))}
            </div>

            <div className="cta-box">
              <h3>Ready to Book?</h3>
              <p>Secure your spot today! A 50% down payment confirms your reservation.</p>
              <div className="cta-buttons">
                <button className="cta-btn primary" onClick={login}>Reserve Now</button>
                <button className="cta-btn secondary">Contact Us</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedRoom && (
        <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedRoom(null)} className="modal-close">
              <i className="fas fa-times"></i>
            </button>
            <img src={selectedRoom.image} alt={selectedRoom.title} className="modal-image" />
            <div className="modal-body">
              <div className="modal-header">
                <p className="capacity">{selectedRoom.capacity}</p>
                <h2>{selectedRoom.title}</h2>
                <p className="price">{formatPrice(selectedRoom.price)}<span>/night</span></p>
              </div>
              <p className="modal-description">{selectedRoom.description}</p>
              <div className="modal-features">
                <h3>Room Features</h3>
                <div className="modal-features-grid">
                  {selectedRoom.features.map((feature, i) => (
                    <div key={i} className="modal-feature">
                      <i className="fas fa-check"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className="modal-book-btn"
                onClick={() => navigate('/booking', { state: { room: selectedRoom } })}
              >
                Book This Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Accommodations
