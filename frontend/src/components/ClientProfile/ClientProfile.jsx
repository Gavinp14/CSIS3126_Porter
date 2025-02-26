import React, { useState } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import { ErrorDialog, SuccessDialog } from '../dialogs';
import axios from 'axios';
import "./clientprofile.css";

function ClientProfile({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: 30,
    gender: '',
    hometown: '',
    fitness_goals: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.age || !formData.gender || !formData.hometown || !formData.fitness_goals) {
      ErrorDialog('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/clients', {
        first_name: formData.first_name,
        last_name: formData.last_name,  
        age: formData.age, 
        gender: formData.gender,
        hometown: formData.hometown,
        fitness_goals: formData.fitness_goals
      });

      if (response.status === 200 || response.status === 201) {
        SuccessDialog('Client Profile Created Successfully!');
      }
      
    } catch (error) {
      console.error('Error:', error);
      ErrorDialog(error.response?.data?.detail || 'An error occurred during Submission. Please try again.');
    }
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <div className="settings-container">
        <h2>Client Profile</h2>
        
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <div className="slider-container">
              <input
                type="range"
                id="age"
                name="age"
                min="18"
                max="80"
                value={formData.age}
                onChange={handleChange}
                className="form-range"
              />
              <span className="slider-value">{formData.age}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hometown">Hometown:</label>
            <input
              type="text"
              id="hometown"
              name="hometown"
              value={formData.hometown}
              onChange={handleChange}
              className="form-control"
              placeholder="City, State"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fitness_goals">Fitness Goals:</label>
            <textarea
              id="fitness_goals"
              name="fitness_goals"
              value={formData.fitness_goals}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Share your fitness goals..."
            />
          </div>
        </div>

        <div className="action-buttons">
          <button className="submit-button btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </PopupModal>
  );
}

export default ClientProfile;