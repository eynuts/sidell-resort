import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './Location.css'
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import { useAuth } from '../../AuthContext'

const Location = () => {
  const { user, login, logout } = useAuth()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const contactInfo = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Address',
      details: ['Sidell Kite and Beach Resort', 'Brgy. Cabidbiran', 'Casilar, Carmen', 'Surigao del Norte, Philippines']
    },
    {
      icon: 'fa-phone-alt',
      title: 'Phone',
      details: ['+63 912 345 6789', '+63 906 789 0123']
    },
    {
      icon: 'fa-envelope',
      title: 'Email',
      details: ['info@sidellbeach.com', 'booking@sidellbeach.com']
    },
    {
      icon: 'fa-clock',
      title: 'Gate Hours',
      details: ['Gate opens: 6:00 AM', 'Gate closes: 10:00 PM']
    }
  ]

  const directions = [
    {
      icon: 'fa-plane',
      title: 'By Air',
      description: 'Fly to Surigao City Airport (SUG) from Manila or Cebu. The resort is approximately 30 minutes away from the airport.'
    },
    {
      icon: 'fa-bus',
      title: 'By Bus',
      description: 'Take a bus from Surigao City Terminal to Carmen. Tell the driver to drop you off at Sidell Beach Resort entrance.'
    },
    {
      icon: 'fa-car',
      title: 'By Car',
      description: 'Navigate to Sidell Beach Resort using GPS. Parking is available on-site for guests.'
    }
  ]

  const nearbyAttractions = [
    {
      name: 'Magpupungko Rock Pools',
      distance: '15 km',
      description: 'Natural rock pools perfect for swimming'
    },
    {
      name: 'Sug Lagoon',
      distance: '20 km',
      description: 'Crystal clear lagoon with kayaking activities'
    },
    {
      name: 'Britney Island',
      distance: '25 km',
      description: 'Beautiful island for island hopping'
    }
  ]

  return (
    <div className="location-page">
      <Navbar />

      {/* Hero Section */}
      <section className="location-hero">
        <div className="hero-bg">
          <img src={image2} alt="Sidell Beach Location" />
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Visit Us</h1>
          <p className="hero-subtitle">
            Discover the beauty of Surigao del Norte at Sidell Beach Resort
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <div className="section-header">
            <h2>Find Us</h2>
            <p>Navigate to your tropical paradise</p>
          </div>

          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.8399688431177!2d121.41940537418978!3d12.460376187809997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bb3bdbd9ed266f%3A0x8c170c1924845422!2sSidell%20Kite%20and%20Beach%20Resort!5e0!3m2!1sen!2sph!4v1773371845345!5m2!1sen!2sph" 
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Sidell Beach Resort Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>We're here to help you plan your visit</p>
          </div>

          <div className="contact-grid">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3>{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="directions-section">
        <div className="directions-container">
          <div className="section-header">
            <h2>How To Get Here</h2>
            <p>Choose your preferred mode of transport</p>
          </div>

          <div className="directions-grid">
            {directions.map((item, index) => (
              <div key={index} className="direction-card">
                <div className="direction-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className="attractions-section">
        <div className="attractions-container">
          <div className="section-header">
            <h2>Nearby Attractions</h2>
            <p>Explore more of Surigao del Norte</p>
          </div>

          <div className="attractions-grid">
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className="attraction-card">
                <div className="attraction-image">
                  <img src={index === 0 ? image3 : index === 1 ? image4 : image1} alt={attraction.name} />
                  <span className="attraction-distance">{attraction.distance}</span>
                </div>
                <div className="attraction-content">
                  <h3>{attraction.name}</h3>
                  <p>{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Visit?</h2>
          <p>Book your stay now and experience the beauty of Sidell Beach Resort!</p>
          <div className="cta-buttons">
            <Link to="/accommodations" className="cta-btn primary">Book Your Stay</Link>
            <a href="tel:+639123456789" className="cta-btn secondary">Call Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Location
