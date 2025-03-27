import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for a saved JWT in localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decoded = jwt_decode(token);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem('access_token');
          setUser(null);
        } else {
          setUser(decoded);
        }
      }
    } catch (error) {
      console.error("Error parsing auth token:", error);
      localStorage.removeItem('access_token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem('access_token', token);
      const decoded = jwt_decode(token);
      setUser(decoded);
      return true;
    } catch (error) {
      console.error("Error setting auth token:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const getToken = () => {
    return localStorage.getItem('access_token');
  };

  // Utility function to check if user is authenticated
  const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return !(decoded.exp && decoded.exp < currentTime);
    } catch (error) {
      return false;
    }
  };

  const getUserId = () => {
    if (!user) return null;
    return user.sub?.user_id || user.user_id || null;
  };

  const getUserRole= () => {
    if (!user) return null;
    return user.sub?.registertype || user.registertype || null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      isAuthenticated,
      getToken,
      getUserId,
      getUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);