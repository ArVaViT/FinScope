import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as jwtDecodeModule from 'jwt-decode/build/jwt-decode.esm.js';
const jwtDecode = jwtDecodeModule.default || jwtDecodeModule;

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token.split('.').length !== 3) {
      setIsAuthorized(false);
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error('Token verification error:', error);
      localStorage.removeItem('token');
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) {
    return null;
  }
  return isAuthorized ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
