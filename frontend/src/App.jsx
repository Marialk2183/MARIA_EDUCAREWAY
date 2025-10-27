import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CourseSemesters from './pages/CourseSemesters';
import SemesterSubjects from './pages/SemesterSubjects';
import SubjectLayout from './pages/SubjectLayout';
import LectureNotes from './pages/LectureNotes';
import VideoLectures from './pages/VideoLectures';
import ReferenceBooks from './pages/ReferenceBooks';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Home Route - Redirect based on auth status
const HomeRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is logged in, show landing page, otherwise redirect to login
  return user ? <LandingPage /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Home Route - Redirects to login if not authenticated */}
        <Route path="/" element={<HomeRoute />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseCode"
          element={
            <ProtectedRoute>
              <CourseSemesters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/semester/:semesterId/subjects"
          element={
            <ProtectedRoute>
              <SemesterSubjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subject/:subjectId"
          element={
            <ProtectedRoute>
              <SubjectLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subject/:subjectId/notes"
          element={
            <ProtectedRoute>
              <LectureNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subject/:subjectId/videos"
          element={
            <ProtectedRoute>
              <VideoLectures />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subject/:subjectId/books"
          element={
            <ProtectedRoute>
              <ReferenceBooks />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

