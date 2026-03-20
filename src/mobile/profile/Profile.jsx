import { useAuth } from '../../AuthContext'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const displayUser = user

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (!displayUser) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <main className="profile-main animate-slide-up">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar guest-avatar">
                <i className="fas fa-user-secret"></i>
              </div>
              <h2>Guest User</h2>
              <p>Sign in to unlock all features</p>
            </div>

            <div className="profile-menu">
              <div className="menu-item" onClick={() => navigate('/login')}>
                <i className="fas fa-sign-in-alt"></i>
                <span>Login / Sign Up</span>
                <i className="fas fa-chevron-right"></i>
              </div>
              <div className="menu-item" onClick={() => navigate('/discover')}>
                <i className="fas fa-compass"></i>
                <span>Discover</span>
                <i className="fas fa-chevron-right"></i>
              </div>
              <div className="menu-item" onClick={() => navigate('/location')}>
                <i className="fas fa-map-marker-alt"></i>
                <span>How to Get Here</span>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header animate-fade-in">
        <h1>Profile</h1>
      </div>

      <main className="profile-main animate-slide-up">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <img 
              src={displayUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayUser.displayName)}&background=0077b6&color=fff`} 
              alt={displayUser.displayName} 
              className="profile-avatar"
            />
            <h2>{displayUser.displayName}</h2>
            <p>{displayUser.email}</p>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">Bookings</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">Reviews</span>
            </div>
          </div>

          <div className="profile-menu">
            <div className="menu-item" onClick={() => navigate('/edit-profile')}>
              <i className="fas fa-user-edit"></i>
              <span>Edit Profile</span>
              <i className="fas fa-chevron-right"></i>
            </div>
            <div className="menu-item">
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
              <i className="fas fa-chevron-right"></i>
            </div>
            <div className="menu-item" onClick={() => navigate('/security')}>
              <i className="fas fa-shield-alt"></i>
              <span>Security</span>
              <i className="fas fa-chevron-right"></i>
            </div>
            <div className="menu-item logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default Profile
