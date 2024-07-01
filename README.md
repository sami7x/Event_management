# Event Management Application
## Overview
This is an event management application that allows users to perform CRUD operations on events. The application is built using NodeJS for the backend and ReactJS for the frontend. The event data is stored in a JSON file instead of a database. The application includes both client-side and server-side validation and allows filtering of events by title, start date, and end date. Additionally, authentication is implemented to ensure that only authenticated users can perform CRUD operations.
## Features
- Create, Read, Update, and Delete (CRUD) events.
- Store event data in a JSON file.
- Client-side and server-side validation.
- Filter events by title, start date, and end date.
- User authentication for secured access to CRUD operations.
## Requirements
- NodeJS (v14 or later)
- NPM (v6 or later)
- ReactJS (v17 or later)
## Project Setup
1. **Clone the repository:**
   `git clone git@github.com:sami7x/Event-Managment-App.git`
## Backend Setup
1. **Navigate to the backend directory:**
   cd server
2. **Install dependencies:**
   npm install
3. **Run the backend server:**
   npm start

The backend server will start at `http://localhost:5001`.

## Frontend Setup
1. **Navigate to the frontend directory:**
   cd client
2. **Install dependencies:**
   npm install
3. **Run the frontend application:**
   npm start

The frontend server will start at `http://localhost:3000`.

## API Endpoints
### Authentication
#### Register
   - URL: `http://localhost:5001/api/user/register`
   - Method: `POST`
   - Body: `{ "username": "string", "email": "string" "password": "string" }`
   - Description: Register a new user.
#### Login

   - URL: `http://localhost:5001/api/user/login`
   - Method: `POST`
   - Body: `{ "email": "string" "password": "string" }`
   - Description: Login an existing user.
#### Logout

   - URL: `http://localhost:5001/api/user/logout`
   - Method: `POST`
   - Description: LOgout an existing user and remove the token.
### Events
#### Get All Events

   - URL: `http://localhost:5001/api/event/events`
   - Method: `GET`
   - Description: Retrieve all events.
#### Get All Event By ID

   - URL: `http://localhost:5001/api/event/events/:id`
   - Method: `GET`
   - Description: Retrieve a single event by its ID.
#### Create Event

   - URL: `http://localhost:5001/api/event/events`
   - Method: `POST`
   - Body: `{ "title": "string", "description": "string", "totalParticipants": "number", "startDate": "date", "endDate": "date", "venue": "string", "capacity": "number", "category": "string", "speakerPerformer": "string" }`
   - Description: Create a new event.
#### Update Event

   - URL: `http://localhost:5001/api/event/events/:id`
   - Method: `PUT`
   - Body: `{ "title": "string", "description": "string", "totalParticipants": "number", "startDate": "date", "endDate": "date", "venue": "string", "capacity": "number", "category": "string", "speakerPerformer": "string" }`
   - Description: Update an existing event.
#### Delete Event

   - URL: `http://localhost:5001/api/event/events/:id`
   - Method: `DELETE`
   - Description: Delete an existing event.
### Filtering Events
#### Filter Events by Title

   - URL: `http://localhost:5001/api/event/events/filter?title=eventTitle`
   - Method: `POST`
   - Description: Filter events by title.
#### Filter Events by Start Date and End Date

   - URL: `http://localhost:5001/api/event/events/filter?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
   - Method: `GET`
   - Description: Filter events by start date and end date.

