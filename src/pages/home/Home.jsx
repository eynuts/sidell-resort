import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './Home.css'
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import { useAuth } from '../../AuthContext'

const Home = () => {
  const { user, login, logout } = useAuth()

  const rooms = [
    {
      id: 1,
      title: 'Modern Kubo (Family)',
      image: image1,
      price: '₱1,500',
      capacity: 'Up to 5 guests'
    },
    {
      id: 2,
      title: 'Modern Kubo (Couple)',
      image: image2,
      price: '₱1,300',
      capacity: '1-2 guests'
    },
    {
      id: 3,
      title: 'Brown House',
      image: image3,
      price: '₱5,000',
      capacity: 'Up to 15 guests'
    },
    {
      id: 4,
      title: 'Big Kubo',
      image: image4,
      price: '₱3,000',
      capacity: 'Up to 8 guests'
    }
  ]

  const highlights = [
    {
      title: 'Sunset Swings',
      description: 'Relax and enjoy the view',
      image: image2
    },
    {
      title: 'Paddle the Blue',
      description: 'Adventure awaits on the water',
      image: image3
    },
    {
      title: 'Coastal Cottages',
      description: 'Your private sanctuary',
      image: image1
    }
  ]

  const galleryImages = [
    image1, image2, image3, image4, image1
  ]

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg">
          <img src={image1} alt="Sidell Beach Resort" />
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Your Private Tropical Sanctuary</h1>
          <p className="hero-subtitle">
            Experience the raw beauty of the coast. Simple living, extraordinary views.
          </p>
          <a href="#rooms" className="hero-cta">
            Explore Our Shoreline
          </a>
        </div>

        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="welcome-content">
            <div className="welcome-text">
              <h2>Welcome to Sidell Beach</h2>
              <p>
                Nestled between the palms and the Pacific, we offer a retreat from the noise. 
                Our A-frame cottages and sprawling greens are designed for those who find luxury 
                in simplicity.
              </p>
              <div className="welcome-features">
                <div className="welcome-feature">
                  <i className="fas fa-palm-tree"></i>
                  <span>Beachfront</span>
                </div>
                <div className="welcome-feature">
                  <i className="fas fa-wifi"></i>
                  <span>Piso WiFi</span>
                </div>
                <div className="welcome-feature">
                  <i className="fas fa-parking"></i>
                  <span>Parking</span>
                </div>
              </div>
            </div>
            
            <div className="welcome-image">
              <img src={image4} alt="Sidell Beach View" />
              <div className="welcome-image-badge">
                <span className="number">15+</span>
                <span className="label">Acres of Paradise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="activities" className="highlights-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header">
            <h2>Experience Paradise</h2>
            <p>Discover the beauty of simple living</p>
          </div>

          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <div key={index} className="highlight-card">
                <img src={item.image} alt={item.title} />
                <div className="highlight-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section id="rooms" className="rooms-preview">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header">
            <h2>Our Accommodations</h2>
            <p>Choose your perfect retreat</p>
          </div>

          <div className="rooms-grid">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-card-image">
                  <img src={room.image} alt={room.title} />
                  <span className="room-card-badge">Available</span>
                </div>
                <div className="room-card-content">
                  <h3>{room.title}</h3>
                  <p className="room-card-capacity">{room.capacity}</p>
                  <div className="room-card-price">
                    <span className="amount">{room.price}</span>
                    <span className="unit">/night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-rooms">
            <Link to="/accommodations">
              View All Rooms <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Gallery */}
      <section id="gallery" className="social-gallery">
        <div className="max-w-7xl mx-auto px-6">
          <div className="social-header">
            <h2>#SidellBeach</h2>
            <p>Tag us in your paradise</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`Gallery ${index + 1}`} />
                <div className="gallery-overlay">
                  <i className="fab fa-instagram"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="location" className="footer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Sidell Beach Resort</h3>
              <p>
                Your private tropical sanctuary. Experience the raw beauty of the coast 
                with simple living and extraordinary views.
              </p>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#rooms">Rooms</a></li>
                <li><a href="#activities">Activities</a></li>
                <li><a href="#gallery">Gallery</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">Location</a></li>
                <li><a href="#">Email Us</a></li>
                <li><a href="#">Phone</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe for special offers and updates</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Sidell Beach Resort. All rights reserved.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
