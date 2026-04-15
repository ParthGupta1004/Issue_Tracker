# Simple Issue Tracker (MERN)

A compact issue tracking platform for creating, searching, filtering, updating, and deleting project issues. The app uses React, Vite, Tailwind CSS, Express, MongoDB, and Mongoose.

## Features

- Dashboard counts for total, open, in-progress, and closed issues
- Create issues with title, description, priority, and assignee
- Inline editing for issue details, priority, status, and assignee
- Search issues by title
- Filter by status and priority
- Delete confirmation before removing an issue

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- A running MongoDB instance, either local MongoDB or MongoDB Atlas

## Setup

Clone the repository:

```bash
git clone https://github.com/your-username/simple-issue-tracker.git
cd simple-issue-tracker
```

Install backend dependencies:

```bash
cd server
npm install
```

Create `server/.env` from `server/.env.example`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/issue-tracker
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

Optional: create `client/.env` from `client/.env.example` if your API URL is different:

```env
VITE_API_URL=http://localhost:5001/api/issues
```

## Run Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open the frontend at `http://localhost:3000`.

## Scripts

Backend:

```bash
npm start
npm run dev
npm test
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## API Reference

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/issues` | GET | Fetch issues, with optional `search`, `status`, and `priority` query params |
| `/api/issues` | POST | Create a new issue |
| `/api/issues/:id` | PUT | Update an issue |
| `/api/issues/:id` | DELETE | Delete an issue |

## Repository Structure

```text
.
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- package.json
|   `-- server.js
`-- README.md
```
