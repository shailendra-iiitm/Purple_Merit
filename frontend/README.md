# Frontend

React application for User Management System.

## Setup

```bash
npm install
npm run dev      # Development (port 5173)
npm run build    # Production build
npm run preview  # Preview build
```

## Environment

```env
VITE_API_URL=http://localhost:5000/api
```

For production, set to your deployed backend URL.

## Features

- Login/Signup pages
- User dashboard
- Profile management
- Admin user management with pagination
- Protected routes
- Role-based access

## Project Structure

```
src/
├── pages/        # Login, Signup, Dashboard, Profile, AdminUsers
├── components/   # Navbar
├── context/      # AuthContext
├── services/     # API calls
└── App.jsx       # Routes
```

## Deployment

**Vercel:**
- Connect GitHub repo
- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Set `VITE_API_URL`

**Netlify:**
- Connect repo or upload `dist` folder
- Set `VITE_API_URL`

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/login` | Public | Login page |
| `/signup` | Public | Signup page |
| `/dashboard` | Protected | User dashboard |
| `/profile` | Protected | Profile management |
| `/users` | Admin | User management |
