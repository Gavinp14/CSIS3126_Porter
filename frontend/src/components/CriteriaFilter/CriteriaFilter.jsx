import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import './criteriafilter.css'; // Import custom CSS for modern styling

function CriteriaFilter() {
  const [age, setAge] = useState([]);
  const [experience, setExperience] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState([]);
  const [distance, setDistance] = useState(0); // Distance from current location

  // Get the user's current location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude); // Here you can use the lat/lon for distance calculations
      });
    }
  }, []);

  const handleCheckboxChange = (e, filter, setter) => {
    const value = e.target.value;
    if (e.target.checked) {
      setter([...filter, value]);
    } else {
      setter(filter.filter(item => item !== value));
    }
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
            {['Male', 'Female', 'Non-Binary'].map((genderOption, index) => (
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
              {['Personal Trainer', 'Yoga Instructor', 'Nutritionist'].map((specialty, index) => (
                <Dropdown.Item key={index} eventKey={specialty}>
                  {specialty}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Location (with scrollbar for miles) */}
        <div className="criteria-group">
          <h6>Location</h6>
          <div className="location-slider">
            <input
              type="range"
              min="1"
              max="100"
              value={distance}
              onChange={e => setDistance(e.target.value)}
              className="slider"
            />
            <span className="distance-label">{distance} miles</span>
          </div>
        </div>
      </div>

      <Button variant="primary" className="apply-filters" size="sm">
        Apply Filters
      </Button>
    </div>
  );
}

export default CriteriaFilter;
