import React, {useState} from 'react'
import PopupModal from '../PopupModal/PopupModal'
import "./trainerprofile.css"

function TrainerProfile({isOpen, onClose}) {
  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <div className="settings-container">
        <h2>Trainer Profile</h2>
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
            <span>Client</span> {/* Replace with actual user role */}
          </div>
        </div>

        <div className="action-buttons">
          <button className="submit-button btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </PopupModal>
  )
}

export default TrainerProfile
