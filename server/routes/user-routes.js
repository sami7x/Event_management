/**
 * Importing required modules
 */
 const express = require("express");
 const {
   registerUser,
   loginUser,
   logoutUser,
 } = require("../controller/userController");
 const validateToken = require("../middleware/validateTokenHandler");
 
 const router = express.Router();
 
 /**
  * Define the routes for user registration, login, and logout
  */
 router.post("/register", registerUser);
 router.post("/login", loginUser);
 router.post("/logout", validateToken, logoutUser);
 
 module.exports = router;
 