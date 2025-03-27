import React, { useState, useEffect } from 'react';
import './clientprogramtable.css';
import ProgramCard from '../ProgramCard/ProgramCard';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function ClientProgramTable() {
  const [programs, setPrograms] = useState([]);
  const { getUserId, getToken, getUserRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientPrograms = async () => {
      setIsLoading(true);
      try {
        const clientId = getUserId();
        const token = getToken();
        const role = getUserRole();
        
        if (!clientId || !token) {
          throw new Error("Authentication information missing");
        }

        if (role !== 'client') {
          throw new Error("Only clients can view programs");
        }

        const response = await axios.get(
          `http://127.0.0.1:5000/api/v1/client_programs/${clientId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.data) {
          setPrograms(response.data);
          setError(null);
        } else {
          throw new Error("No programs found");
        }
      } catch (error) {
        console.error("Error fetching programs: ", error);
        if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          setError("Could not connect to server. Please check your internet connection.");
        } else {
          setError(error.message || "An unexpected error occurred");
        }
        setPrograms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientPrograms();
  }, [getUserId, getToken, getUserRole]);

  return (
    <div className='client-program-table d-flex flex-column'>
      <h2 className="text-center mb-4">My Programs</h2>

      {isLoading ? (
        <p className="text-center">Loading your programs...</p>
      ) : error ? (
        <div className="alert alert-danger">
          <p>{error}</p>
          <button 
            className="btn btn-outline-danger mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className='d-flex flex-column justify-content-center gap-3'>
          {programs.length > 0 ? (
            programs.map((program) => (
              <ProgramCard
                key={program.program_id}
                name={program.program_name}
                description={program.program_description}
                link={program.program_link}
                assignedDate={program.assigned_date}
                programId={program.program_id}
              />
            ))
          ) : (
            <p className="text-center">You don't have any assigned programs yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientProgramTable;