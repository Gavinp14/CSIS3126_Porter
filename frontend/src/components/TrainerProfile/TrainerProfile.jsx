import React, { useState } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import { ErrorDialog, SuccessDialog } from '../dialogs';
import axios from 'axios';
import "./trainerprofile.css";

function TrainerProfile({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: 30,
    gender: '',
    years_experience: 0,
    location: '',
    about_text: '',
    specialty: ''
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

    if (!formData.first_name || !formData.last_name || !formData.age || !formData.gender || !formData.years_experience || !formData.location || !formData.about_text || !formData.specialty) {
      ErrorDialog('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/trainers', {
        first_name: formData.first_name,
        last_name: formData.last_name,  
        age: formData.age, 
        gender: formData.gender,
        years_experience: formData.years_experience,
        location: formData.location,
        about_text: formData.about_text,
        specialty: formData.specialty
      });

      if (response.status === 200 || response.status === 201) {
        SuccessDialog('Trainer Profile Created Successfully!');
      }
      
    } catch (error) {
      console.error('Error:', error);
      ErrorDialog(error.response?.data?.detail || 'An error occurred during Submission. Please try again.');
    }
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <div className="settings-container">
        <h2>Trainer Profile</h2>
        
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="years_experience">Years of Experience:</label>
            <div className="slider-container">
              <input
                type="range"
                id="years_experience"
                name="years_experience"
                min="0"
                max="40"
                value={formData.years_experience}
                onChange={handleChange}
                className="form-range"
              />
              <span className="slider-value">{formData.years_experience}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              placeholder="City, State"
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialty">Specialty:</label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Specialty</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="weight loss">Weight Loss</option>
              <option value="bodybuilding">Bodybuilding</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="about_text">About Me:</label>
            <textarea
              id="about_text"
              name="about_text"
              value={formData.about_text}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Tell clients about your experience, philosophy and approach..."
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

export default TrainerProfile;