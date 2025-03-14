import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [registerType, setRegisterType] = useState(localStorage.getItem('registerType') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Store auth data in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('registerType', registerType);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('registerType');
    }
  }, [token, userId, registerType]);

  // Check token validity on page load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      
      try {
        // Verify token with backend
        const response = await axios.get('http://127.0.0.1:5000/api/v1/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.data.valid) {
          logout();
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        logout();
      }
    };
    
    verifyToken();
  }, []);

  const login = (authData) => {
    setToken(authData.access_token);
    
    // Extract user_id and registertype from token
    const tokenData = JSON.parse(atob(authData.access_token.split('.')[1]));
    const userData = tokenData.sub;
    
    setUserId(userData.user_id);
    setRegisterType(userData.registertype);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRegisterType(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('registerType');
  };

  const getToken = () => token;
  const getUserId = () => userId;
  const getUserRole = () => registerType;

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      login, 
      logout, 
      getToken, 
      getUserId, 
      getUserRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 