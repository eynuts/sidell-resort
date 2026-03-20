import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import './Wallet.css'

const Wallet = () => {
  const { user, manualUser } = useAuth()
  const displayUser = user || manualUser
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const currentBalance = 12500.00

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(price)
  }

  const transactions = [
    {
      id: 1,
      type: 'payment',
      title: 'Modern Kubo Reservation',
      date: 'Today, 2:30 PM',
      amount: -1500,
      icon: 'fa-bed'
    },
    {
      id: 2,
      type: 'topup',
      title: 'GCash Top Up',
      date: 'Yesterday, 10:15 AM',
      amount: 5000,
      icon: 'fa-wallet'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Restaurant Bill',
      date: 'Mar 18, 7:45 PM',
      amount: -850,
      icon: 'fa-utensils'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Kayak Rental',
      date: 'Mar 18, 2:00 PM',
      amount: -200,
      icon: 'fa-ship'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Entrance Fee',
      date: 'Mar 18, 1:00 PM',
      amount: -40,
      icon: 'fa-ticket-alt'
    },
    {
      id: 6,
      type: 'topup',
      title: 'Maya Top Up',
      date: 'Mar 17, 9:20 AM',
      amount: 3000,
      icon: 'fa-wallet'
    },
    {
      id: 7,
      type: 'payment',
      title: 'BBQ Grill Rental',
      date: 'Mar 16, 5:30 PM',
      amount: -300,
      icon: 'fa-fire'
    },
    {
      id: 8,
      type: 'payment',
      title: 'Brown House Deposit',
      date: 'Mar 15, 11:00 AM',
      amount: -2500,
      icon: 'fa-home'
    }
  ]

  return (
    <div className="mw-container">
      {/* Header */}
      <header className="mw-header">
        <button className="mw-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>My Wallet</h2>
        <div style={{width: '40px'}}></div>
      </header>

      {/* Balance Card */}
      <section className="mw-balance-section animate-slide-up">
        <div className="mw-balance-card">
          <div className="mw-balance-info">
            <p>Available Balance</p>
            <h1>{formatPrice(currentBalance)}</h1>
            <span className="mw-user-id">ID: {displayUser?.email || 'sidell_guest_001'}</span>
          </div>
          
          <div className="mw-actions-grid">
            <button className="mw-action-btn">
              <div className="mw-icon-wrap primary">
                <i className="fas fa-plus"></i>
              </div>
              <span>Top Up</span>
            </button>
            <button className="mw-action-btn">
              <div className="mw-icon-wrap">
                <i className="fas fa-qrcode"></i>
              </div>
              <span>Pay</span>
            </button>
            <button className="mw-action-btn">
              <div className="mw-icon-wrap">
                <i className="fas fa-paper-plane"></i>
              </div>
              <span>Send</span>
            </button>
            <button className="mw-action-btn">
              <div className="mw-icon-wrap">
                <i className="fas fa-history"></i>
              </div>
              <span>History</span>
            </button>
          </div>
        </div>
      </section>



      {/* Transactions */}
      <section className="mw-transactions-section animate-slide-up" style={{ "--delay": "0.2s" }}>
        <div className="mw-section-head">
          <h3>Recent Transactions</h3>
          <button className="mw-view-all">View all</button>
        </div>
        
        <div className="mw-transactions-list">
          {transactions.map(tx => (
            <div key={tx.id} className="mw-tx-item">
              <div className={`mw-tx-icon ${tx.type === 'topup' ? 'plus' : 'minus'}`}>
                <i className={`fas ${tx.icon}`}></i>
              </div>
              <div className="mw-tx-details">
                <h4>{tx.title}</h4>
                <p>{tx.date}</p>
              </div>
              <div className={`mw-tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                {tx.amount > 0 ? '+' : ''}{formatPrice(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Wallet
