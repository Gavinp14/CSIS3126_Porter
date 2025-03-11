import React, { useState, useEffect } from 'react';
import TrainerCard from '../TrainerCard/TrainerCard';
import './trainerstable.css';

function TrainersTable({ filters }) {
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);

  // Function to fetch trainers
  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/trainers'); // Replace with your API endpoint
      const data = await response.json();
      setTrainers(data.trainers); // Update the trainers state
      setFilteredTrainers(data.trainers); // Update the filtered trainers state
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch trainers on component mount
  useEffect(() => {
    fetchTrainers();
  }, []);

  // Filter trainers based on criteria
  useEffect(() => {
    if (filters) {
      const filtered = trainers.filter(trainer => {
        // Age filter
        const ageInRange = filters.age.length === 0 || filters.age.some(range => {
          if (range === '46+') {
            return trainer.age >= 46; // Handle the "46+" case
          } else {
            const [min, max] = range.split('-').map(Number);
            return trainer.age >= min && trainer.age <= max;
          }
        });

        // Experience filter
        const experienceInRange = filters.experience.length === 0 || filters.experience.some(range => {
          if (range === '10+') {
            return trainer.years_experience >= 10; // Handle the "10+" case
          } else {
            const [min, max] = range.split('-').map(Number);
            return trainer.years_experience >= min && trainer.years_experience <= max;
          }
        });

        // Gender filter
        const genderMatch = filters.gender.length === 0 || filters.gender.includes(trainer.gender);

        // Specialty filter
        console.log(trainer.specialty);
        const specialtyMatch = !filters.specialty || trainer.specialty.toLowerCase() === filters.specialty.toLowerCase();

        // Location filter
        const locationMatch = !filters.location || trainer.location.toLowerCase().includes(filters.location.toLowerCase());

        return ageInRange && experienceInRange && genderMatch && specialtyMatch && locationMatch;
      });

      setFilteredTrainers(filtered);
    }
  }, [filters, trainers]);

  return (
    <div className="trainers-table container">
      {Array.isArray(filteredTrainers) && filteredTrainers.length > 0 ? (
        filteredTrainers.map((trainer) => (
          <TrainerCard
            key={trainer.trainer_id}
            trainer_id={trainer.trainer_id}
            first_name={trainer.first_name}
            last_name={trainer.last_name}
            age={trainer.age}
            gender={trainer.gender}
            years_experience={trainer.years_experience}
            location={trainer.location}
            about_text={trainer.about_text}
            specialty={trainer.specialty}
          />
        ))
      ) : (
        <p className="text-center mt-5">No trainers found!</p>
      )}
    </div>
  );
}

export default TrainersTable;