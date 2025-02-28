import React, { useState } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import "./programcard.css";

function ProgramCard({ name, description, link }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="program-card" onClick={handleCardClick}>
        <h3 className="program-title">{name || "Untitled Program"}</h3>
      </div>

      <PopupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h2>{name || "Untitled Program"}</h2>
        <p className="description">{description || "No description available."}</p>
        {link ? (
          <a href={link} className="download-button" target="_blank" rel="noopener noreferrer">
            Access Program
          </a>
        ) : (
          <p className="no-link">No link available for this program.</p>
        )}
      </PopupModal>
    </>
  );
}

export default ProgramCard;