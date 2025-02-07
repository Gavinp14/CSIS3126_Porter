import React, { useState } from 'react';
import axios from 'axios';
import './signupComponent.css';
import {ErrorDialog, SuccessDialog} from '../dialogs';
import { useNavigate } from 'react-router-dom';


function SignupComponent() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',  
    registertype: '',
  });

  //navigation function
  const navigate = useNavigate();


  //update form data with user input 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.registertype) {
      ErrorDialog('Please fill in all fields!');
      return;
    }


    if (formData.password !== formData.confirmPassword) {
      ErrorDialog("Passwords don't match!");
      return;
    }


    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
      ErrorDialog('Please enter a valid email address!');
      return;
    }


    try {

      const response = await axios.post('http://127.0.0.1:5000/api/v1/register', {
        email: formData.email,
        password_hash: formData.password,
        registertype: formData.registertype,
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/');
        SuccessDialog('Account created successfully!');
      }
      
    } catch (error) {
      console.error('Error:', error);
      ErrorDialog(error.response?.data?.detail || 'An error occurred during signup. Please try again.');
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
          {/* Removed first name input */}
          {/* Removed last name input */}
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
          Already have an account? <a className="login-here-text" onClick={() => navigate('/')}>Login here</a>
        </h6>
      </div>
    </div>
  );
}

export default SignupComponent;
