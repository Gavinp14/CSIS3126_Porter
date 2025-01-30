import React, { useState } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import "./clientcard.css";

function ClientCard() {
  const [showModal, setShowModal] = useState(false);
  
  // Dummy client data
  const client = {
    name: "John Smith",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    age: 28,
    gender: "Male",
    location: "New York, NY",
    fitnessGoals: "Build muscle, improve endurance, and lose 10 pounds"
  };

  return (
    <>
      <div className="client-card" onClick={() => setShowModal(true)}>
        <div className="client-card__image">
          <img src={client.profilePicture} alt={`${client.name}'s profile`} />
        </div>
        <div className="client-card__info">
          <h3>{client.name}</h3>
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
          <img 
            src={client.profilePicture} 
            alt={`${client.name}'s profile`} 
            className="modal-profile-pic"
          />
          <h2>{client.name}</h2>
          <div className="client-details">
            <p><strong>Age:</strong> {client.age}</p>
            <p><strong>Gender:</strong> {client.gender}</p>
            <p><strong>Location:</strong> {client.location}</p>
            <p><strong>Fitness Goals:</strong> {client.fitnessGoals}</p>
          </div>
        </div>
      </PopupModal>
    </>
  );
}

export default ClientCard;
