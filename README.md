# User Management System

A full-stack user management application with JWT authentication, role-based access control (RBAC), and a modern React frontend.

## Live Demo

- **Frontend (Vercel):** [https://purple-merit-sigma.vercel.app/](https://purple-merit-sigma.vercel.app/)
- **Backend API (Render):** [https://purple-merit-z7i3.onrender.com/](https://purple-merit-z7i3.onrender.com/)

### Test Credentials

**Regular User:**
- Email: `shailendrashukla13060@gmail.com`
- Password: `User@12345`

**Admin User:**
- Email: `admin@example.com`
- Password: `Admin@12345`

## Project Overview

This application provides a complete user management system with the following capabilities:

- **User Authentication:** Secure signup and login using JWT tokens
- **Profile Management:** Users can view and edit their profile information and change passwords
- **Admin Dashboard:** Administrators can view all users, activate/deactivate accounts
- **Role-Based Access:** Different permissions for regular users and administrators
- **Responsive Design:** Professional UI that works on desktop and mobile devices
- **Security Features:** Password hashing, JWT authentication, rate limiting, and CORS protection

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt (password hashing), Helmet (security headers), express-rate-limit
- **Validation:** express-validator
- **Testing:** Jest

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3 with custom components
- **State Management:** React Context API

### Deployment
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** MongoDB Atlas

## Setup Instructions (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/purplemerit
# JWT_SECRET=your-secret-key
# ADMIN_PASSWORD=Admin@12345
# FRONTEND_URL=http://localhost:5173

# Start the server
npm run dev

# Server will run on http://localhost:5000

# Create admin user (run in separate terminal)
npm run create-admin
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Application will run on http://localhost:5173
```

## Project Structure

```
PurpleMerit/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, validation, error handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts (create admin)
│   ├── tests/           # Jest test files
│   └── server.js        # Express app entry point
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── assets/      # Images, fonts
│   │   ├── components/  # Reusable components (Navbar)
│   │   ├── context/     # React Context (AuthContext)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── index.html
│
├── DEPLOYMENT.md        # Deployment guide
├── QUICKSTART.md        # Quick start guide
├── TESTING.md           # Testing documentation
└── README.md            # This file
```

## Environment Variables

### Backend (.env)

**Required variables for local development and production:**

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/purplemerit` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key` |
| `JWT_EXPIRE` | Token expiration time | `30d` |
| `ADMIN_PASSWORD` | Default admin password | `Admin@12345` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` or comma-separated for multiple |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `http://localhost:5000/api` or `https://purple-merit-z7i3.onrender.com/api` |

## Deployment Instructions

This application is deployed using:
- **Frontend:** Vercel (https://purple-merit-sigma.vercel.app/)
- **Backend:** Render (https://purple-merit-z7i3.onrender.com/)
- **Database:** MongoDB Atlas

### Deploy Backend to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure build settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=your-mongodb-atlas-uri`
   - `JWT_SECRET=your-secret-key`
   - `JWT_EXPIRE=30d`
   - `PORT=5000`
   - `FRONTEND_URL=https://purple-merit-sigma.vercel.app`
5. Deploy and copy your backend URL

### Deploy Frontend to Vercel

1. Import project on [Vercel](https://vercel.com)
2. Configure build settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variable:
   - `VITE_API_URL=https://purple-merit-z7i3.onrender.com/api`
4. Deploy

**Note:** The `vercel.json` file handles URL rewrites for client-side routing.

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## API Documentation

### Base URLs
- **Local:** `http://localhost:5000/api`
- **Production:** `https://purple-merit-z7i3.onrender.com/api`

### Authentication Routes (`/api/auth`)

#### POST `/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "fullName": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET `/auth/me`
Get current logged-in user details.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "fullName": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2025-12-31T..."
    }
  }
}
```

### User Routes (`/api/users`)

#### GET `/users/profile`
Get current user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active"
    }
  }
}
```

#### PUT `/users/profile`
Update user profile information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "John Updated",
  "email": "john.new@example.com"
}
```

#### PUT `/users/change-password`
Change user password.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "OldPassword@123",
  "newPassword": "NewPassword@123",
  "confirmPassword": "NewPassword@123"
}
```

#### GET `/users?page=1&limit=10` (Admin Only)
Get paginated list of all users.

**Headers:** `Authorization: Bearer <admin-token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 42,
      "limit": 10
    }
  }
}
```

#### PUT `/users/:id/activate` (Admin Only)
Activate a user account.

**Headers:** `Authorization: Bearer <admin-token>`

#### PUT `/users/:id/deactivate` (Admin Only)
Deactivate a user account.

**Headers:** `Authorization: Bearer <admin-token>`

### Example cURL Requests

```bash
# Login
curl -X POST https://purple-merit-z7i3.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@12345"}'

# Get All Users (with token)
curl https://purple-merit-z7i3.onrender.com/api/users?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run tests with coverage
npm test -- --coverage
```

## Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based authentication
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **CORS Protection:** Configurable allowed origins
- **Helmet:** Security headers
- **Input Validation:** express-validator for all inputs
- **XSS Protection:** Input sanitization
- **MongoDB Injection Prevention:** Mongoose schema validation

## Features

### User Features
- User registration with email validation
- Secure login with JWT token
- View and update profile information
- Change password with current password verification
- Responsive dashboard

### Admin Features
- View all registered users with pagination
- Activate/deactivate user accounts
- User management dashboard
- Admin-only protected routes

### Technical Features
- JWT token authentication
- Role-based access control (User/Admin)
- Protected routes on frontend and backend
- Error handling and validation
- RESTful API design
- Responsive UI design
- Production-ready deployment

## Quick Start Guide

### 5-Minute Setup

#### Step 1: Backend Setup
```bash
cd backend
npm install
npm run dev  # Starts on port 5000
```

#### Step 2: Database Configuration
- **Cloud Option:** Get connection URI from MongoDB Atlas
- **Local Option:** Use local MongoDB installation
- Update `backend/.env` with your MongoDB URI

#### Step 3: Create Admin User
```bash
cd backend
npm run create-admin
```
Default admin credentials: admin@example.com / Admin@12345

#### Step 4: Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Starts on port 5173
```

### Testing the Application

1. Open http://localhost:5173 in your browser
2. Sign up a new user account
3. Login and test user features (profile, dashboard)
4. Login as admin to test admin features (user management)

### Quick Deploy

**Backend to Render:**
- Connect GitHub repository
- Set environment variables (MONGO_URI, JWT_SECRET, etc.)
- Deploy

**Frontend to Vercel:**
- Import project from GitHub
- Set VITE_API_URL environment variable
- Deploy

## Author

**Shailendra Shukla**
- Email: shailendrashukla13060@gmail.com
- GitHub: [@shailendra-iiitm](https://github.com/shailendra-iiitm)

## Acknowledgments

- Purple Merit Technologies for the project requirements
- MongoDB Atlas for database hosting
- Vercel and Render for deployment platforms

---

**Made for Purple Merit Technologies**
