import React, { useState, useEffect } from 'react';
import PopupModal from '../PopupModal/PopupModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import './settingsmodal.css';

function SettingsModal({ isOpen, onClose }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getUserId, getToken, getRegisterType } = useAuth();

  // Get fresh auth values on every render
  const userId = getUserId();
  const token = getToken();
  const registerType = getRegisterType();
  console.log(data);

  // Fetch data when modal opens or auth values change
  useEffect(() => {
    if (!isOpen || !userId || !token || !registerType) {
      setLoading(false);
      setData({});
      if (!userId && isOpen) setError('No user logged in');
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData({}); // Clear previous data

      try {
        let response;
        if (registerType === 'client') {
          response = await axios.get(`http://127.0.0.1:5000/api/v1/client/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (isMounted) setData(response.data["client info"][0] || {});
        } else if (registerType === 'trainer') {
          response = await axios.get(`http://127.0.0.1:5000/api/v1/trainer/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (isMounted) setData(response.data["trainer info"][0] || {});
        } else {
          throw new Error('Invalid user type');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.status === 401 
            ? 'Session expired. Please log in again.' 
            : 'Failed to load your settings');
          console.error('Fetch error:', err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Cleanup to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [isOpen, userId, token, registerType]);

  if (!isOpen) return null;

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <div className="settings-container">
        <h2>{registerType === 'client' ? 'Client' : 'Trainer'} Settings</h2>
        
        {loading && <div>Loading your settings...</div>}
        {error && (
          <div className="error-message">
            {error}
            {error.includes('Session expired') && (
              <button onClick={() => navigate('/login')}>Log In</button>
            )}
          </div>
        )}
        
        {!loading && !error && Object.keys(data).length > 0 && (
          <div className="user-info">
            <div className="info-row">
              <label>User Type:</label>
              <span>{registerType}</span>
            </div>
            <div className="info-row">
              <label>User ID:</label>
              <span>{userId}</span>
            </div>
            <div className="info-row">
              <label>First Name:</label>
              <span>{data.first_name || "n/a"}</span>
            </div>
            <div className="info-row">
              <label>Last Name:</label>
              <span>{data.last_name || "n/a"}</span>
            </div>
            <div className="info-row">
              <label>Email:</label>
              <span>{data.email || "n/a"}</span>
            </div>
            <div className="info-row">
              <label>Gender:</label>
              <span>{data.gender || "n/a"}</span>
            </div>
            <div className="info-row">
              <label>Location:</label>
              <span>{data.hometown || data.location || "n/a"}</span>
            </div>
            <div className="info-row">
              <label>Age:</label>
              <span>{data.age || "n/a"}</span>
            </div>

            {registerType === 'client' && (
              <div className="info-row">
                <label>Fitness Goals:</label>
                <span>{data.fitness_goals || "n/a"}</span>
              </div>
            )}

            {registerType === 'trainer' && (
              <>
                <div className="info-row">
                  <label>Years of Experience:</label>
                  <span>{data.years_experience || "n/a"}</span>
                </div>
                <div className="info-row">
                  <label>Specialty:</label>
                  <span>{data.specialty || "n/a"}</span>
                </div>
                <div className="info-row">
                  <label>About:</label>
                  <span>{data.about_text || "n/a"}</span>
                </div>
              </>
            )}
          </div>
        )}

        <div className="action-buttons">
          <button className="logout-btn" onClick={() => navigate('/')}>
            Logout
          </button>
          <button 
            className="delete-account-btn" 
            onClick={() => console.log(`Delete account requested for ${registerType} ID: ${userId}`)}
          >
            Delete Account
          </button>
        </div>
      </div>
    </PopupModal>
  );
}

export default SettingsModal;