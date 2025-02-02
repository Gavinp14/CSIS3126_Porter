import React, { useState,  } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './signupComponent.css';

function SignupComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',  
    registertype: '',
  });

  //update form data with user input 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.registertype) {
      alert("Please fill in all fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      // Hash password before sending to backend
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      const response = await axios.post('http://127.0.0.1:8000/users', {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password_hash: hashedPassword,
        registertype: formData.registertype,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Account created successfully!");
        // Redirect after successful signup
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert('An error occurred during signup. Please try again.');
      }
    }
  };

  return (
    <div className="main-container d-flex flex-column justify-content-center align-items-center">
      <img
        src="/blackandwhitetrans.png"
        alt="logo"
        className="bw-logo"
      />
      <div
        className="signup-container form-group p-4 rounded shadow-lg"
        style={{ maxWidth: '500px', width: '100%', backgroundColor: '#fff' }}
      >
        <h1 className="text-center mb-4">Create Account</h1>

        <div className="row mb-1">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              Enter first name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Enter last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Create password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Register as</label>
          <div className="d-flex justify-content-around">
            <div className="form-check me-4">
              <input
                className="form-check-input"
                type="radio"
                name="registertype"
                id="client"
                value="client"
                checked={formData.registertype === 'client'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="client">
                Client
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="registertype"
                id="trainer"
                value="trainer"
                checked={formData.registertype === 'trainer'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="trainer">
                Trainer
              </label>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={handleSubmit}>Create account</button>
        </div>

        <h6 className="text-center">
          Already have an account? <a href="/">Login here</a>
        </h6>
      </div>
    </div>
  );
}

export default SignupComponent;
