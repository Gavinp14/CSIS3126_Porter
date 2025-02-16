import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PopupModal from '../PopupModal/PopupModal'; // Add this import
import "./trainercard.css"

function TrainerCard({first_name, last_name, age, gender, years_experience, location, about_text, specialty}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="trainer-card">
      <div className="trainer-card__image-container">
      </div>
      <div className="card-body trainer-card__body">
        <h5 className="card-title">{first_name} {last_name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{specialty}</h6>
        <p className="card-text">{about_text}</p>
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
        title={`About ${first_name} ${last_name}`}
      >
          <div className="trainer-modal-content">
            <div className="trainer-modal-header">
              <div className="trainer-info">
                <h3>{first_name} {last_name}</h3>
                <h5 className="text-muted">{specialty}</h5>
                <p><strong>Location:</strong> {location}</p>
              </div>
            </div>
            <div className="trainer-modal-body">
              <h4>About</h4>
              <p>{about_text}</p>
              <h4>Additional Information</h4>
              <p>Age: {age}</p>
              <p>Gender: {gender}</p>
              <p>Years of Experience: {years_experience}</p>
            </div>
          </div>
      </PopupModal>
    </div>
  );
}

export default TrainerCard;