import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // React-Bootstrap for modal functionality
import "./trainercard.css"

function TrainerCard() {
  const [showModal, setShowModal] = useState(false);

  const name = "John Doe";
  const specialty = "Personal Trainer";
  const description = "John is a certified personal trainer with 10 years of experience helping clients achieve their fitness goals.";
  const location = "New York, NY";
  const imageUrl = "/IMG_1204.jpg"; // Profile image URL
  const moreText = "John also specializes in post-rehabilitation training and has helped athletes recover from injuries.";

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
            <Button variant="link" onClick={handleShow} className="trainer-card__read-more">
              Read More
            </Button>
            <Button variant="primary" className="trainer-card__message">
              Message
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Read More */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}'s Full Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="trainer-card__image-container">
            <img 
              src={imageUrl} 
              alt={`${name}'s profile`} 
              className="trainer-card__modal-image"
            />
          </div>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Specialty:</strong> {specialty}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Location:</strong> {location}</p>
          <p>{moreText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TrainerCard;