/**
 * Importing required module
 */
 import axios from "axios";
 import { getToken } from "../utils/auth";
 
 // Define the base URL for the API
 const API_URL = "http://localhost:5001/api";
 
 const apiService = {
   // Register a new user with the provided form data
   register: async (formData) => {
     const response = await axios.post(`${API_URL}/user/register`, formData);
     return response.data;
   },
   
   // Log in a user with the provided form data
   login: async (formData) => {
     const response = await axios.post(`${API_URL}/user/login`, formData);
     return response.data;
   },
   
   // Log out the current user
   logout: async () => {
     const token = getToken(); // Retrieve the token from storage
     const response = await axios.post(
       `${API_URL}/user/logout`,
       {},
       {
         headers: {
           Authorization: `Bearer ${token}`, // Include the token in the headers
         },
       }
     );
     return response.data;
   },
   
   // Add a new event with the provided form data
   addEvent: async (formData) => {
     const token = getToken(); // Retrieve the token from storage
     const response = await axios.post(`${API_URL}/event/events`, formData, {
       headers: {
         Authorization: `Bearer ${token}`, // Include the token in the headers
       },
     });
     return response.data;
   },
   
   // Update an existing event by ID with the provided form data
   updateEvent: async (id, formData) => {
     const token = getToken(); // Retrieve the token from storage
     const response = await axios.put(`${API_URL}/event/events/${id}`, formData, {
       headers: {
         Authorization: `Bearer ${token}`, // Include the token in the headers
       },
     });
     return response.data;
   },
   
   // Delete an event by ID
   deleteEvent: async (id) => {
     const token = getToken(); // Retrieve the token from storage
     const response = await axios.delete(`${API_URL}/event/events/${id}`, {
       headers: {
         Authorization: `Bearer ${token}`, // Include the token in the headers
       },
     });
     return response.data;
   },
   
   // Get all events
   getAllEvents: async () => {
     const token = getToken(); // Retrieve the token from storage
     const response = await axios.get(`${API_URL}/event/events`, {
       headers: {
         Authorization: `Bearer ${token}`, // Include the token in the headers
       },
     });
     return response.data;
   },
   
   // Get a specific event by ID
   getEventById: async (id) => {
     const token = getToken(); // Retrieve the token from storage
     const response = await axios.get(`${API_URL}/event/events/${id}`, {
       headers: {
         Authorization: `Bearer ${token}`, // Include the token in the headers
       },
     });
     return response.data;
   },
 };
 
 export default apiService;
 