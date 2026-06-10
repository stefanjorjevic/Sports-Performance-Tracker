# Sports Performance & Attendance Tracker - Project Plan

## Project Goal

Build a beginner-friendly full-stack application for a football academy. A coach
will be able to manage players, review attendance and fitness data, and read
simple rule-based performance insights.

The first version will focus on clear code and a complete data flow:

1. The React frontend sends an HTTP request.
2. The Express backend validates the request.
3. The backend reads or updates a JSON file.
4. The backend sends a JSON response.
5. The frontend updates the dashboard.

## Planned Folder Structure

```text
sport-performance-tracker/
|-- backend/
|   |-- data/
|   |   `-- players.json
|   |-- src/
|   |   |-- routes/
|   |   |   `-- players.js
|   |   |-- services/
|   |   |   |-- playerStorage.js
|   |   |   `-- insightService.js
|   |   |-- validation/
|   |   |   `-- playerValidation.js
|   |   `-- server.js
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- services/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- styles.css
|   |-- index.html
|   `-- package.json
|-- .gitignore
|-- PROJECT_PLAN.md
`-- README.md
```

The structure separates the user interface, API, stored data, validation, and
business rules. It is intentionally small so each file has one clear purpose.

## Development Steps

### Step 1 - Plan and Structure

- Define the application architecture.
- Create the backend and frontend folder skeleton.
- Keep the original static dashboard files as a temporary visual reference.

### Step 2 - Backend

- Create the Express server.
- Add JSON file storage and sample player data.
- Add player CRUD routes and the insights route.
- Add validation and basic error handling.

### Step 3 - Backend Testing

- Start the server locally.
- Test every route with example HTTP requests.
- Check successful and invalid request responses.

### Step 4 - React Frontend

- Create the Vite React application.
- Build metrics, player form, search, table, and insights components.
- Use simple React state and readable component props.

### Step 5 - API Connection

- Add a small frontend API service.
- Load players and insights from the backend.
- Connect add, edit, and delete actions.
- Show loading and error messages.

### Step 6 - UI Improvement

- Apply a modern dark dashboard design with plain CSS.
- Make the layout responsive.
- Add clear button, form, table, and status styles.

### Step 7 - Documentation

- Explain the project, technologies, setup, API, and folder structure.
- Document responsible AI assistance and manual code review.
- List realistic improvements for a future version.

### Step 8 - GitHub Preparation

- Remove temporary and unnecessary files.
- Add a suitable `.gitignore`.
- Verify the final folder structure.
- Prepare a small sequence of clear commit messages.

## Intentionally Simple Technical Choices

- JSON storage avoids database setup in the first version.
- Express routes provide a small REST API without extra frameworks.
- Rule-based insights demonstrate understandable decision logic without making
  false claims about using machine learning.
- Plain CSS keeps the visual design easy to inspect and change.
- No authentication keeps the first version focused on CRUD and API data flow.

## Important Limitations

- JSON file storage is suitable for learning and small local demos, but not for
  multiple users writing data at the same time.
- Rule-based insights are recommendations, not medical advice or real AI model
  predictions.
- Authentication, a database, tests, and deployment can be added later.
