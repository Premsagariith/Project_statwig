# Task Management System (MERN Stack)

A full-stack Task Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with JWT Authentication, Role-Based Access Control, Project Management, Task Management, and Dashboard Analytics.

---

# Features

## Authentication Module
- User Registration
- User Login
- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (Admin/User)

---

## Project Management
- Create Project
- Update Project
- Delete Project
- View Project Details
- List All Projects

---

## Task Management
- Create Task
- Edit Task
- Delete Task
- Update Task Status
- Filter/Search Tasks
- Assign Tasks to Users

---

## Dashboard
- Total Tasks
- Completed Tasks
- Pending Tasks
- Tasks by Priority
- Tasks by Status

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Context API

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Zod Validation

---

# Project Structure

```bash
project-root/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validations/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── assets/
│
└── README.md
```

---

# API Endpoints

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

### Get Current User

```http
GET /api/auth/me
```

---

## Project APIs

### Create Project

```http
POST /api/projects
```

### Get All Projects

```http
GET /api/projects
```

### Get Project By ID

```http
GET /api/projects/:id
```

### Update Project

```http
PUT /api/projects/:id
```

### Delete Project

```http
DELETE /api/projects/:id
```

---

## Task APIs

### Create Task

```http
POST /api/tasks
```

### Get All Tasks

```http
GET /api/tasks
```

### Get Task By ID

```http
GET /api/tasks/:id
```

### Update Task

```http
PUT /api/tasks/:id
```

### Delete Task

```http
DELETE /api/tasks/:id
```

### Dashboard Statistics

```http
GET /api/tasks/dashboard/stats
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

---

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Installation & Setup

## Clone Repository

```bash
git clone <your-github-repo-link>
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Authentication & Authorization

## Admin
- Create/Edit/Delete Projects
- Create/Edit/Delete Tasks
- Assign Tasks to Users
- View All Tasks
- Dashboard Access

## User
- View Assigned Tasks
- Update Task Status
- View Dashboard

---

# Validation & Security
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Zod Validation
- Error Handling Middleware
- Helmet Security
- CORS Configuration
- Cookie Parser
- Environment-based Configuration

---

# Architecture
- MVC Architecture
- Service Layer
- Repository Pattern
- Reusable Components
- Context API State Management

---

# Deployment
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

---

# Future Improvements
- Socket.IO Real-time Updates
- Notifications
- Pagination
- Docker Support
- Unit Testing
- CI/CD Pipeline

---

# Author

## Banoth Premsagar

Full Stack Developer (MERN Stack)
