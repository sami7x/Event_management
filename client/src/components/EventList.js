/**
 * Importing required modules
 */
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import "../styles/EventList.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

// EventList component to display and manage a list of events
const EventList = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [loggedOut, setLoggedOut] = useState(false); // State to manage logout
  const [filters, setFilters] = useState({
    title: "",
    startDate: "",
    endDate: "",
  }); // State to manage filter inputs
  const navigate = useNavigate(); // Initialize navigate hook

  // useEffect to fetch events when the component mounts or filters change
  useEffect(() => {
    fetchEvents(); // Fetch events based on current filters
  }, [filters]);

  // Function to fetch events from the API and apply filters
  const fetchEvents = async () => {
    try {
      const data = await apiService.getAllEvents(); // Fetch all events from the API
      const filteredEvents = applyFilters(data); // Apply the filter criteria to the fetched events
      setEvents(filteredEvents); // Update the state with the filtered events
    } catch (error) {
      console.error("Error fetching events:", error); // Log any errors that occur during the fetch
    }
  };

  // Function to apply filter criteria to the event data
  const applyFilters = (data) => {
    return data.filter((event) => {
      const { title, startDate, endDate } = filters;
      return (
        event.title.toLowerCase().includes(title.toLowerCase()) && // Check if event title matches filter
        event.startDate.includes(startDate) && // Check if event start date matches filter
        event.endDate.includes(endDate) // Check if event end date matches filter
      );
    });
  };

  // Function to handle deletion of an event
  const handleDelete = async (id) => {
    try {
      await apiService.deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id)
        },
        {
          label: 'No',
          onClick: () => { /* No action needed */ }
        }
      ]
    });
  };


  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setLoggedOut(true); // Set the loggedOut state to true to trigger navigation to login
  };

  // Function to handle changes in filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value, // Update the filter state with the new value
    }));
  };

  // Function to re-fetch events when filter criteria are updated
  const handleFilterEvents = () => {
    fetchEvents(); // Re-fetch and apply filters to the events
  };

  // Conditional rendering to redirect to the login page if the user logs out
  if (loggedOut) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <button onClick={handleLogout} className="logout">Logout</button>{" "}
      {/* Button to logout the user */}
      <Link to="/events/new">Add Event</Link>{" "}
      {/* Link to navigate to the Add Event page */}
      <div className="filter-container">
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleFilterChange} // Handle changes in the title filter input
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange} // Handle changes in the start date filter input
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange} // Handle changes in the end date filter input
          />
        </div>
        <button onClick={handleFilterEvents}>Filter</button>{" "}
        {/* Button to apply filters */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Total Participants</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Venue</th>
            <th>Capacity</th>
            <th>Category</th>
            <th>Speaker/Performer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{event.totalNumberOfParticipants}</td>
              <td>{event.startDate}</td>
              <td>{event.endDate}</td>
              <td>{event.venue}</td>
              <td>{event.capacity}</td>
              <td>{event.category}</td>
              <td>{event.speakerPerformer}</td>
              <td className="action-buttons">
                <button
                  onClick={() => confirmDelete(event.id)}
                  className="delete"
                >
                  Delete
                </button>{" "}
                {/* Button to delete the event */}
                <button
                  onClick={() => navigate(`/events/edit/${event.id}`)}
                  className="edit"
                >
                  Edit
                </button>{" "}
                {/* Button to navigate to the edit event page */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
