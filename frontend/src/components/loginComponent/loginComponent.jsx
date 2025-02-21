import React, { useState } from 'react';
import axios from 'axios';
import { ErrorDialog, SuccessDialog } from '../dialogs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';// Update this path
import jwt_decode from 'jwt-decode';
import './loginComponent.css';

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNavigation = (registertype) => {
    switch (registertype.toLowerCase()) {
      case 'trainer':
        navigate('/trainer/dashboard');
        break;
      case 'client':
        navigate('/client/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      ErrorDialog('Please fill in all fields!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const { access_token } = response.data;
        
        // Use the AuthContext login function
        const success = login(access_token);
        
        if (success) {
          // Decode token to get registertype
          const decodedToken = jwt_decode(access_token);
          const registertype = decodedToken.sub?.registertype || 
                              (decodedToken.identity?.registertype);
          
          // Show success message
          SuccessDialog('Login successful!');
          
          // Navigate based on user type
          handleNavigation(registertype);
        } else {
          ErrorDialog('Failed to process login. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      ErrorDialog(
        error.response?.data?.message || 'An error occurred during login. Please try again.'
      );
    }
  };

  return (
    <div className="main-container d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        src="/blackandwhitetrans.png"
        alt="logo"
        className="bw-logo mb-4"
      />
      <div className="login-container p-4 rounded shadow-lg w-100" style={{ maxWidth: '500px', backgroundColor: '#fff' }}>
        <h1 className="text-center mb-4">Login</h1>
        
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Enter email</label>
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
            <label htmlFor="password" className="form-label">Enter password</label>
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

          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>

        <h6 className="text-center">Don't have an account? <a href="/signup">Register here</a></h6>
      </div>
    </div>
  );
}

export default LoginComponent;