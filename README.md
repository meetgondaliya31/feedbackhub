# FeedbackHub

FeedbackHub is a feedback collection and analytics web application designed to help teams build custom feedback forms, share them publicly, and analyze responses using a unified dashboard.

## Project Overview

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + Prisma
- **Database:** PostgreSQL via Docker Compose
- **Authentication:** JWT-based auth for admin/dashboard access
- **Public feedback:** Respondents can submit answers without logging in

## Key Features

- Custom feedback form builder
- Public feedback submission & success page
- Admin dashboard with analytics overview
- Forms management: create, edit, publish, duplicate, and delete
- Response management: search, filter, export CSV, and view individual responses
- Analytics pages for response trends, ratings, and top performing forms
- Authentication flows for login, registration, and protected dashboard access
- Real-time UI design using reusable components and client-side routing

## Repository Structure

- `backend/`
  - `src/`: Express server code, controllers, routes, middleware, and Prisma config
  - `package.json`: backend dependencies and scripts
  - `Dockerfile`: backend container definition
- `frontend/`
  - `src/`: React app, pages, components, API client, and context
  - `package.json`: frontend dependencies and scripts
  - `vite.config.js`: Vite configuration
- `docker-compose.yml`: PostgreSQL service definition and volume storage

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Express
- Prisma
- PostgreSQL
- bcryptjs
- jsonwebtoken
- cors
- dotenv

## Getting Started

### Prerequisites

- Node.js 20+ or compatible
- npm
- Docker and Docker Compose (for PostgreSQL)

### Local Setup

1. Clone the repository

```bash
git clone <repository-url>
cd feedbackhub
```

2. Start PostgreSQL with Docker Compose

```bash
docker compose up -d
```

3. Install backend dependencies

```bash
cd backend
npm install
```

4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file inside `backend/` with values similar to:

```env
PORT=5000
DATABASE_URL=postgresql://feedbackhub:feedbackhub@localhost:5432/feedbackhub
JWT_SECRET=your_jwt_secret_here
```

> If you use Docker Compose and the default service settings, the database URL above should work locally.

### Run the Backend

```bash
cd backend
npm run dev
```

### Run the Frontend

```bash
cd frontend
npm run dev
```

Open the frontend in your browser at the address shown by Vite (usually `http://localhost:5173`).

## Docker Setup

If you want to run the PostgreSQL database in Docker, use:

```bash
docker compose up -d
```

This starts a `feedbackhub-db` container and stores data in the `newvol` volume.

## Available Scripts

### Backend

- `npm start` - start the backend server
- `npm run dev` - run backend with Node watch mode
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - run Prisma migrations

### Frontend

- `npm run dev` - start the Vite development server
- `npm run build` - build the production frontend bundle
- `npm run preview` - preview the built frontend
- `npm run lint` - run the frontend lint command

## API Overview

The backend exposes the following API route groups:

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - authenticate a user
- `GET /api/auth/me` - get current signed-in user
- `GET /api/dashboard/overview` - dashboard summary metrics
- `GET /api/dashboard/recent-feedback` - latest feedback items
- `GET /api/forms` - list all feedback forms
- `GET /api/forms/:id` - get form details
- `POST /api/forms` - create a new form
- `PUT /api/forms/:id` - update a form
- `PATCH /api/forms/:id/status` - change form status (publish/unpublish)
- `GET /api/public/forms/:id` - retrieve public form data
- `POST /api/public/forms/:id/submit` - submit public feedback
- `GET /api/analytics/overview` - analytics metrics overview
- `GET /api/analytics/trends` - response trend data
- `GET /api/analytics/ratings` - ratings breakdown
- `GET /api/analytics/forms` - top forms analytics
- `GET /api/responses` - list submitted responses
- `GET /api/responses/export` - export responses as CSV

## Application Pages

- Landing page with hero, features, use cases, pricing, and CTAs
- Login and registration pages
- Public feedback form page for respondents
- Success page after form submission
- Protected dashboard with overview, forms, responses, analytics, and settings

## Notes

- The frontend uses `HashRouter` to manage route navigation.
- The backend includes a health check endpoint at `/api/health`.
- Protected pages require a valid JWT token in the `Authorization: Bearer <token>` header.

## Contribution

1. Fork the repository
2. Create a branch for your feature
3. Make your changes
4. Open a pull request

## License

This project does not include a license file. Add a license to clarify reuse terms.
