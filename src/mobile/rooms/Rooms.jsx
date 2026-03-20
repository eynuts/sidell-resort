import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Rooms.css'

import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'

const Rooms = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedRoom, setSelectedRoom] = useState(null)
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(price)
  }

  return (
    <div className="mr-container">
      {/* Header */}
      <header className="mr-header">
        <button className="mr-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>Select Room</h2>
        <div style={{width: '40px'}}></div> {/* spacer */}
      </header>

      {/* Filter Chips */}
      <div className="mr-filter-scroll">
        <div className="mr-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`mr-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Room List */}
      <div className="mr-list">
        {filteredRooms.map((room) => (
          <div key={room.id} className="mr-card animate-slide-up">
            <div className="mr-card-img">
              <img src={room.image} alt={room.title} />
              {room.popular && <span className="mr-badge-popular">Popular</span>}
            </div>
            <div className="mr-card-body">
              <div className="mr-card-header">
                <div>
                  <span className="mr-subtitle">{room.subtitle}</span>
                  <h3>{room.title}</h3>
                </div>
                <div className="mr-price-tag">
                  <span className="amount">{formatPrice(room.price)}</span>
                  <span className="unit">/night</span>
                </div>
              </div>

              <div className="mr-capacity">
                <i className="fas fa-user-group"></i>
                <span>{room.capacity}</span>
              </div>

              <div className="mr-features">
                {room.features.slice(0, 3).map((f, i) => (
                  <span key={i} className="mr-feature-pill">{f}</span>
                ))}
              </div>

              <button className="mr-view-btn" onClick={() => setSelectedRoom(room)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRoom && (
        <div className="mr-modal-overlay animate-fade-in" onClick={() => setSelectedRoom(null)}>
          <div className="mr-modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="mr-modal-img">
              <img src={selectedRoom.image} alt={selectedRoom.title} />
              <button className="mr-close-btn" onClick={() => setSelectedRoom(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mr-modal-body">
              <div className="mr-modal-header">
                <h3>{selectedRoom.title}</h3>
                <span className="mr-modal-price">{formatPrice(selectedRoom.price)}/night</span>
              </div>
              <p className="mr-modal-desc">{selectedRoom.description}</p>
              
              <h4>Features</h4>
              <ul className="mr-modal-features">
                {selectedRoom.features.map((f, i) => (
                  <li key={i}><i className="fas fa-check-circle"></i> {f}</li>
                ))}
              </ul>

              <button 
                className="mr-book-btn"
                onClick={() => navigate('/booking', { state: { room: selectedRoom } })}
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rooms
