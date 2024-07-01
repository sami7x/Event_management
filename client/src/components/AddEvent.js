/**
 * Importing required modules
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddEvent.css"; 

const AddEvent = () => {
  const navigate = useNavigate(); // Hook for navigation
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    capacity: "",
    speakerPerformer: "",
    totalNumberOfParticipants: "",
    startDate: "",
    endDate: "",
  });

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
      await apiService.addEvent(formData);
      toast.success("New Event Added Successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error submitting event:", error);
      toast.error("Failed to add event. Please try again.");
    }
  };


  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
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
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
