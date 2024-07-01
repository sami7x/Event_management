// Importing required modules
const path = require("path");
const jwt = require("jsonwebtoken");
const { readJSONFile } = require("../utils/jsonUtils");

// File path for blacklist token file
const blacklistFilePath = path.join(__dirname, "../data/blacklistToken.json");

/**
 * Validate Token
 * This middleware function validates the JWT token provided in the request header.
 * It checks if the token is present, verifies its validity, and ensures it is not blacklisted.
 */
const validateToken = (req, res, next) => {
  // Retrieve the authorization header
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "User is not authorized" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "User is not authorized" });
  }

  try {
    // Read the current blacklist
    const blacklist = readJSONFile(blacklistFilePath);
    // Check if the token is blacklisted
    const isTokenBlackListed = blacklist.some(
      (blacklistedToken) => blacklistedToken.token === token
    );

    if (isTokenBlackListed) {
      return res.status(401).json({ message: "Access denied. Token revoked" });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = decoded.user;
      // Proceed to the next middleware or route handler
      next();
    });
  } catch (err) {
    // Handle any errors
    return res.status(500).json({ message: "Error verifying token" });
  }
};

module.exports = validateToken;
