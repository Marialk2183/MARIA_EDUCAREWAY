# 🚀 Complete Setup Guide for EduCareWay

This guide will walk you through setting up the entire application from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [PostgreSQL Setup](#postgresql-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [Seeding Initial Data](#seeding-initial-data)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- A **Firebase account** - [Sign up](https://firebase.google.com/)

---

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `educareway` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

### 3. Get Firebase Config (Frontend)

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>) to add a web app
4. Register app with nickname: `educareway-web`
5. Copy the `firebaseConfig` object

### 4. Set Up Firebase Admin SDK (Backend)

1. Go to Project Settings > Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the following values:
   - `project_id`
   - `private_key`
   - `client_email`

### 5. Enable Cloud Messaging

1. Go to Project Settings > Cloud Messaging
2. Note the **Server key** and **Sender ID**
3. Generate a VAPID key for web push notifications

---

## PostgreSQL Setup

### 1. Install PostgreSQL

Follow the installation instructions for your operating system.

### 2. Create Database

Open PostgreSQL command line (psql) or use pgAdmin:

```sql
CREATE DATABASE educareway;
```

### 3. Create User (Optional)

```sql
CREATE USER educareway_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE educareway TO educareway_user;
```

---

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=educareway
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email@project.iam.gserviceaccount.com

# JWT Secret (Generate a random string)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters

# CORS Origin
CORS_ORIGIN=http://localhost:5173
```

**Important:** 
- Replace `FIREBASE_PRIVATE_KEY` with the actual key from the JSON file
- Keep the `\n` characters in the private key
- Use quotes around the private key

### 4. Test Database Connection

```bash
node -e "require('./config/database').authenticate().then(() => console.log('✅ Connected')).catch(err => console.error('❌ Error:', err))"
```

---

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd ../frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

Create a `.env` file in the `frontend` directory:

```env
# Firebase Configuration (from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key

# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

### 4. Update Service Worker

Edit `frontend/public/firebase-messaging-sw.js` and replace the Firebase config with your actual values:

```javascript
firebase.initializeApp({
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
});
```

---

## Running the Application

### Option 1: Run Everything at Once (from root directory)

```bash
npm run dev
```

This will start both backend and frontend simultaneously.

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## Seeding Initial Data

To populate the database with sample courses, subjects, and semesters:

```bash
cd backend
node scripts/seedData.js
```

This will create:
- MCA, BTECH, and BTECH-Int courses
- 3 semesters for MCA
- 6 subjects for MCA Semester 1
- 5 subjects for MCA Semester 3

---

## Testing

### 1. Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Get courses
curl http://localhost:5000/api/courses
```

### 2. Test Frontend

1. Open http://localhost:5173 in your browser
2. Click "Signup" and create an account
3. Login with your credentials
4. Navigate through the dashboard

### 3. Test File Upload (as Admin)

You'll need to set a user's role to 'admin' in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

Then use Postman or similar tool to upload files:

```
POST http://localhost:5000/api/resources/upload
Headers:
  Authorization: Bearer <firebase_token>
  Content-Type: multipart/form-data
Body:
  file: [your file]
  subjectId: [subject uuid]
  title: "Unit 1 Notes"
  type: "notes"
  resourceType: "pdf"
  unitNumber: 1
```

---

## Troubleshooting

### Database Connection Issues

**Error:** `ECONNREFUSED` or `authentication failed`

**Solution:**
1. Ensure PostgreSQL is running: `sudo service postgresql status`
2. Check your database credentials in `.env`
3. Verify the database exists: `psql -U postgres -c "\l"`

### Firebase Authentication Issues

**Error:** `Firebase: Error (auth/invalid-api-key)`

**Solution:**
1. Double-check your Firebase config in `.env`
2. Ensure the Firebase project has Email/Password enabled
3. Check that your web app is registered in Firebase Console

### CORS Errors

**Error:** `Access-Control-Allow-Origin` error

**Solution:**
1. Check that `CORS_ORIGIN` in backend `.env` matches your frontend URL
2. Restart the backend server after changing `.env`

### Firebase Admin SDK Issues

**Error:** `Credential implementation provided to initializeApp() via the "credential" property failed`

**Solution:**
1. Ensure your private key is properly formatted with `\n` characters
2. Use quotes around the entire private key in `.env`
3. Verify the client email is correct

### File Upload Issues

**Error:** `413 Payload Too Large`

**Solution:**
The default limit is 50MB. To increase it, modify `backend/routes/resource.routes.js`:

```javascript
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
});
```

### Notification Issues

**Error:** Notifications not working

**Solution:**
1. Ensure you've granted browser notification permissions
2. Check that `firebase-messaging-sw.js` is accessible at `/firebase-messaging-sw.js`
3. Verify VAPID key is set in frontend `.env`
4. Check browser console for errors

---

## Production Deployment

### Environment Variables

Set these environment variables in your production environment:

**Backend:**
- `NODE_ENV=production`
- `PORT=5000`
- Database credentials
- Firebase Admin SDK credentials
- `CORS_ORIGIN=https://yourdomain.com`

**Frontend:**
- Firebase config (same as development)
- `VITE_API_URL=https://api.yourdomain.com/api`

### Build Frontend

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

### Deploy Options

- **Frontend:** Vercel, Netlify, or any static hosting
- **Backend:** Heroku, DigitalOcean, AWS, or any Node.js hosting
- **Database:** AWS RDS, Heroku Postgres, or managed PostgreSQL service

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the README.md file
3. Contact: Maria & Umed

---

**Happy Coding! 🎓**

