import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import PopupModal from '../PopupModal/PopupModal';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { ErrorDialog, SuccessDialog } from '../dialogs';
import "./trainercard.css"

function TrainerCard({ trainer_id, first_name, last_name, age, gender, years_experience, location, about_text, specialty }) {
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [message, setMessage] = useState('');

  const { getUserId, getToken } = useAuth();
  const userId = getUserId(); // Fixed variable name from userID to userId
  const token = getToken();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      ErrorDialog('Please enter a message!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/messages', {
        sender_id: userId,
        receiver_id: trainer_id,
        message_text: message
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        setMessageSent(true);
        SuccessDialog('Message Sent Successfully!');
      }
      
    } catch (error) {
      console.error('Error:', error);
      ErrorDialog(error.response?.data?.detail || 'An error occurred while sending your message. Please try again.');
    }
  };

  const resetMessageForm = () => {
    setMessage('');
    setMessageSent(false);
    setShowMessageModal(false);
  };

  return (
    <div className="trainer-card" onClick={console.log(userId)}>
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
            <Button variant="primary" className="trainer-card__message" onClick={() => setShowMessageModal(true)}>
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

      <Modal show={showMessageModal} onHide={resetMessageForm}>
        <Modal.Header closeButton>
          <Modal.Title>Message {first_name} {last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageSent ? (
            <p>Message sent successfully! {first_name} will get back to you soon.</p>
          ) : (
            <Form>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!messageSent ? (
            <>
              <Button variant="secondary" onClick={resetMessageForm}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={resetMessageForm}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TrainerCard;