import React from 'react'
import PopupModal from '../PopupModal/PopupModal'
import './settingsmodal.css'

function SettingsModal({ isOpen, onClose }) {
  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <div className="settings-container">
        <h2>Account Settings</h2>
        
        <div className="user-info">
          <div className="info-row">
            <label>First Name:</label>
            <span>John</span> {/* Replace with actual user data */}
          </div>
          <div className="info-row">
            <label>Last Name:</label>
            <span>Doe</span> {/* Replace with actual user data */}
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>john.doe@example.com</span> {/* Replace with actual user data */}
          </div>
          <div className="info-row">
            <label>Registered as:</label>
            <span>User</span> {/* Replace with actual user role */}
          </div>
        </div>

        <div className="action-buttons">
          <button className="logout-btn" onClick={() => console.log('Logout clicked')}>
            Logout
          </button>
          <button className="delete-account-btn" onClick={() => console.log('Delete account clicked')}>
            Delete Account
          </button>
        </div>
      </div>
    </PopupModal>
  )
}

export default SettingsModal