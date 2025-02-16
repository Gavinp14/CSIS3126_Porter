import React, { useState, useEffect } from 'react';
import TrainerCard from '../TrainerCard/TrainerCard';
import './trainerstable.css';

function TrainersTable() {
  const [trainers, setTrainers] = useState([]);

  // api call to fetch trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/trainers'); // Replace with your API endpoint
        const data = await response.json();
        console.log(data);  // Check what structure the data has
        setTrainers(data.trainers);  // Ensure you are setting the array of trainers
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchTrainers(); // Call the fetch function
  }, []);

  return (
    <div className="trainers-table container">
      {Array.isArray(trainers) && trainers.map((trainer) => (
        <TrainerCard
          key={trainer.trainer_id}
          first_name={trainer.first_name}
          last_name={trainer.last_name}
          age={trainer.age}
          gender={trainer.gender}
          years_experience={trainer.years_experience}
          location={trainer.location}
          about_text={trainer.about_text}
          specialty={trainer.specialty}
        />  // Pass each trainer as a prop to TrainerCard
      ))}
    </div>
  );
}

export default TrainersTable;
