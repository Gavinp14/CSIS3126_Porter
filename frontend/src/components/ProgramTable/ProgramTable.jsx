import React, { useState, useEffect } from 'react';
import './programtable.css';
import ProgramCard from '../ProgramCard/ProgramCard';
import { useAuth } from '../../contexts/AuthContext';

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

        const response = await fetch(`http://127.0.0.1:5000/api/v1/programs/${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setPrograms(data.programs || []);
      } catch (error) {
        console.error("Error fetching programs: ", error);
        setPrograms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, [getUserId, getToken]);

  return (
    <div className='program-table d-flex flex-column'>
      {isLoading ? (
        <p className="text-center">Loading programs...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
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
            <p className="text-center">No programs found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProgramTable;