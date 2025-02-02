import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessDialog, ErrorDialog } from '../dialogs';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import './loginComponent.css';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      const users = response.data.users;
      console.log(users);
      const user = users.find(user => user.email === email);
      if (!user) {
        ErrorDialog('Login failed', 'User not found');
        return;
      }
      if (response.status === 200) {
        const user = response.data.user;
        if (user.registertype === 'client') {
          navigate('/client/dashboard');
        } else if (user.registertype === 'trainer') {
          navigate('/trainer/dashboard');
        }
        SuccessDialog('Login successful', 'You have been logged in');
      }   
    } catch (error) {
      ErrorDialog('Login failed', 'Please check your email and password');
    }
  };



  return (
    <div className="main-container d-flex flex-column justify-content-center align-items-center">
        <img
          src="/blackandwhitetrans.png"
          alt="logo"
          className="bw-logo"
        />
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
