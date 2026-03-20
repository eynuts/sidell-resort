import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './mobile/home/Home'
import Rooms from './mobile/rooms/Rooms'
import Activity from './mobile/activity/Activity'
import Gallery from './mobile/gallery/Gallery'
import Discover from './mobile/discover/Discover'
import Login from './mobile/login/Login'
import EmailLogin from './mobile/login/EmailLogin'
import SignUp from './mobile/login/SignUp'
import Accommodations from './pages/accommodations/Accommodations'
import Location from './mobile/location/Location'
import Booking from './mobile/booking/Booking'
import Wallet from './mobile/wallet/Wallet'
import Profile from './mobile/profile/Profile'
import EditProfile from './mobile/profile/EditProfile'
import Security from './mobile/profile/Security'
import ChangePassword from './mobile/profile/ChangePassword'
import Payment from './pages/payment/Payment'
import Admin from './pages/admin/Admin'
import './App.css'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<EmailLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/location" element={<Location />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/security" element={<Security />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
