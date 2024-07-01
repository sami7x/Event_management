/**
 * Importing required modules
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/new"
          element={
            <PrivateRoute>
              <AddEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/edit/:id"
          element={
            <PrivateRoute>
              <EditEvent />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
