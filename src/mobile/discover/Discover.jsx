import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import './Discover.css'

// Image imports
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import image6 from '../../assets/images/image6.jpg'
import image7 from '../../assets/images/image7.jpg'
import image8 from '../../assets/images/image8.jpg'

const Discover = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const articles = [
    {
      id: 1,
      title: 'Amihan Kite Season',
      category: 'Pro Tips',
      desc: 'Mansalay is a hidden gem for kite surfing. The Amihan winds from Nov to March provide perfect conditions for riders of all levels.',
      image: image7,
      tag: 'Kite Surfing'
    },
    {
      id: 2,
      title: 'Buktot Beach Hike',
      category: 'Local Adventure',
      desc: 'Take a scenic 45-minute hike to the secluded Buktot Beach. You\'ll pass through a peaceful Mangyan tribe community along the way.',
      image: image2,
      tag: 'Hidden Gem'
    },
    {
      id: 3,
      title: 'The Kubo Experience',
      category: 'Lifestyle',
      desc: 'Our A-frame Modern Kubos are designed for natural ventilation and light. Experience authentic Filipino island living at its finest.',
      image: image3,
      tag: 'Stay'
    }
  ]

  const quickTips = [
    { icon: 'fa-wind', title: 'Wind Check', text: 'Check the wind forecast if you\'re here for kite surfing. Peak winds are usually in the afternoon.' },
    { icon: 'fa-utensils', title: 'Fresh Catch', text: 'Don\'t miss the seafood dinner! Ms. Sidell prepares fresh catches from the local fishermen daily.' },
    { icon: 'fa-hiking', title: 'Local Guides', text: 'Ask our staff for a guide if you want to visit the nearby Mangyan community respectfully.' }
  ]

  return (
    <div className="md-container">
      {/* Fixed Header */}
      <header className="md-header animate-fade-in">
        <button className="md-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h2>Discover Mansalay</h2>
        <div style={{ width: '40px' }}></div>
      </header>

      <main className="md-main">
        {/* Hero Article */}
        <section className="md-section animate-slide-up" style={{ "--delay": "0.1s" }}>
          <div className="md-hero-article">
            <img src={image1} alt="Sidell Resort View" />
            <div className="md-hero-content">
              <span className="md-hero-badge">Offbeat Paradise</span>
              <h3>Southwestern Mindoro\'s Best Kept Secret</h3>
              <p>Escape the mainstream crowds and find your sanctuary in the raw beauty of Mansalay\'s coastline.</p>
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="md-section animate-slide-up" style={{ "--delay": "0.2s" }}>
          <div className="md-section-head">
            <h3>Explore More</h3>
          </div>
          <div className="md-article-list">
            {articles.map((article) => (
              <div key={article.id} className="md-article-card">
                <div className="md-article-img">
                  <img src={article.image} alt={article.title} />
                  <span className="md-article-tag">{article.tag}</span>
                </div>
                <div className="md-article-body">
                  <span className="md-article-cat">{article.category}</span>
                  <h4>{article.title}</h4>
                  <p>{article.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="md-section animate-slide-up" style={{ "--delay": "0.3s" }}>
          <div className="md-section-head">
            <h3>Resort Secrets</h3>
          </div>
          <div className="md-tips-grid">
            {quickTips.map((tip, index) => (
              <div key={index} className="md-tip-card">
                <div className="md-tip-icon">
                  <i className={`fas ${tip.icon}`}></i>
                </div>
                <div className="md-tip-content">
                  <h5>{tip.title}</h5>
                  <p>{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Info */}
        <section className="md-section animate-slide-up" style={{ "--delay": "0.4s" }}>
          <div className="md-footer-card">
            <h4>Want to see more?</h4>
            <p>Visit our gallery to see more photos of our resort and activities.</p>
            <button className="md-footer-btn" onClick={() => navigate('/gallery')}>
              Open Gallery
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default Discover
