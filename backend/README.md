# Backend API

User Management System backend with Express and MongoDB.

## Setup

```bash
npm install
cp .env.example .env  # Edit with your MongoDB URI
npm run dev           # Development mode
npm run create-admin  # Create admin user
npm test             # Run tests
```

## Environment Variables

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
ADMIN_PASSWORD=Admin@12345
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

**Auth:**
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user (protected)
- `POST /api/auth/logout` - Logout (protected)

**User:**
- `GET /api/users/profile` - Get profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `PUT /api/users/change-password` - Change password (protected)

**Admin:**
- `GET /api/users?page=1&limit=10` - All users (admin)
- `PUT /api/users/:id/activate` - Activate user (admin)
- `PUT /api/users/:id/deactivate` - Deactivate user (admin)

## Example Requests

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "John@12345",
    "confirmPassword": "John@12345"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"John@12345"}'
```

**Get Profile:**
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project Structure

```
backend/
├── controllers/   # Business logic
├── models/        # Database schemas
├── routes/        # API routes
├── middleware/    # Auth, validation, errors
├── tests/         # Unit tests
└── server.js      # Entry point
```

## Deployment

1. **Render/Railway:**
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables

2. **MongoDB Atlas:**
   - Create cluster
   - Get connection string
   - Update MONGODB_URI

## Admin User

Default: admin@example.com / Admin@12345  
Create: `npm run create-admin`
