/**
 * Importing required modules
 */
 const express = require("express");
 const {
   addEvent,
   updateEvent,
   deleteEvent,
   viewEvent,
   viewEventsByFilters,
   viewAllEvents,
 } = require("../controller/eventController");
 const validateToken = require("../middleware/validateTokenHandler");
 
 const router = express.Router();
 
 /**
  * Apply token validation to all routes
  */
 router.use(validateToken);
 
 /**
  * Define the routes for event management
  */
 // Add a new event
 router.post("/events", addEvent);
 
 // Update an event by ID
 router.put("/events/:id", updateEvent);
 
 // Delete an event by ID
 router.delete("/events/:id", deleteEvent);
 
 // View all events
 router.get("/events", viewAllEvents);
 
 // View a single event by ID
 router.get("/events/:id", viewEvent);
 
 // View events by filters
 router.post("/events/filter", viewEventsByFilters);
 
 module.exports = router;
 