import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import './criteriafilter.css'; // Import custom CSS for modern styling

function CriteriaFilter({ onApplyFilters }) {
  const [age, setAge] = useState([]);
  const [experience, setExperience] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState(''); // Location as a string
  const [gender, setGender] = useState([]);

  const handleCheckboxChange = (e, filter, setter) => {
    const value = e.target.value;
    if (e.target.checked) {
      setter([...filter, value]);
    } else {
      setter(filter.filter(item => item !== value));
    }
  };

  const handleApplyFilters = () => {
    const filters = {
      age,
      experience,
      specialty,
      location, // Pass the typed location
      gender,
    };
    onApplyFilters(filters);
  };

  return (
    <div className="criteria-filter">
      <h3 className="filter-title">Filter Criteria</h3>
      <div className="filter-grid">
        {/* Age Checkboxes */}
        <div className="criteria-group">
          <h6>Age</h6>
          <div className="checkbox-group">
            {['18-25', '26-35', '36-45', '46+'].map((range, index) => (
              <div key={index} className="custom-checkbox">
                <input
                  type="checkbox"
                  value={range}
                  onChange={e => handleCheckboxChange(e, age, setAge)}
                  checked={age.includes(range)}
                  id={`age-${range}`}
                />
                <label htmlFor={`age-${range}`}>{range}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Checkboxes */}
        <div className="criteria-group">
          <h6>Experience</h6>
          <div className="checkbox-group">
            {['0-2', '3-5', '6-10', '10+'].map((years, index) => (
              <div key={index} className="custom-checkbox">
                <input
                  type="checkbox"
                  value={years}
                  onChange={e => handleCheckboxChange(e, experience, setExperience)}
                  checked={experience.includes(years)}
                  id={`experience-${years}`}
                />
                <label htmlFor={`experience-${years}`}>{years}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Checkboxes */}
        <div className="criteria-group">
          <h6>Gender</h6>
          <div className="checkbox-group">
            {['Male', 'Female'].map((genderOption, index) => (
              <div key={index} className="custom-checkbox">
                <input
                  type="checkbox"
                  value={genderOption}
                  onChange={e => handleCheckboxChange(e, gender, setGender)}
                  checked={gender.includes(genderOption)}
                  id={`gender-${genderOption}`}
                />
                <label htmlFor={`gender-${genderOption}`}>{genderOption}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Specialty Dropdown */}
        <div className="criteria-group">
          <h6>Specialty</h6>
          <Dropdown onSelect={setSpecialty}>
            <Dropdown.Toggle variant="light" id="dropdown-specialty" className="compact-dropdown">
              {specialty || 'Select'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">Select</Dropdown.Item>
              {['Bodybuilding', 'Weight Loss', 'Powerlifting'].map((specialty, index) => (
                <Dropdown.Item key={index} eventKey={specialty}>
                  {specialty}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Location Input (Typing Input) */}
        <div className="criteria-group">
          <h6>Location</h6>
          <div className="location-input">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <Button variant="primary" className="apply-filters" size="sm" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
}

export default CriteriaFilter;