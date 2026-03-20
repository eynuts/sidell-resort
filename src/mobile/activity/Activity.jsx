import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import './Activity.css'

// Image imports
import image2 from '../../assets/images/image2.jpg'
import image6 from '../../assets/images/image6.jpg'
import image7 from '../../assets/images/image7.jpg'
import image8 from '../../assets/images/image8.jpg'

const Activity = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const activities = [
    {
      id: 1,
      title: 'Kayaking',
      description: 'Explore the crystal clear waters with our premium kayaks.',
      image: image7,
      icon: 'fa-water',
      price: 200,
      unit: '/hour'
    },
    {
      id: 2,
      title: 'Beach Volleyball',
      description: 'Enjoy a friendly game on our pristine beach.',
      image: image2,
      icon: 'fa-volleyball-ball',
      price: 0,
      unit: 'Free'
    },
    {
      id: 3,
      title: 'Swimming',
      description: 'Take a refreshing dip in our safe beach area.',
      image: image8,
      icon: 'fa-swimming-pool',
      price: 0,
      unit: 'Free'
    },
    {
      id: 4,
      title: 'Sunset Watching',
      description: 'Witness breathtaking sunset views from our scenic spot.',
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

  return (
    <div className="ma-container">
      {/* Header */}
      <header className="ma-header animate-fade-in">
        <button className="ma-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h2>Activities</h2>
        <div style={{ width: '40px' }}></div>
      </header>

      <main className="ma-main">
        {/* Activities Section */}
        <section className="ma-section animate-slide-up" style={{ "--delay": "0.1s" }}>
          <div className="ma-section-head">
            <h3>Things to Do</h3>
          </div>
          <div className="ma-activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className="ma-activity-card">
                <div className="ma-activity-img">
                  <img src={activity.image} alt={activity.title} />
                  <div className="ma-activity-price">
                    {activity.price === 0 ? 'FREE' : `₱${activity.price}${activity.unit}`}
                  </div>
                </div>
                <div className="ma-activity-info">
                  <div className="ma-activity-title-row">
                    <h4>{activity.title}</h4>
                    <i className={`fas ${activity.icon}`}></i>
                  </div>
                  <p>{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rentals Section */}
        <section className="ma-section animate-slide-up" style={{ "--delay": "0.2s" }}>
          <div className="ma-section-head">
            <h3>Equipment Rentals</h3>
          </div>
          <div className="ma-rental-grid">
            {rentals.map((item, index) => (
              <div key={index} className="ma-rental-card">
                <div className="ma-rental-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h5>{item.name}</h5>
                <p>{item.price}<span>{item.unit}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Info Section */}
        <section className="ma-section animate-slide-up" style={{ "--delay": "0.3s" }}>
          <div className="ma-info-card">
            <div className="ma-info-header">
              <i className="fas fa-info-circle"></i>
              <h4>Quick Guide</h4>
            </div>
            <div className="ma-info-list">
              <div className="ma-info-item">
                <i className="fas fa-clock"></i>
                <span>Gate opens at 6:00 AM</span>
              </div>
              <div className="ma-info-item">
                <i className="fas fa-user-shield"></i>
                <span>Register at entrance</span>
              </div>
              <div className="ma-info-item">
                <i className="fas fa-trash-alt"></i>
                <span>Dispose trash properly</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Activity
