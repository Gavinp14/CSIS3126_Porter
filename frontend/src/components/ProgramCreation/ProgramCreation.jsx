import React, { useState } from 'react'
import "./programcreation.css"

function ProgramCreation() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
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
            <label htmlFor="image">Program Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">Program File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-btn">Create Program</button>
        </form>
      </div>
    </div>
  )
}

export default ProgramCreation
