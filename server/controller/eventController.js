/**
 * Importing required modules
 */
const fs = require("fs").promises;
const { json } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");

/**
 * File path for event JSON file
 */
const eventsFilePath = path.join(__dirname, "../data/events.json");

/**
 * Add event
 * This function handles adding a new event to the events JSON file.
 */
const addEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      venue,
      capacity,
      speakerPerformer,
      totalNumberOfParticipants,
      startDate,
      endDate,
    } = req.body;

    // Check if all required fields are provided
    if (
      !title ||
      !description ||
      !category ||
      !venue ||
      !capacity ||
      !speakerPerformer ||
      !totalNumberOfParticipants ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message:
          "All fields are mandatory: title, description, category, venue, capacity, speakerPerformer, totalNumberOfParticipants, startDate, endDate.",
      });
    }

    // Read the current events from the file
    const events = await readJSONFile(eventsFilePath);

    // Create a new event object
    const newEvent = {
      id: uuidv4(),
      title,
      description,
      category,
      venue,
      capacity,
      speakerPerformer,
      totalNumberOfParticipants,
      startDate,
      endDate,
    };

    // Add the new event to the events array
    events.push(newEvent);
    // Write the updated events array back to the file
    await writeJSONFile(eventsFilePath, events);

    // Respond with the new event's ID and title
    res.status(201).json({ _id: newEvent.id, title: newEvent.title });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update event
 * This function handles updating an existing event in the events JSON file.
 */
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      venue,
      capacity,
      speakerPerformer,
      totalNumberOfParticipants,
      startDate,
      endDate,
    } = req.body;

    // Check if all required fields are provided
    if (
      !title ||
      !description ||
      !category ||
      !venue ||
      !capacity ||
      !speakerPerformer ||
      !totalNumberOfParticipants ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message:
          "All fields are mandatory: title, description, category, venue, capacity, speakerPerformer, totalNumberOfParticipants, startDate, endDate.",
      });
    }

    // Read the current events from the file
    const events = await readJSONFile(eventsFilePath);
    // Find the index of the event to be updated
    const eventIndex = events.findIndex((event) => event.id === id);

    // If the event is not found, respond with a 404 status
    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Create an updated event object by merging the existing event with the new data
    const updatedEvent = {
      ...events[eventIndex],
      ...req.body,
      id,
    };

    // Replace the old event with the updated event
    events[eventIndex] = updatedEvent;
    // Write the updated events array back to the file
    await writeJSONFile(eventsFilePath, events);

    // Respond with a success message
    res.json({ message: "Event updated successfully." });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete event
 * This function handles deleting an event from the events JSON file.
 */
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Read the current events from the file
    const events = await readJSONFile(eventsFilePath);
    // Find the index(id) of the event to be deleted
    const eventIndex = events.findIndex((event) => event.id === id);

    // If the event is not found, respond with a 404 status
    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Remove the event from the array
    events.splice(eventIndex, 1);
    // Write the updated events array back to the file
    await writeJSONFile(eventsFilePath, events);

    // Respond with a success message
    res.status(200).json({ message: "Event has been deleted successfully." });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * View events
 * This function handles retrieving all events from the events JSON file.
 */
const viewAllEvents = async (req, res) => {
  try {
    // Read the current events from the file
    const events = await readJSONFile(eventsFilePath);
    // Respond with the events data
    res.status(200).json(events);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

const viewEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Read the current events from the file
    const events = await readJSONFile(eventsFilePath);
    // Find the event with the specified ID
    const event = events.find((event) => event.id === id);

    // If the event is not found, respond with a 404 status
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Respond with the event data
    res.status(200).json(event);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * View events by filters
 * This function handles retrieving events based on query parameters (title, startDate, endDate).
 */
const viewEventsByFilters = async (req, res) => {
  try {
    // Log the query parameters for debugging purposes
    console.log("Query parameters:", req.query);
    const { title, startDate, endDate } = req.query;

    // Read the current events from the file
    const events = await readJSONFile(eventsFilePath);
    console.log("Events data:", events);

    // Initialize filtered events with all events
    let filteredEvents = events;

    // Filter by title if provided
    if (title) {
      console.log("Filtering by title:", title);
      filteredEvents = filteredEvents.filter((event) =>
        event.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // Filter by startDate if provided
    if (startDate) {
      console.log("Filtering by startDate:", startDate);
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.startDate) >= new Date(startDate)
      );
    }

    // Filter by endDate if provided
    if (endDate) {
      console.log("Filtering by endDate:", endDate);
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.endDate) <= new Date(endDate)
      );
    }

    console.log("Filtered events:", filteredEvents);

    // Respond with the filtered events data
    res.status(200).json(filteredEvents);
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addEvent,
  updateEvent,
  deleteEvent,
  viewAllEvents,
  viewEvent,
  viewEventsByFilters,
};
