import React, {useState} from 'react'
import {Settings} from 'lucide-react'
import "./trainernavbar.css"

function TrainerNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-logo" href="/dashboard">
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
              <a className="nav-link active" href="/trainer/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/trainer/programs">
                Programs
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/trainer/clients">
                My Clients
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/trainer/messages">
                Messages
              </a>
            </li>
          </ul>
        </div>
        <Settings className="settings-icon h-7 w-7 text-white" />
      </div>
    </nav>    
  );
}

export default TrainerNavbar
