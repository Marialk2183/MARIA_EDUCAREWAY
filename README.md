# EduCareWay - Educational Platform

A modern educational platform built for NMIMS, providing students with access to course materials, lecture notes, video lectures, and reference books.

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Firebase** for authentication and notifications
- **Axios** for API calls
- **React Icons** for UI icons
- **React Toastify** for notifications

### Backend
- **Node.js** with Express.js
- **MySQL** with Sequelize ORM
- **Firebase Admin SDK** for authentication
- **Multer** for file uploads
- **JWT** for token management

## 📁 Project Structure

```
educareway-platform/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── firebase.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Semester.js
│   │   ├── Subject.js
│   │   ├── Resource.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── course.routes.js
│   │   ├── subject.routes.js
│   │   └── resource.routes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CourseSemesters.jsx
│   │   │   ├── SemesterSubjects.jsx
│   │   │   ├── SubjectLayout.jsx
│   │   │   ├── LectureNotes.jsx
│   │   │   ├── VideoLectures.jsx
│   │   │   └── ReferenceBooks.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── config/
│   │   │   └── firebase.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- Firebase account

### 1. Clone the repository
```bash
cd "WT PROJECT MARED"
```

### 2. Install all dependencies
```bash
npm run install-all
```

Or install separately:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE educareway CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

For detailed MySQL setup, see [MYSQL_SETUP.md](MYSQL_SETUP.md)

### 4. Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=educareway
DB_USER=root
DB_PASSWORD=your_mysql_password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# CORS Origin
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

### 5. Seed the Database

Run the seed script to populate initial data:
```bash
cd backend
node scripts/seedData.js
```

### 6. Run the Application

#### Development Mode (Both servers)
```bash
npm run dev
```

Or run separately:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📱 Features

### ✅ Implemented Features

1. **Authentication System**
   - Firebase-based signup/login
   - Email and password authentication
   - SAP ID validation
   - Protected routes

2. **Course Management**
   - MCA program with 3 semesters
   - Multiple subjects per semester
   - Course browsing and navigation

3. **Subject Resources**
   - Lecture Notes (PDF, PPT, DOCX downloads)
   - Video Lectures (YouTube embeds)
   - Reference Books with images

4. **User Interface**
   - Responsive design with Tailwind CSS
   - Image carousels
   - Interactive subject navigation with circular icons
   - Modern card-based layouts
   - Breadcrumb navigation

5. **File Storage**
   - PostgreSQL BLOB storage for PDFs, PPTs, DOCX
   - File upload/download system
   - Support for multiple file types

6. **Notifications**
   - Firebase Cloud Messaging integration
   - Toast notifications for user actions

## 🎨 Original Design Preserved

All visual elements from the original HTML project have been maintained:
- Color schemes (gradients, backgrounds)
- Layout structures
- Hover effects and animations
- Card designs
- Image styling
- Footer with social media links

## 🔐 Admin Features

Admins can:
- Upload course materials (PDFs, PPTs, DOCX)
- Create video resources with YouTube links
- Add reference books with cover images
- Manage courses, semesters, and subjects

## 📚 Database Schema

### Tables:
1. **users** - User accounts with Firebase UID
2. **courses** - Available courses (MCA, BTECH, etc.)
3. **semesters** - Semesters for each course
4. **subjects** - Subjects within semesters
5. **resources** - Notes, videos, and books (with BLOB storage)

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/fcm-token` - Update FCM token

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:code` - Get course by code

### Subjects
- `GET /api/subjects/semester/:semesterId` - Get subjects by semester
- `GET /api/subjects/:id` - Get subject with resources

### Resources
- `GET /api/resources/subject/:subjectId` - Get resources by subject
- `GET /api/resources/download/:id` - Download resource file
- `POST /api/resources/upload` - Upload resource (Admin)
- `POST /api/resources/video` - Create video resource (Admin)

## 🚧 Future Enhancements

- BTECH and BTECH-Int course implementation
- User progress tracking
- Assignment submission system
- Discussion forums
- Mobile app version

## 👥 Authors

- Maria
- Umed

## 📄 License

This project is licensed for educational purposes at NMIMS.

## 🙏 Acknowledgments

- NMIMS MPSTME for the educational resources
- All contributors and students using the platform

