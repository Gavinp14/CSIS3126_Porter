import React, { useState } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import "./clientcard.css";
import {useNavigate} from 'react-router-dom';

function ClientCard({first_name, last_name, age, gender, hometown, fitness_goals}) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="client-card" onClick={() => setShowModal(true)}>
        <div className="client-card__info">
          <h3>{first_name} {last_name}</h3>
        </div>
        <div className="client-card__actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/trainer/messages`)}
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
          <h2>{}</h2>
          <div className="client-details">
            <p><strong>Name:</strong> {first_name} {last_name}</p>
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
