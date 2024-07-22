# Task Management Application
## Overview
This project is a Task Management Application with frontend and backend components. The frontend is built using React and the backend is built using Node.js, Express, and MongoDB. It supports user authentication, task creation, and task management with different statuses.

## Table of Contents

1. [Installation](#installation)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [Dependencies](#dependencies)


## Installation
### Prerequisites
Make sure you have the following installed on your machine:

- Node.js (v20 or higher)
- MongoDB (running instance)
- npm (Node package manager)

# Frontend Setup
## 1. Create the Project
```bash
npx create-react-app 'project_file_name'
```
## 2. Install dependencies
```bash
npm install
```
## 3. Configure Environment Variables
Create a `.env` file in the `frontend` directory and add the following:
```bash
REACT_APP_BACKEND_URL=http://localhost:7000
```
## 4. Start the frontend server
```bash
npm start
```

# Backend setup

## 1. Navigate to the backend directory
```bash
cd ../backend
```
## 2. Install dependencies
```bash
npm install
```

## 3. Configure Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```bash
PORT=7000
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your_jwt_secret
```
## 4. Start the backend server
```bash
npm start
```
## Environment Variables
### Frontend
- `REACT_APP_BACKEND_URL`: The URL where the backend server is running.
### Backend
- `PORT`: The port number for the backend server (default is 7000).
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.

## Running the Application
After setting up both the frontend and backend, you can run the application:

1. Start the backend server:
```bash
cd backend
npm start
```
2. Start the frontend server:
```bash
cd frontend
npm start
```

The frontend application will be available at `http://localhost:3000` and the backend server will run at `http://localhost:7000`.

## Dependencies
### Frontend
- `react`: JavaScript library for building user interfaces.
- `react`-router-dom: Declarative routing for React.
- `axios`: Promise based HTTP client for the browser and node.js.
- `react-icons`: Include popular icons in your React projects easily.

### Backend
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose`: Elegant MongoDB object modeling for Node.js.
- `dotenv`: Module that loads environment variables from a .`env` file.
- `bcryptjs`: Library to hash passwords.
- `jsonwebtoken`: JSON Web Token implementation for Node.js.
- `cors`: Express middleware to enable CORS.
- `body-parser`: Node.js body parsing middleware.

## Dev Dependencies
- `nodemon`: Utility that will monitor for any changes in your source and automatically restart your server.
- `concurrently`: Run multiple commands concurrently.
## Additional Notes
- Ensure MongoDB is running before starting the backend server.
- For the JWT secret, use a strong, random string for production environments.
- The frontend and backend communicate via RESTful API endpoints.

# acknowledgments
- Inspired by various MERN stack tutorials and projects.

```bash

This `README.md` provides a comprehensive guide to your project, including how to set it up, run it, and understand its structure and functionalities. It also includes instructions for using an `.env` file to store your MongoDB URI and other configuration details.