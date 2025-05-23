import React, { useState, useEffect } from 'react';
import './programtable.css';
import ProgramCard from '../ProgramCard/ProgramCard';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function ProgramTable() {
  const [programs, setPrograms] = useState([]);
  const { getUserId, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoading(true);
      try {
        const userId = getUserId();
        const token = getToken();
        
        if (!userId || !token) {
          throw new Error("Authentication information missing");
        }

        const response = await axios.get(
          `http://127.0.0.1:5000/api/v1/programs/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );

        console.log("API Response:", response.data);
        setPrograms(response.data.programs || []);
        setError(null);
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

    fetchPrograms();
  }, [getUserId, getToken]);

  return (
    <div className='program-table d-flex flex-column'>
      <h2 className="text-center mb-4">Training Programs</h2>

      {isLoading ? (
        <p className="text-center">Loading programs...</p>
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
              />
            ))
          ) : (
            <p className="text-center">No programs available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProgramTable;