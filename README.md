# Game Recommender

A modern web application that recommends games based on your favorite genres and player type. Built with React, Node.js, and MongoDB.

## Features

- Input your favorite game genres
- Select your player type (casual, competitive, etc.)
- Get personalized game recommendations
- Save your preferences for future recommendations
- Modern, responsive UI

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   ```
4. Create a `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:3001
   ```

## Development

To run the development servers:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Building for Production

```bash
npm run build
```

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Vite
- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - Mongoose 