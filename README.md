# Acid-task

A full-stack web application for creating workout plans, managing exercises, and tracking completed training sessions.

## Features

### Authentication & Security

* JWT-based authentication
* Access and refresh token flow
* Automatic token refresh via RTK Query interceptors
* Protected API routes
* Password hashing
* Rate limiting to prevent API abuse

### Workout Management

* Create, update, and delete workouts
* Add exercises to workouts
* View workout details
* Mark workouts as completed
* Added pagination for workouts list

### Workout History

* Store completed workouts history
* Track workout completion dates
* View training progress

### Validation & Error Handling

* Client-side form validation using React Hook Form and Zod
* Server-side request validation
* Global error handling middleware
* Consistent API error responses

## Tech Stack

### Frontend

* React
* TypeScript
* Redux Toolkit
* RTK Query
* React Router
* React Hook Form
* Zod
* SCSS

### Backend

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT Authentication
* Express Validator
* Rate Limiter (Redis)

## Architecture

### Frontend

* Feature-based structure
* RTK Query for API communication
* RTK Query (baseQueryWithReauth) interceptors for authentication handling
* Protected routes for authorized users
* Global state management with Redux Toolkit
* Debouncer for workout list filtration

### Backend

* REST API architecture
* Middleware-based request processing
* JWT authorization
* PostgreSQL relational database
* Service layer separation
* Centralized error handling

## Getting Started

### Prerequisites

* Node.js 18+
* PostgreSQL
* Docker

## Database Setup

Start PostgreSQL and Redis via Docker:

```bash
docker-compose --env-file ./backend/.env up -d
```

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

### Backend `.env.example`

Configure:

* Database credentials
* JWT secret keys
* Refresh token secret
* Application port

### Frontend `.env.example`

Configure:

* API URL
* Application environment variables

## API Features

### Authentication

* Register user
* Login user
* Refresh access token
* Logout user

### Workouts

* Get all workouts
* Get workout by id
* Create workout
* Update workout
* Delete workout
* Complete workout

### Exercises

* Create exercise
* Attach exercise to workout

### History

* Get completed workouts history

## Future Improvements

* Workout statistics dashboard
* Exercise categories
