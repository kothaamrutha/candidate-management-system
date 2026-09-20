# Candidate Management System

A full-stack CRUD application for managing candidate records, built with **React**, **Redux**, and **Material UI** on the frontend, and **ASP.NET Core Web API** with **Entity Framework Core** and **SQL Server** on the backend.

## Features

- Create, edit, and delete candidate records with real-time UI updates
- Form validation (required fields, email format) with inline error messages
- Success/failure notifications via Material UI Snackbar
- Responsive, card-based layout with Material UI components
- RESTful API with full CRUD endpoints (GET, POST, PUT, DELETE)
- Redux for centralized state management, connected via `react-redux`

## Tech Stack

**Frontend**
- React
- Redux / React-Redux
- Material UI (MUI)
- Axios

**Backend**
- ASP.NET Core Web API (.NET)
- Entity Framework Core
- SQL Server

## Project Structure

```
├── backend/                  # ASP.NET Core Web API
│   ├── Controllers/
│   ├── Models/
│   └── Program.cs
│
├── frontend/                  # React application
│   └── src/
│       ├── actions/
│       ├── components/
│       └── reducers/
```

## Getting Started

### Prerequisites

- Node.js (LTS)
- .NET SDK
- SQL Server (or LocalDB)

### Backend Setup

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

The API will start on `http://localhost:5077` (or the port shown in your terminal).

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will run on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/DCandidate` | Get all candidates |
| GET | `/api/DCandidate/{id}` | Get a candidate by ID |
| POST | `/api/DCandidate` | Create a new candidate |
| PUT | `/api/DCandidate/{id}` | Update an existing candidate |
| DELETE | `/api/DCandidate/{id}` | Delete a candidate |


## License

This project is open source and available for personal or educational use.