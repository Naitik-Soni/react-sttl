import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = () => {
    return Cookies.get('accessToken') !== undefined; // Checks if the accessToken cookie is present
  };

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
