
# Hotel Room Booking System

A full-stack hotel room booking application built with React, Node.js, Express, and MongoDB.

## Features

- View available hotel rooms
- Select check-in and check-out dates
- Create room bookings
- Calculate number of nights
- Calculate total booking price
- Prevent overlapping bookings
- Cancel bookings
- Update bookings
- MongoDB transaction support
- Error handling and validation

## Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## API

### Rooms

- `GET /api/rooms`
- `GET /api/rooms/:id`
- `POST /api/rooms`
- `PUT /api/rooms/:id`
- `DELETE /api/rooms/:id`

### Bookings

- `GET /api/bookings`
- `GET /api/bookings/:id`
- `POST /api/bookings`
- `PUT /api/bookings/:id`
- `PUT /api/bookings/:id/cancel`
- `DELETE /api/bookings/:id`

## Concurrency Protection

The booking service checks for overlapping confirmed bookings and uses MongoDB sessions and transactions to keep the booking operation consistent.

If a room is already booked for the requested dates, the API returns:

`409 Conflict`

with:

```json
{
  "success": false,
  "message": "Room is already booked for these dates"
}