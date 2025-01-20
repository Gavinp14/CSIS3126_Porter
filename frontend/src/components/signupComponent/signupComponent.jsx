import React from 'react';
import './signupComponent.css';

function SignupComponent() {
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
            <label htmlFor="first-name" className="form-label">
              Enter first name
            </label>
            <input
              type="text"
              id="first-name"
              className="form-control"
              placeholder="First name"
              required
            />
          </div>
          <div className="col">
            <label htmlFor="last-name" className="form-label">
              Enter last name
            </label>
            <input
              type="text"
              id="last-name"
              className="form-control"
              placeholder="Last name"
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
            className="form-control"
            placeholder="Enter your email"
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
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="form-control"
            placeholder="Confirm your password"
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
                name="role"
                id="client"
                value="client"
              />
              <label className="form-check-label" htmlFor="client">
                Client
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="trainer"
                value="trainer"
              />
              <label className="form-check-label" htmlFor="trainer">
                Trainer
              </label>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary">Create account</button>
        </div>

        <h6 className="text-center">
          Already have an account? <a href="/">Login here</a>
        </h6>
      </div>
    </div>
  );
}

export default SignupComponent;
