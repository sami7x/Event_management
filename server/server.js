/**
 * Importing required modules
 */
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

/**
 * Defines PORT number
 */
const PORT = process.env.PORT || 5000;

/**
 * Importing required routes
 */
app.use(express.json()); //routes and controller middleware
app.use(cors());
app.use("/api/user", require("./routes/user-routes"));
app.use("/api/event", require("./routes/event-routes"));


/**
 * Starts the server and listens on the specified port.
 */
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Event Management App port is running on server ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
