import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ adminOnly = false, requiredRoles = [], children }) {
    const isAuthenticated = localStorage.getItem('token') !== null; 
    const isAdmin = localStorage.getItem('isAdmin') === '1'; 
    const userRole = Number(localStorage.getItem('role')); 

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" />;
    }

   
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children; 
}

export default ProtectedRoute;
