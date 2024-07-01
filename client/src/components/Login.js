/**
 * Importing required modules
 */
 import React, { useState } from "react";
 import { useNavigate, Link } from "react-router-dom"; 
 import apiService from "../services/apiService"; 
 import { setToken } from "../utils/auth"; 
 import "../styles/Login.css"; 
 
 // Login component for user authentication
 const Login = () => {
   const navigate = useNavigate(); // Initialize navigate hook for programmatic navigation
   const [formData, setFormData] = useState({
     email: "",
     password: "",
   }); // State to manage form data
 
   const [errors, setErrors] = useState({}); // State to manage form validation errors
 
   // Function to validate form data
   const validate = () => {
     let errors = {};
 
     if (!formData.email) {
       errors.email = "Email is required"; // Check if email is provided
     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
       errors.email = "Email is invalid"; // Check if email format is valid
     }
 
     if (!formData.password) {
       errors.password = "Password is required"; // Check if password is provided
     } else if (formData.password.length < 6) {
       errors.password = "Password must be at least 6 characters long"; // Check if password length is sufficient
     }
 
     return errors; // Return validation errors
   };
 
   // Function to handle form input changes
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prevData) => ({
       ...prevData,
       [name]: value, // Update form data state with new values
     }));
   };
 
   // Function to handle form submission
   const handleSubmit = async (e) => {
     e.preventDefault();
     const validationErrors = validate(); // Validate form data
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors); // Set errors state if validation fails
     } else {
       try {
         const { accessToken } = await apiService.login(formData); // Call API to log in
         setToken(accessToken); // Set token in local storage or context
         navigate("/events"); // Navigate to events page on successful login
       } catch (error) {
         console.error("Error logging in:", error); // Log any errors that occur during login
         setErrors({ server: "Login failed. Please try again." }); // Set server error message
       }
     }
   };
 
   return (
     <div className="login-container">
       <h2>Login</h2>
       <form onSubmit={handleSubmit}>
         <div className="form-group">
           <label>Email</label>
           <input
             type="email"
             name="email"
             placeholder="Enter email"
             value={formData.email}
             onChange={handleChange}
             required
           />
           {errors.email && <p className="error">{errors.email}</p>} 
         </div>
         <div className="form-group">
           <label>Password</label>
           <input
             type="password"
             name="password"
             placeholder="Password"
             value={formData.password}
             onChange={handleChange}
             required
           />
           {errors.password && <p className="error">{errors.password}</p>}
         </div>
         {errors.server && <p className="error">{errors.server}</p>}
         <button type="submit">Sign in</button>
       </form>
       <p>
         Don't have an account? <Link to="/register">Sign Up</Link> 
       </p>
     </div>
   );
 };
 
 export default Login;
 