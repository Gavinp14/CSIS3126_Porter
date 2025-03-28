import React, { useState, useEffect } from "react";
import PopupModal from "../PopupModal/PopupModal";
import "./clientcard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {ErrorDialog, SuccessDialog} from '../dialogs';

function ClientCard({ client_id, first_name, last_name, age, gender, hometown, fitness_goals}) {
  const [showModal, setShowModal] = useState(false);
  const { getUserId, getToken } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoading(true);
      try {
        const userId = getUserId();
        const token = getToken();

        if (!userId || !token) {
          throw new Error("Authentication information missing");
        }

        const response = await fetch(`http://127.0.0.1:5000/api/v1/programs/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new ErrorDialog(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPrograms(data.programs || []);
      } catch (error) {
        ErrorDialog("Error fetching programs");
        setPrograms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, [getUserId, getToken]);

  // Allow only one program to be selected at a time
  const handleProgramSelection = (programId) => {
    console.log("Selected Program ID:", programId);
    setSelectedProgram(programId);
  };

  const handleAssignPrograms = async () => {
    const token = getToken();

    // Log client_id and selectedProgram
    console.log("Assigning Program - Client ID:", client_id);
    console.log("Assigning Program - Selected Program ID:", selectedProgram);

    if (!client_id || !selectedProgram || !token) {
      ErrorDialog("Please select a program before assigning.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/assign-programs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: client_id, // Use the prop directly
          program_id: selectedProgram,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      SuccessDialog("Program assigned successfully!");
      setSelectedProgram(null); // Clear selection after assignment
    } catch (error) {
      console.error("Error assigning programs: ", error);
      ErrorDialog("Failed to assign program. Please try again.");
    }
  };

  return (
    <>
      <div className="client-card" onClick={() => setShowModal(true)}>
        <div className="client-card__info">
          <h3>
            {first_name} {last_name}
          </h3>
        </div>
        <div className="client-card__actions">
          <button className="btn btn-primary" onClick={() => navigate(`/trainer/messages`)}>
            Message
          </button>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            Assign Programs
          </button>
        </div>
      </div>

      <PopupModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-body">
          <h2>Client Details</h2>
          <div className="client-details">
            <p>
              <strong>Name:</strong> {first_name} {last_name}
            </p>
            <p>
              <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Location:</strong> {hometown}
            </p>
            <p>
              <strong>Fitness Goals:</strong> {fitness_goals}
            </p>
          </div>

          <h3>Assign Programs</h3>
          {isLoading ? (
            <p className="text-center">Loading programs...</p>
          ) : programs.length > 0 ? (
            <div className="program-dropdown">
              {programs.map((program) => (
                <label key={program.program_id} className="program-item">
                  <input
                    type="radio"
                    name="programSelection"
                    checked={selectedProgram === program.program_id}
                    onChange={() => handleProgramSelection(program.program_id)}
                  />
                  {program.program_name}
                </label>
              ))}
            </div>
          ) : (
            <p className="text-center">No programs found.</p>
          )}
          <button className="btn btn-success" onClick={handleAssignPrograms}>
            Assign Selected Program
          </button>
        </div>
      </PopupModal>
    </>
  );
}

export default ClientCard;