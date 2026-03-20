import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import './Gallery.css'

// Image imports
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import image6 from '../../assets/images/image6.jpg'
import image7 from '../../assets/images/image7.jpg'
import image8 from '../../assets/images/image8.jpg'

const Gallery = () => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const photos = [
    { id: 1, src: image1, category: 'Resort', title: 'Tropical Oasis' },
    { id: 2, src: image2, category: 'Beach', title: 'Pristine Shore' },
    { id: 3, src: image3, category: 'Rooms', title: 'Modern Kubo' },
    { id: 4, src: image4, category: 'Rooms', title: 'Big Kubo' },
    { id: 5, src: image6, category: 'Sunset', title: 'Golden Hour' },
    { id: 6, src: image7, category: 'Activity', title: 'Kayaking Adventure' },
    { id: 7, src: image8, category: 'Beach', title: 'Crystal Clear Water' },
  ]

  const openLightbox = (photo) => {
    setSelectedImage(photo)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="mga-container">
      {/* Header */}
      <header className="mga-header animate-fade-in">
        <button className="mga-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <h2>Gallery</h2>
        <div style={{ width: '40px' }}></div>
      </header>

      <main className="mga-main">
        <div className="mga-grid animate-slide-up">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="mga-item" 
              onClick={() => openLightbox(photo)}
            >
              <img src={photo.src} alt={photo.title} loading="lazy" />
              <div className="mga-item-overlay">
                <span className="mga-category">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div className="mga-lightbox" onClick={closeLightbox}>
          <button className="mga-close-btn" onClick={closeLightbox}>
            <i className="fas fa-times"></i>
          </button>
          <div className="mga-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="mga-lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

export default Gallery
