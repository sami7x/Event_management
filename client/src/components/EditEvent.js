/**
 * Importing required modules
 */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/EditEvent.css";

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation

  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    capacity: 0,
    speakerPerformer: "",
    totalNumberOfParticipants: 0,
    startDate: "",
    endDate: "",
  });

  // Fetch event details when the component mounts
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await apiService.getEventById(id); // Fetch event data by ID
        setFormData(event); // Set form data with the fetched event data
      } catch (error) {
        console.error("Error fetching event:", error); // Log error to console
      }
    };

    fetchEvent();
  }, [id]);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateEvent(id, formData);
      toast.success("Event has been updated successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
    }
  };

  return (
    <div className="edit-event-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Venue:</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        <label>Speaker/Performer:</label>
        <input
          type="text"
          name="speakerPerformer"
          value={formData.speakerPerformer}
          onChange={handleChange}
          required
        />

        <label>Total Number of Participants:</label>
        <input
          type="number"
          name="totalNumberOfParticipants"
          value={formData.totalNumberOfParticipants}
          onChange={handleChange}
          required
        />

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
