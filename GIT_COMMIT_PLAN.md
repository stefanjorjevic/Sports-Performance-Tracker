# Suggested Git Commit Plan

This project is not initialized as a Git repository yet. Start from the project
root:

```bash
git init
```

Then create these small, logical commits.

## 1. Repository Configuration

```bash
git add .gitignore
git commit -m "chore: add repository ignore rules"
```

## 2. Project Plan

```bash
git add PROJECT_PLAN.md
git commit -m "docs: add project plan and architecture"
```

## 3. Backend API

```bash
git add backend/package.json backend/package-lock.json backend/data backend/src
git commit -m "feat: add Express player API and JSON storage"
```

## 4. Backend API Tests

```bash
git add backend/scripts backend/API_TEST_EXAMPLES.md
git commit -m "test: add repeatable backend API checks"
```

## 5. React Frontend

```bash
git add frontend
git commit -m "feat: add React dashboard and API integration"
```

## 6. Project Documentation

```bash
git add README.md GIT_COMMIT_PLAN.md
git commit -m "docs: add setup guide and project review notes"
```

Each message uses a common commit type, an action verb, and one clear purpose.
