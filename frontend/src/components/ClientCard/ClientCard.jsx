import React, { useState } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import "./clientcard.css";

function ClientCard({first_name, last_name, age, gender, hometown, fitness_goals}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="client-card" onClick={() => setShowModal(true)}>
        <div className="client-card__info">
          <h3>{first_name} {last_name}</h3>
        </div>
        <div className="client-card__actions">
          <button 
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              alert('Message button clicked');
            }}
          >
            Message
          </button>
          <button 
            className="btn btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              alert('Edit Programs button clicked');
            }}
          >
            Edit Programs
          </button>
        </div>
      </div>

      <PopupModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-body">
          <h2>{first_name} {last_name}</h2>
          <div className="client-details">
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Gender:</strong> {gender}</p>
            <p><strong>Location:</strong> {hometown}</p>
            <p><strong>Fitness Goals:</strong> {fitness_goals}</p>
          </div>
        </div>
      </PopupModal>
    </>
  );
}

export default ClientCard;
