# Quick Start

## Setup (5 minutes)

### 1. Backend
```bash
cd backend
npm install
npm run dev  # Starts on port 5000
```

### 2. MongoDB
- Cloud: Get URI from MongoDB Atlas
- Update `backend/.env` with your URI

### 3. Create Admin
```bash
cd backend
npm run create-admin
```
Admin: admin@example.com / Password

### 4. Frontend
```bash
cd frontend
npm install
npm run dev  # Starts on port 5173
```

## Test

1. Open http://localhost:5173
2. Signup new user
3. Login and test features
4. Login as admin to test admin features

## Deploy

1. **Backend:** Render + MongoDB Atlas
2. **Frontend:** Vercel
3. Set environment variables in platforms
