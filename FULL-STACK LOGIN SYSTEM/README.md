# Full-Stack Login System

This project is a simple MERN-style login system built with:

- React for the frontend
- Node.js and Express for the backend
- MongoDB with Mongoose for data storage

## Project structure

- `client/` React login form UI
- `server/` Express API and MongoDB connection

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create a MongoDB database.

3. Copy `server/.env.example` to `server/.env` and update the values.

4. Start the backend:

```bash
npm run dev:server
```

5. Start the frontend in a second terminal:

```bash
npm run dev:client
```

## Default API routes

- `POST /api/auth/register`
- `POST /api/auth/login`

## Notes

- Passwords are hashed with `bcryptjs`.
- The frontend supports both account registration and login.
- On successful login, the UI shows the authenticated user information.
