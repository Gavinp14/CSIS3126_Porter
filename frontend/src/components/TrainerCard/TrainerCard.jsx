import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PopupModal from '../PopupModal/PopupModal'; // Add this import
import "./trainercard.css"

function TrainerCard() {
  const [showModal, setShowModal] = useState(false);

  const name = "John Doe";
  const specialty = "Personal Trainer";
  const description = "John is a certified personal trainer with 10 years of experience helping clients achieve their fitness goals.";
  const location = "New York, NY";
  const imageUrl = "/IMG_1204.jpg"; // Profile image URL
  const moreText = "John also specializes in post-rehabilitation training and has helped athletes recover from injuries.";


  return (
    <div className="trainer-card">
      <div className="trainer-card__image-container">
        <img 
          src={imageUrl} 
          alt={`${name}'s profile`} 
          className="trainer-card__image"
        />
      </div>
      <div className="card-body trainer-card__body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{specialty}</h6>
        <p className="card-text">{description}</p>
        <div className="trainer-card__footer">
          <p className="card-text mb-0"><strong>Location:</strong> {location}</p>
          <div className="trainer-card__actions">
            <Button variant="link" onClick={() => setShowModal(true)} className="trainer-card__read-more">
              Read More
            </Button>
            <Button variant="primary" className="trainer-card__message">
              Message
            </Button>
          </div>
        </div>
      </div>

      <PopupModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title={`About ${name}`}
      >
          <div className="trainer-modal-content">
            <div className="trainer-modal-header">
              <div className="trainer-card__image-container">
                <img 
                  src={imageUrl} 
                  alt={`${name}'s profile`} 
                  className="trainer-card__modal-image"
                />
              </div>
              <div className="trainer-info">
                <h3>{name}</h3>
                <h5 className="text-muted">{specialty}</h5>
                <p><strong>Location:</strong> {location}</p>
              </div>
            </div>
            <div className="trainer-modal-body">
              <h4>About</h4>
              <p>{description}</p>
              <h4>Additional Information</h4>
              <p>{moreText}</p>
            </div>
          </div>
      </PopupModal>
    </div>
  );
}

export default TrainerCard;