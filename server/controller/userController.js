/**
 * Importing required modules
 */
 const fs = require("fs");
 const jwt = require("jsonwebtoken");
 const { v4: uuidv4 } = require("uuid");
 const bcrypt = require("bcrypt");
 const path = require("path");
 const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
 
 /**
  *File path for user JSON file and blacklist token file
  */
 const usersFilePath = path.join(__dirname, "../data/users.json");
 const blacklistFilePath = path.join(__dirname, "../data/blacklistToken.json");
 
 /**
  * Register User
  * This function handles user registration by creating a new user and saving it to the users JSON file.
  */
 const registerUser = async (req, res) => {
   try {
     const { username, email, password } = req.body;
 
     // Check if all required fields are provided
     if (!username || !email || !password) {
       return res
         .status(400)
         .json({
           message: "All fields are mandatory: username, email, password.",
         });
     }
 
     // Read the current users from the file
     const users = readJSONFile(usersFilePath);
     // Check if the user already exists
     const userAvailable = users.find(
       (user) => user.email === email || user.username === username
     );
 
     if (userAvailable) {
       return res
         .status(400)
         .json({
           message: "User already registered with this username or email.",
         });
     }
 
     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
     console.log("Hashed password success", hashedPassword);
 
     // Create a new user object
     const newUser = {
       id: uuidv4(),
       username,
       email,
       password: hashedPassword,
     };
 
     // Add the new user to the users array
     users.push(newUser);
     // Write the updated users array back to the file
     writeJSONFile(usersFilePath, users);
 
     console.log(`User created ${JSON.stringify(newUser)}`);
 
     // Respond with the new user's ID and email
     res.status(201).json({ _id: newUser.id, email: newUser.email });
   } catch (error) {
     console.error("Error registering user:", error);
     res.status(500).json({ message: "Error registering user." });
   }
 };
 
 /**
  * Login User
  * This function handles user login by validating the credentials and generating an access token.
  */
 const loginUser = async (req, res) => {
   try {
     const { email, password } = req.body;
 
     // Check if all required fields are provided
     if (!email || !password) {
       return res
         .status(400)
         .json({ message: "All fields are mandatory: email and password." });
     }
 
     // Read the current users from the file
     const users = readJSONFile(usersFilePath);
     // Find the user by email
     const user = users.find((user) => user.email === email);
 
     if (user && user.password && typeof password === "string") {
       // Compare the provided password with the stored hashed password
       const isMatch = await bcrypt.compare(password, user.password);
       if (isMatch) {
         // Generate an access token
         const accessToken = jwt.sign(
           {
             user: {
               username: user.username,
               email: user.email,
               id: user.id,
             },
           },
           process.env.ACCESS_TOKEN_SECRET,
           { expiresIn: "60m" }
         );
         // Respond with the access token
         res.status(200).json({ accessToken });
       } else {
         return res
           .status(401)
           .json({ message: "Email or password is not correct." });
       }
     } else {
       return res
         .status(401)
         .json({ message: "Email or password is not correct." });
     }
   } catch (error) {
     console.error("Error logging in user:", error);
     res.status(500).json({ message: "Error logging in user." });
   }
 };
 
 /**
  * Logout User
  * This function handles user logout by blacklisting the provided token.
  */
 const logoutUser = async (req, res) => {
   try {
     const token = req.headers.authorization?.split(" ")[1];
 
     // Check if the token is provided
     if (!token) {
       return res.status(400).json({ message: "Token not provided." });
     }
 
     // Read the current blacklist
     const blacklist = await readJSONFile(blacklistFilePath);
     // Add the token to the blacklist
     blacklist.push({ token });
     // Write the updated blacklist back to the file
     await writeJSONFile(blacklistFilePath, blacklist);
 
     // Respond with a success message
     return res.status(200).json({ message: "Logout Successfully." });
   } catch (error) {
     console.error("Error logging out user:", error);
     return res.status(500).json({ message: "Error logging out." });
   }
 };
 
 module.exports = { registerUser, loginUser, logoutUser };
 