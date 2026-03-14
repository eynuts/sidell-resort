import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, login, logout } = useAuth()
  const location = useLocation()
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>Sidell Beach</Link>
        
        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/accommodations" className={isActive('/accommodations')}>Rooms</Link>
          <Link to="/activity" className={isActive('/activity')}>Activities</Link>
          <Link to="/location" className={isActive('/location')}>Location</Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <div className="user-profile-trigger" onClick={toggleUserMenu}>
                <div className="user-avatar-wrapper">
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="user-avatar" 
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=0077b6&color=fff`
                    }}
                  />
                  <span className="user-online-status"></span>
                </div>
                <span className="user-name-display">{user.displayName?.split(' ')[0]}</span>
                <i className={`fas fa-chevron-down dropdown-icon ${isUserMenuOpen ? 'rotate' : ''}`}></i>
              </div>

              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <p className="user-full-name">{user.displayName}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="user-dropdown-divider"></div>
                  <Link to="/accommodations" className="user-dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                    <i className="fas fa-calendar-alt"></i> My Bookings
                  </Link>
                  <button onClick={() => { logout(); setIsUserMenuOpen(false); }} className="user-dropdown-item logout-item">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={login} className="login-btn">
              <i className="fab fa-google"></i> Login
            </button>
          )}
          <Link to="/booking" className="book-btn">
            Book Now
          </Link>
        </div>

        <button className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-links">
          {user && (
            <div className="mobile-user-info">
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="mobile-user-avatar"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=0077b6&color=fff`
                }}
              />
              <h3>{user.displayName}</h3>
              <p>{user.email}</p>
            </div>
          )}
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/accommodations" onClick={closeMobileMenu}>Rooms</Link>
          <Link to="/activity" onClick={closeMobileMenu}>Activities</Link>
          <Link to="/location" onClick={closeMobileMenu}>Location</Link>
          {user ? (
            <button onClick={() => { logout(); closeMobileMenu(); }} className="mobile-login-btn logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          ) : (
            <button onClick={() => { login(); closeMobileMenu(); }} className="mobile-login-btn">
              <i className="fab fa-google"></i> Login
            </button>
          )}
          <Link to="/booking" className="mobile-book-btn" onClick={closeMobileMenu}>
            Book Now
          </Link>
        </div>
        <div className="mobile-menu-social">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
