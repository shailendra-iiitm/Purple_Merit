# User Management System

Full-stack user management with JWT authentication and role-based access control.

## Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT, bcrypt  
**Frontend:** React, Vite, React Router, Axios

## Features

- User signup/login with JWT
- Profile management (view, edit, change password)
- Admin dashboard with user management
- Activate/deactivate users (admin only)
- Pagination, validation, protected routes

## Quick Start

```bash
# Backend
cd backend && npm install
npm run dev          # Port 5000
npm run create-admin # Create admin

# Frontend
cd frontend && npm install
npm run dev          # Port 5173
```

**Admin:** admin@example.com / Admin@12345

## API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/auth/signup` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Protected |
| GET | `/users/profile` | Protected |
| PUT | `/users/profile` | Protected |
| PUT | `/users/change-password` | Protected |
| GET | `/users?page=1&limit=10` | Admin |
| PUT | `/users/:id/activate` | Admin |
| PUT | `/users/:id/deactivate` | Admin |

## Environment Variables

**Backend:**
```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret
ADMIN_PASSWORD=Admin@12345
```

**Frontend:**
```env
VITE_API_URL=http://localhost:5000/api
```

## Testing

```bash
cd backend && npm test
```

## Deployment

- Backend: Render/Railway
- Frontend: Vercel/Netlify
- Database: MongoDB Atlas

---

Purple Merit Technologies - Backend Developer Intern Assessment
