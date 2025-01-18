import React from 'react';
import './loginComponent.css';

function LoginComponent() {
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
          <input type="email" id="email" className="form-control" placeholder="Enter your email" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter your password" />
        </div>

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary ">Login</button>
        </div>

        <h6 className="text-center">Don't have an account? <a href="/signup">Register here</a></h6>
        
      </div>
    </div>
  );
}

export default LoginComponent;
