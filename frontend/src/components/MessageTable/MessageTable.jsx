import React, { useState, useEffect } from "react";
import Contact from "../Contact/Contact";
import "./messagetable.css";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

function MessageTable() {
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getUserId, getToken } = useAuth();
  const userId = getUserId();
  const token = getToken();

  // UseEffect to fetch trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/v1/trainermessages/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("API Response:", response); // Check the response
        setTrainers(response.data.trainers || []);
      } catch (error) {
        console.error("Error fetching trainers: ", error);
        setTrainers([]);
      } finally {
        setLoading(false); // Stop loading once fetch is done
      }
    };

    fetchTrainers();
  }, [userId, token]);

  const handleTrainerClick = (trainer) => {
    setTrainer(trainer);
  };

  // Loading State Rendering
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="contact-container d-flex flex-column pt-4 gap-2">
        {trainers.length > 0 ? (
          trainers.map((trainer, index) => (
            <Contact
              key={trainer.trainer_id || index}
              trainerName={`${trainer.first_name || "Unknown"} ${
                trainer.last_name || "Trainer"
              }`}
              onClick={() => handleTrainerClick(trainer)} // Pass click handler
            />
          ))
        ) : (
          <p>No trainers messaged yet.</p>
        )}
      </div>
      <h1>Hello + {trainer}</h1>
    </>
  );
}

export default MessageTable;