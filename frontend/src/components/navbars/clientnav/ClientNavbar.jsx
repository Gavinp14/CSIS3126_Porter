import React, {useState} from 'react'
import "./clientnav.css"

function ClientNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Logo */}
        <a className="navbar-logo" href="#">
          <img src="/white_on_trans.png" alt="Logo" />
        </a>

        {/* Toggler Button */}
        <button
          className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item px-2">
              <a className="nav-link active" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#">
                Programs
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#">
                Find Trainers
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#">
                Messages
              </a>
            </li>
          </ul>

          {/* Profile Image */}
          <a href="#" className="d-flex align-items-center">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="rounded-circle border border-2 border-light"
            />
          </a>
        </div>
      </div>
    </nav>    
  );
}

export default ClientNavbar
