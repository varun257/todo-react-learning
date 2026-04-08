# Todo React Learning Project

A production-style **learning project** to quickly revise core React concepts with a real full-stack flow.

## What You Will Revise
- React component architecture and props flow
- React hooks: `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`
- Redux Toolkit store, slice reducers, async thunks
- React Router navigation and route params
- Material UI components and responsive layout patterns
- Flexbox-based layouts (via MUI Stack/Grid + CSS helper class)
- Node.js + Express REST API design
- Frontend-backend integration using Axios and CORS

## Architecture (Text Diagram)

```text
[React + MUI UI]
   -> uses Redux Toolkit thunks
   -> calls Axios client
   -> HTTP to Express API (CORS enabled)

[Express API]
   -> Controllers
   -> Todo Service (validation + business rules)
   -> JSON file persistence (server/src/data/todos.json)
```

## Project Structure

```text
todo-react-learning/
  client/
    public/
    src/
      api/
      app/
      components/
      features/todos/
      hooks/
      pages/
      theme/
    .env.example
    index.html
    package.json
    vite.config.js
  server/
    src/
      controllers/
      data/
      middleware/
      routes/
      services/
      app.js
      index.js
    tests/
    .env.example
    package.json
  package.json
  README.md
```

## Backend APIs
- `GET /health`
- `GET /api/todos`
- `GET /api/todos/:id`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`
- `PATCH /api/todos/:id/toggle`
- `DELETE /api/todos/completed`

## Setup

### 1) Install dependencies

```bash
cd /Users/vshivapr/Documents/oracle/todo-react-learning
npm run install:all
```

### 2) Configure environment

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

## Run Commands

### Run frontend and backend together

```bash
npm run dev
```

### Run frontend only

```bash
npm run dev:client
```

### Run backend only

```bash
npm run dev:server
```

### Build frontend

```bash
npm run build
```

### Run tests

```bash
npm run test
```

## Key Files to Learn Fast
- `client/src/App.jsx`: routing + theme toggle + `useMemo`
- `client/src/pages/DashboardPage.jsx`: `useEffect`, `useCallback`, `useRef`, dispatching thunks
- `client/src/hooks/useTodoFilters.js`: `useMemo` for derived data
- `client/src/features/todos/todosSlice.js`: reducers + async thunk lifecycle
- `server/src/routes/todoRoutes.js`: endpoint mapping
- `server/src/services/todoService.js`: validation + persistence logic

## Concept Revision Checklist

### Routing
- `BrowserRouter` in `client/src/main.jsx`
- `Routes/Route` in `client/src/App.jsx`
- Dynamic route param `/todos/:id` in `TodoDetailPage`

### Redux Toolkit
- Store setup in `client/src/app/store.js`
- Slice reducers in `client/src/features/todos/todosSlice.js`
- Async thunks for fetch/create/update/delete/toggle/clear-completed
- Status flags: `idle`, `loading`, `succeeded`, `failed`

### Hooks
- `useState`: component-level UI state (forms, dialogs, theme)
- `useEffect`: initial data fetch and cleanup on detail page
- `useCallback`: stable handlers passed to child components
- `useMemo`: derived filtered/search list and theme object
- `useRef`: autofocus input + previous visible count tracking

### Component Composition
- Container pages (`DashboardPage`, `TodoDetailPage`) + reusable UI components
- Unidirectional data flow using props and Redux state

### API Integration
- Axios abstraction in `client/src/api/todoApi.js`
- CORS configured in `server/src/app.js`
- Error handling in async thunks and server middleware

## Example API Payloads

### Create todo
```json
{
  "title": "Revise useMemo",
  "description": "Understand derived state performance",
  "completed": false
}
```

### Update todo
```json
{
  "title": "Revise useMemo deeply",
  "description": "Add notes and examples",
  "completed": true
}
```

## Notes
- This project uses JSON file storage for simplicity and learning.
- For production, move persistence to a real database and add auth.
- No hardcoded secrets are used; environment variables are supported with `.env` files.
