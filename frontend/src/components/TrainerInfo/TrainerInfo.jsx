import React from 'react'
import "./trainerinfo.css"
import TrainerCard from '../TrainerCard/TrainerCard'

function TrainerInfo() {
  return (
    <div className="trainer-info-container">
      <h2>My Trainer</h2>
      <div className="trainer-card">
        <TrainerCard />
      </div>
      <div className="action-buttons">
        <button className="pay-button">Make Payment</button>
      </div>
      <div className="payment-info">
        <p>Next payment due: January 15, 2024</p>
      </div>
    </div>
  )
}

export default TrainerInfo
