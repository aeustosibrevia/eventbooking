# Event Booking API (NestJS)

This project is a simple REST API built with NestJS that demonstrates basic interactions between users, events, and bookings.  
All data is stored in memory, which makes the project suitable for educational purposes, laboratory work, and learning NestJS fundamentals such as controllers, services, dependency injection, and exception handling.

## Features

The API supports the following functionality:
- Creating and retrieving users
- Creating and retrieving events
- Creating bookings that connect users with events
- Retrieving all bookings or bookings related to a specific event
- Validation of user and event existence when creating a booking

## Tech Stack

- Node.js
- NestJS
- TypeScript

No database or ORM is used. All data is stored in memory inside service classes.

## Project Structure

The application is divided into three logical domains:
- Users
- Events
- Bookings

Each domain follows the NestJS architecture:
- Controllers handle HTTP requests
- Services contain business logic and in-memory data
- Interfaces describe entity structures

## API Endpoints

### Users

Create a user  
POST /users

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Get all users  
GET /users

Get user by ID  
GET /users/:id

### Events

Create an event  
POST /events

Request body:
```json
{
  "title": "Tech Conference",
  "date": "2025-05-01",
  "location": "Kyiv"
}
```

Get all events  
GET /events

Get event by ID  
GET /events/:id

### Bookings

Create a booking  
POST /bookings

Request body:
```json
{
  "userId": 1,
  "eventId": 1
}
```

A booking can only be created if both the user and the event exist.  
If either of them does not exist, the API returns an error.

Get all bookings  
GET /bookings

Get bookings by event  
GET /bookings/event/:eventId

## Error Handling

- 404 Not Found is returned when a user or event does not exist
- 400 Bad Request is returned when attempting to create a booking with invalid references

NestJS built-in exceptions are used for error handling.

## Running the Project

Install dependencies:
```bash
npm install
```

Run the application in development mode:
```bash
npm run start:dev
```

The API will be available at:
http://localhost:3000

