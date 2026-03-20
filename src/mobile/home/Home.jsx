import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import BottomNav from '../../components/BottomNav'
import './Home.css'

// Image imports
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import image6 from '../../assets/images/image6.jpg'
import image7 from '../../assets/images/image7.jpg'

const Home = () => {
  const { user, manualUser } = useAuth()
  const displayUser = user || manualUser;

  const categories = [
    { id: 'rooms', label: 'Rooms', icon: 'fa-bed', path: '/rooms' },
    { id: 'activities', label: 'Activities', icon: 'fa-umbrella-beach', path: '/activity' },
    { id: 'map', label: 'Map', icon: 'fa-map-marked-alt', path: '/location' },
    { id: 'gallery', label: 'Gallery', icon: 'fa-images', path: '/gallery' },
    { id: 'wallet', label: 'Wallet', icon: 'fa-wallet', path: '/wallet' }
  ]

  const popularRooms = [
    {
      id: 1,
      name: 'Modern Kubo',
      location: 'Family Retreat',
      image: image1,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Brown House',
      location: 'Group Stay',
      image: image3,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Big Kubo',
      location: 'Function Hall',
      image: image4,
      rating: 4.7
    }
  ]

  const experiences = [
    {
      id: 1,
      title: 'Culture & Nature',
      image: image6,
    },
    {
      id: 2,
      title: 'Water Adventure',
      image: image7,
    }
  ]

  return (
    <div className="mh-container">
      {/* Header */}
      <header className="mh-header animate-fade-in">
        <div className="mh-location">
          <i className="fas fa-map-marker-alt"></i>
          <div className="mh-location-text">
            <span>Mansalay, Oriental</span>
            <strong>Mindoro</strong>
          </div>
          <i className="fas fa-chevron-down mh-dropdown-icon"></i>
        </div>
        <div className="mh-header-actions">
          <div className="mh-bell">
            <i className="fas fa-bell"></i>
            <span className="dot"></span>
          </div>
        </div>
      </header>

      <main className="mh-main">
        {/* Categories */}
        <section className="mh-categories animate-slide-up">
          <div className="mh-cat-grid">
            {categories.map((cat) => (
              <Link to={cat.path} key={cat.id} className="mh-cat-item" style={{textDecoration: 'none'}}>
                <div className="mh-cat-icon">
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Hero Section */}
        <section className="mh-hero animate-slide-up" style={{ "--delay": "0.1s" }}>
          <div className="mh-hero-wrapper">
            <img src={image2} alt="Sidell Resort" />
            <div className="mh-hero-overlay"></div>
            <div className="mh-hero-text">
              <span className="mh-badge">SIDELL RESORT</span>
              <h1>Find your own tropical sanctuary</h1>
            </div>
          </div>
        </section>

        {/* Popular Destination (Horizontal Scroll for better mobile UI) */}
        <section className="mh-popular animate-slide-up" style={{ "--delay": "0.2s" }}>
          <div className="mh-section-head">
            <h2>Popular for you</h2>
            <Link to="/rooms" className="mh-view-all">See all</Link>
          </div>
          <div className="mh-popular-scroll">
            {popularRooms.map((room) => (
              <div key={room.id} className="mh-card">
                <div className="mh-card-img">
                  <img src={room.image} alt={room.name} />
                  <div className="mh-rating">
                    <i className="fas fa-star"></i>
                    <span>{room.rating}</span>
                  </div>
                </div>
                <div className="mh-card-body">
                  <h3>{room.name}</h3>
                  <p>{room.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Experiences */}
        <section className="mh-experiences animate-slide-up" style={{ "--delay": "0.3s" }}>
          <div className="mh-section-head">
            <h2>Special Experiences</h2>
          </div>
          <div className="mh-exp-list">
            {experiences.map((exp) => (
              <div key={exp.id} className="mh-exp-card">
                <img src={exp.image} alt={exp.title} />
                <div className="mh-exp-content">
                  <h3>{exp.title}</h3>
                  <Link to="/activity" className="mh-exp-btn" style={{textDecoration: 'none'}}>Explore</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Home
