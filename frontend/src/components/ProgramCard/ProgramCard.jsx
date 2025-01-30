import React, { useState } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import "./programcard.css";

function ProgramCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy data
  const programData = {
    title: "Sample Program",
    image: "/squat.jpg",
    description: "This is a sample program that demonstrates various features. It includes multiple functionalities and is perfect for learning purposes.",
    author: "John Doe",
    downloadLink: "#" // Replace with actual download link
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="program-card" onClick={handleCardClick}>
        <h3 className="program-title">{programData.title}</h3>
        <div className="program-image">
          <img src={programData.image} alt={programData.title} />
        </div>
      </div>

      <PopupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h2>{programData.title}</h2>
        <img src={programData.image} alt={programData.title} className="modal-image" />
        <p className="description">{programData.description}</p>
        <p className="author">Created by: {programData.author}</p>
        <a href={programData.downloadLink} className="download-button" download>
          Download Program
        </a>
      </PopupModal>
    </>
  );
}

export default ProgramCard;
