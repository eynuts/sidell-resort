import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './Activity.css'
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import image6 from '../../assets/images/image6.jpg'
import image7 from '../../assets/images/image7.jpg'
import image8 from '../../assets/images/image8.jpg'
import { useAuth } from '../../AuthContext'

const Activity = () => {
  const [expandedImage, setExpandedImage] = useState(null)
  const { user, login, logout } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const openExpandedImage = (image) => {
    setExpandedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeExpandedImage = () => {
    setExpandedImage(null)
    document.body.style.overflow = 'auto'
  }

  const activities = [
    {
      id: 1,
      title: 'Kayaking',
      description: 'Explore the crystal clear waters of the coast with our premium kayaks. Perfect for beginners and experts alike.',
      image: image7,
      icon: 'fa-water',
      price: 200,
      unit: '/hour'
    },
    {
      id: 2,
      title: 'Beach Volleyball',
      description: 'Enjoy a friendly game of volleyball on our pristine beach. Equipment provided.',
      image: image2,
      icon: 'fa-volleyball-ball',
      price: 0,
      unit: 'Free'
    },
    {
      id: 3,
      title: 'Swimming',
      description: 'Take a refreshing dip in our clean and safe beach area. Lifeguards on duty.',
      image: image8,
      icon: 'fa-swimming-pool',
      price: 0,
      unit: 'Free'
    },
    {
      id: 4,
      title: 'Sunset Watching',
      description: 'Witness breathtaking sunset views from our scenic spot. Perfect for photos.',
      image: image6,
      icon: 'fa-sun',
      price: 0,
      unit: 'Free'
    }
  ]

  const rentals = [
    { name: 'Kayak', price: '₱200', unit: '/hour', icon: 'fa-water' },
    { name: 'Salbabida', price: '₱100', unit: '/day', icon: 'fa-life-ring' },
    { name: 'Extra Table + Bench', price: '₱300', unit: '/set', icon: 'fa-chair' },
    { name: 'Table & Benches', price: '₱500', unit: '/set', icon: 'fa-chair' }
  ]

  const amenities = [
    'Free BBQ Area Access',
    'Hot & Cold Showers',
    'Spacious Parking',
    'Piso WiFi Available',
    'CCTV Security',
    '24/7 Staff On Duty'
  ]

  return (
    <div className="activity-page">
      <Navbar />

      {/* Hero Section */}
      <section className="activity-hero">
        <div className="hero-content">
          <h1>Activities & Adventures</h1>
          <p>Discover endless fun and relaxation at Sidell Beach Resort</p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="activities-section">
        <div className="activities-container">
          <div className="section-header">
            <h2>What You Can Do</h2>
            <p>From adventure to relaxation, we have it all</p>
          </div>

          <div className="activities-grid">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-image-container" onClick={() => openExpandedImage(activity.image)} style={{ cursor: 'pointer' }}>
                  <img src={activity.image} alt={activity.title} className="activity-image" />
                  <div className="activity-icon">
                    <i className={`fas ${activity.icon}`}></i>
                  </div>
                </div>
                <div className="activity-details">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                  <div className="activity-meta">
                    <span className="activity-price">
                      {activity.price === 0 ? 'Free' : `₱${activity.price}`}
                      {activity.price > 0 && <span>{activity.unit}</span>}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rentals Section */}
      <section className="rentals-section">
        <div className="rentals-container">
          <div className="section-header">
            <h2>Equipment Rentals</h2>
            <p>Enhance your beach experience with our rental equipment</p>
          </div>

          <div className="rentals-grid">
            {rentals.map((item, index) => (
              <div key={index} className="rental-card">
                <div className="rental-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3>{item.name}</h3>
                <p className="price">{item.price}<span className="unit">{item.unit}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-container">
          <div className="info-grid">
            <div className="info-card">
              <h2><i className="fas fa-star"></i> Resort Amenities</h2>
              {amenities.map((item, i) => (
                <div key={i} className="amenity-row">
                  <i className="fas fa-check"></i>
                  <span>{item}</span>
                </div>
              ))}
              <div className="quote-box">
                <p>"Create unforgettable memories with your loved ones at Sidell Beach Resort."</p>
              </div>
            </div>

            <div className="info-card">
              <h2><i className="fas fa-info-circle"></i> Important Info</h2>
              <div className="amenity-row">
                <i className="fas fa-clock"></i>
                <span>Gate opens at 6:00 AM</span>
              </div>
              <div className="amenity-row">
                <i className="fas fa-moon"></i>
                <span>Quiet hours after 10:00 PM</span>
              </div>
              <div className="amenity-row">
                <i className="fas fa-user-shield"></i>
                <span>Guests must register at the entrance</span>
              </div>
              <div className="amenity-row">
                <i className="fas fa-paw"></i>
                <span>Pets not allowed on the beach</span>
              </div>
              <div className="quote-box">
                <p>"Help us keep our beach clean. Please dispose of trash properly."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready for an Adventure?</h2>
          <p>Book your stay now and experience all the activities Sidell Beach has to offer!</p>
          <div className="cta-buttons">
            <Link to="/accommodations" className="cta-btn primary">Book Your Stay</Link>
            <a href="#location" className="cta-btn secondary">Get Directions</a>
          </div>
        </div>
      </section>

      {/* Expanded Image Lightbox */}
      {expandedImage && (
        <div className="image-lightbox" onClick={closeExpandedImage}>
          <button className="lightbox-close" onClick={closeExpandedImage}>
            <i className="fas fa-times"></i>
          </button>
          <img src={expandedImage} alt="Expanded activity" className="lightbox-image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}

export default Activity
