# Sports Performance & Attendance Tracker

A beginner-friendly full-stack web application for a football academy. It helps
a coach manage players, review attendance and fitness data, and read simple
rule-based coaching recommendations.

This project was built as a portfolio project for an AI-powered full-stack
internship. The goal is to demonstrate a complete and understandable data flow,
not to present an enterprise-level system.

## Features

- View total active players, average attendance, and average fitness score.
- Add, edit, delete, and search players.
- Track player age, position, attendance, fitness, and status.
- Display Active, Injured, and Inactive status badges.
- Generate rule-based performance insights.
- Show loading, saving, deleting, validation, and server error states.
- Use a responsive dark dashboard on desktop, tablet, and mobile screens.

## Rule-Based Insights

The project does not call an external AI service or use a machine learning
model. The backend applies clear rules that can be read and explained.

Examples:

- Attendance below 60% creates a follow-up recommendation.
- Fitness below 5 creates an extra conditioning recommendation.
- Attendance above 85% and fitness above 8 creates a strong performance message.
- Injured players receive a warning to avoid high-intensity training.

This is described as "AI-style" analysis because it converts player data into
recommendations, but the logic is intentionally transparent and deterministic.

## Technologies

### Frontend

- React
- Vite
- JavaScript
- Plain CSS
- Browser Fetch API

### Backend

- Node.js
- Express
- CORS
- JSON file storage

## Application Data Flow

1. React requests players and insights from the Express API.
2. Express receives and validates the request.
3. The backend reads or updates `backend/data/players.json`.
4. Express sends a JSON response.
5. React updates the metrics, table, form, and insights.

## Folder Structure

```text
sport-performance-tracker/
|-- backend/
|   |-- data/
|   |   `-- players.json
|   |-- scripts/
|   |   `-- manualApiTest.js
|   |-- src/
|   |   |-- routes/
|   |   |   |-- insights.js
|   |   |   `-- players.js
|   |   |-- services/
|   |   |   |-- insightService.js
|   |   |   `-- playerStorage.js
|   |   |-- validation/
|   |   |   `-- playerValidation.js
|   |   `-- server.js
|   |-- API_TEST_EXAMPLES.md
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- services/
|   |   |   `-- playerApi.js
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- styles.css
|   |-- .env.example
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
|-- .gitignore
|-- GIT_COMMIT_PLAN.md
|-- PROJECT_PLAN.md
`-- README.md
```

The frontend and backend are separate so each part has a clear responsibility.
Backend routes handle HTTP requests, services contain reusable logic, and the
validation folder checks incoming player data.

## Player Data

Each player has the following fields:

```json
{
  "id": "generated-player-id",
  "name": "Milan Nikolic",
  "age": 17,
  "position": "Forward",
  "attendancePercentage": 91,
  "fitnessScore": 8.2,
  "status": "Active"
}
```

Allowed positions are `Forward`, `Midfielder`, `Defender`, and `Goalkeeper`.
Allowed statuses are `Active`, `Injured`, and `Inactive`.

## Local Setup

### Requirements

- Node.js 20 or newer
- npm

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 3. Start the Backend

From the `backend` folder:

```bash
npm run dev
```

The API runs at `http://localhost:3001`.

### 4. Start the Frontend

From the `frontend` folder:

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

Both servers must be running while using the application.

## Environment Variable

The frontend uses `http://localhost:3001/api` by default. To use another backend
URL, create `frontend/.env` based on `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:3001/api
```

Restart the Vite server after changing an environment variable.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Check whether the API is running |
| `GET` | `/api/players` | Return all players |
| `POST` | `/api/players` | Create a player |
| `PUT` | `/api/players/:id` | Update a player |
| `DELETE` | `/api/players/:id` | Delete a player |
| `GET` | `/api/insights` | Return rule-based player insights |

Successful create requests return status `201`. Successful delete requests
return status `204`. Invalid player data returns status `400`, and missing
players return status `404`.

More request examples are available in
[`backend/API_TEST_EXAMPLES.md`](backend/API_TEST_EXAMPLES.md).

## Testing and Verification

Run the backend API checks from the `backend` folder:

```bash
npm run test:api
```

The script tests:

- Health and player list routes
- Create, update, and delete operations
- Rule-based insights
- Invalid player validation
- Missing player responses
- Malformed JSON
- Unknown API routes

The script restores the original sample player file after it finishes.

Build the frontend from the `frontend` folder:

```bash
npm run build
```

## Responsible AI Assistance

OpenAI Codex was used as a development assistant during this project. It helped
with planning, code generation, debugging, test examples, CSS refinement, and
documentation.

AI-generated suggestions were not accepted as a single finished solution. The
project was developed in small steps so each part could be inspected before the
next part was added.

The following areas were manually reviewed and discussed:

- The frontend-to-backend request flow
- Express routes and HTTP status codes
- JSON file reading and writing
- Player validation rules
- Rule-based insight conditions
- React state and component props
- Add, edit, delete, search, loading, and error behavior
- Responsive CSS structure
- API test results and production build output

Using AI responsibly means being able to explain the code, verify its behavior,
identify its limitations, and continue improving it without pretending the
assistant's output was written or understood automatically.

## Current Limitations

- JSON storage is intended for learning and small demonstrations.
- Simultaneous writes from multiple users are not handled.
- There is no authentication or authorization.
- Insights are fixed rules, not machine learning predictions.
- There are no automated frontend component tests yet.
- The project has not yet been configured for production deployment.

## Possible Future Improvements

- Replace JSON storage with PostgreSQL or another SQL database.
- Add user authentication and coach accounts.
- Add teams, training sessions, and attendance history.
- Add charts for attendance and fitness trends.
- Add filters for position and status.
- Add frontend and backend automated tests.
- Add success notifications and a custom confirmation dialog.
- Improve accessibility testing and keyboard navigation.
- Deploy the frontend and backend.
- Add a real AI service only after defining a useful, safe, and testable use case.

## Learning Goals

This project demonstrates:

- Building a React interface with reusable components
- Creating a REST API with Express
- Sending data between frontend and backend
- Validating input and handling errors
- Persisting simple data in a JSON file
- Testing API behavior
- Reviewing AI-assisted code instead of using it blindly
