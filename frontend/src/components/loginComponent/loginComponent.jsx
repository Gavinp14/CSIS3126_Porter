import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessDialog, ErrorDialog } from '../dialogs';
import axios from 'axios';
import './loginComponent.css';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email,
        password,
      });

      const { message, registertype } = response.data;
      SuccessDialog('Login successful', message);

      if (registertype === 'client') {
        navigate('/client/dashboard');
      } else if (registertype === 'trainer') {
        navigate('/trainer/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      ErrorDialog('Login failed', error.response?.data?.detail || 'Invalid credentials');
    }
  };

  return (
    <div className="main-container d-flex flex-column justify-content-center align-items-center">
      <img src="/blackandwhitetrans.png" alt="logo" className="bw-logo" />
      <div className="login-container p-4 rounded shadow-lg" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#fff' }}>
        <h1 className="text-center mb-4">Login</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Enter email</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>

        <h6 className="text-center">Don't have an account? <a href="/signup">Register here</a></h6>
      </div>
    </div>
  );
}

export default LoginComponent;
