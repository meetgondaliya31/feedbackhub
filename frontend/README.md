# FeedbackHub

FeedbackHub is a full-stack feedback and survey platform that lets teams create forms, collect responses, and analyze customer or employee feedback from a polished web app.

This project includes:
- a React + Vite frontend for the public landing page, auth flows, dashboard, and form management
- an Express + Prisma backend for authentication, forms, analytics, and public feedback submission

## Overview

FeedbackHub is designed for businesses, educators, and internal teams that want a simple way to:
- create feedback forms
- publish them for respondents
- collect structured responses
- review analytics and trends
- manage feedback in one dashboard

## Key Features

- Landing page with product marketing and call-to-action sections
- User registration and login
- Protected dashboard for form management
- Form creation, editing, duplication, and status updates
- Public feedback links for respondents
- Response viewing and review workflows
- Analytics overview with charts and summary stats
- Responsive UI built with React and Tailwind-inspired styling

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- Recharts
- Framer Motion
- Lucide React

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcrypt for password hashing
- CORS and dotenv support

## Project Structure

```text
feedbackhub-frontend/
  src/
    components/
    pages/
    context/
    api/

feedbackhub-backend/
  src/
    controllers/
    routes/
    middleware/
    config/
  prisma/
```

## Prerequisites

Make sure you have installed:
- Node.js 18 or newer
- npm or pnpm
- PostgreSQL database (recommended for full functionality)

## Environment Setup

### Frontend
Create a file named `.env` in the frontend directory if you want to configure the API base URL for your local environment.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Backend
Create a `.env` file in the backend directory with at least:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/feedbackhub
JWT_SECRET=your_super_secret_key
```

## Installation

### 1) Install frontend dependencies

```bash
cd feedbackhub-frontend
npm install
```

### 2) Install backend dependencies

```bash
cd ../feedbackhub-backend
npm install
```

### 3) Generate Prisma client

```bash
npm run prisma:generate
```

### 4) Run Prisma migrations

```bash
npm run prisma:migrate
```

## Running the App Locally

### Start the backend

```bash
cd feedbackhub-backend
npm run dev
```

The API should be available at:
- http://localhost:5000/api/health

### Start the frontend

```bash
cd feedbackhub-frontend
npm run dev
```

Open the frontend at:
- http://localhost:5173

## Main Routes

### Frontend
- `/` — landing page
- `/login` — sign in
- `/register` — create account
- `/feedback/:formId` — public feedback form
- `/dashboard` — protected dashboard
- `/forms` — form management
- `/responses` — response management
- `/analytics` — analytics dashboard
- `/settings` — account settings

### Backend API
- `/api/auth` — auth endpoints
- `/api/forms` — form CRUD and management
- `/api/public` — public feedback submission routes
- `/api/responses` — response retrieval and management
- `/api/analytics` — analytics data endpoints

## Development Notes

- The frontend uses a centralized Axios client in the API layer.
- The backend uses JWT-based authentication and Prisma models for users, forms, questions, responses, and answers.
- If the database is not available during development, the backend can fall back to in-memory demo data for basic testing, but PostgreSQL is recommended for a production-like setup.

## Build for Production

### Frontend

```bash
cd feedbackhub-frontend
npm run build
```

### Backend

```bash
cd feedbackhub-backend
npm start
```

## License

This project is for personal or project-based development use unless a different license is specified.
