import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { ErrorDialog, SuccessDialog } from '../dialogs';
import "./programcreation.css";

function ProgramCreation() {
  const {getUserId} = useAuth();
  const userId = getUserId();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.link) {
      ErrorDialog('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/programs', {
        user_id: userId,
        program_name: formData.name,
        program_description: formData.description,
        program_link: formData.link
      });

      if (response.status === 200 || response.status === 201) {
        SuccessDialog('Program Created Successfully!');
      }
      
    } catch (error) {
      console.error('Error:', error);
      ErrorDialog(error.response?.data?.detail || 'An error occurred during Creation. Please try again.');
    }
  };

  return (
    <div className="program-creation-container">
      <div className="program-creation-card">
        <h2>Program Creation</h2>
        <form className="program-creation-form pt-3">
          <div className="form-group">
            <label htmlFor="name">Program Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={500}
              rows={4}
              required
            />
            <small>{formData.description.length}/500 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="link">Program Link</label>
            <input
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" onClick={handleSubmit} className="submit-btn">Create Program</button>
        </form>
      </div>
    </div>
  );
}

export default ProgramCreation;
