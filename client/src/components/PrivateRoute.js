/**
 * Importing required modules
 */
 import React from "react";
 import { Navigate } from "react-router-dom";
 import { getToken } from "../utils/auth";
 
 // PrivateRoute component to restrict access to routes based on authentication
 const PrivateRoute = ({ children }) => {
   const token = getToken(); // Retrieve the authentication token
   return token ? children : <Navigate to="/" />; // If token exists, render children components; otherwise, redirect to home page
 };
 
 export default PrivateRoute; // Exporting the PrivateRoute component as default
 