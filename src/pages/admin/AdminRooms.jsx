import { useState } from 'react'
import './AdminRooms.css'

const AdminRooms = () => {
  const [rooms] = useState([
    {
      id: 1,
      title: 'Modern Kubo',
      subtitle: 'Family',
      image: '/src/assets/images/image1.jpg',
      price: 1500,
      capacity: 'Up to 5 guests',
      category: 'kubo',
      description: 'Experience authentic Filipino architecture with modern comforts.',
      features: ['Private toilet', 'Traditional design', 'Air circulation', 'Outdoor seating'],
      popular: true,
      status: 'available'
    },
    {
      id: 2,
      title: 'Modern Kubo',
      subtitle: 'Couple',
      image: '/src/assets/images/image2.jpg',
      price: 1300,
      capacity: '1-2 guests',
      category: 'kubo',
      description: 'Intimate and cozy space ideal for couples or solo travelers.',
      features: ['Private toilet', 'Romantic setting', 'Quiet location', 'Cozy ambiance'],
      popular: false,
      status: 'available'
    },
    {
      id: 3,
      title: 'Brown House',
      subtitle: 'Entire Home',
      image: '/src/assets/images/image3.jpg',
      price: 5000,
      capacity: 'Up to 15 guests',
      category: 'house',
      description: 'Spacious family house with multiple rooms, full kitchen, and stunning views.',
      features: ['5 Rooms', 'Full kitchen', 'Dining area', 'Balcony', 'Free stove & fridge'],
      popular: true,
      status: 'available'
    },
    {
      id: 4,
      title: 'Big Kubo',
      subtitle: 'Function Hall',
      image: '/src/assets/images/image4.jpg',
      price: 3000,
      capacity: 'Up to 8 guests',
      category: 'kubo',
      description: 'Traditional large kubo with function hall space.',
      features: ['Private toilet', 'Function space', 'Ground floor rental', 'Event ready'],
      popular: false,
      status: 'maintenance'
    }
  ])

  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Rooms' },
    { id: 'kubo', label: 'Kubo' },
    { id: 'house', label: 'House' }
  ]

  const filteredRooms = activeCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === activeCategory)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(price)
  }

  const roomStats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length
  }

  return (
    <div className="admin-rooms-container">
      {/* Rooms Stats Summary */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0369a1' }}>
            <i className="fas fa-bed"></i>
          </div>
          <div className="stat-info">
            <h3>{roomStats.total}</h3>
            <p>Total Accommodations</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#166534' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{roomStats.available}</h3>
            <p>Available for Booking</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#991b1b' }}>
            <i className="fas fa-tools"></i>
          </div>
          <div className="stat-info">
            <h3>{roomStats.maintenance}</h3>
            <p>Under Maintenance</p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="card-header">
          <div className="header-left">
            <h3>Manage Accommodations</h3>
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
          </div>
          <button className="add-btn">
            <i className="fas fa-plus"></i> Add New Room
          </button>
        </div>

        <div className="rooms-grid">
          {filteredRooms.map((room) => (
            <div key={room.id} className="room-admin-card">
              <div className="room-image-wrapper">
                <img src={room.image} alt={room.title} />
                <div className="room-badges">
                  {room.popular && <span className="badge popular">Popular</span>}
                  <span className="badge type">{room.subtitle}</span>
                  <span className={`badge status ${room.status}`}>{room.status}</span>
                </div>
              </div>
              <div className="room-info">
                <h4>{room.title}</h4>
                <p className="capacity">{room.capacity}</p>
                <p className="description">{room.description}</p>
                <div className="room-features">
                  {room.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="room-footer">
                  <div className="price">
                    <span className="amount">{formatPrice(room.price)}</span>
                    <span className="unit">/night</span>
                  </div>
                  <div className="actions">
                    <button className="edit-btn" title="Edit Room">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="delete-btn" title="Delete Room">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminRooms