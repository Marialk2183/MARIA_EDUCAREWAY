import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseSemesters = () => {
  const { courseCode } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseAPI.getCourseByCode(courseCode);
        setCourse(response.data.course);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading Semesters...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
        <div className="bg-white p-12 rounded-2xl shadow-2xl text-center">
          <div className="text-7xl mb-6">❌</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-8">The requested course could not be found.</p>
          <Link 
            to="/dashboard" 
            className="inline-block bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const semesters = course.semesters || [];

  if (semesters.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-teal-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 pt-20">
          <div className="text-center bg-white p-12 rounded-2xl shadow-2xl">
            <div className="text-7xl mb-6">📅</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Semesters Available</h2>
            <p className="text-gray-600 mb-8">Course semesters will be added soon.</p>
            <Link 
              to="/dashboard" 
              className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url(/assets/sem.jpg)' }}>
      <Navbar />

      <div className="flex-1 pt-24 pb-12">
        <div className="bg-white bg-opacity-80 text-center py-8 mb-8">
          <h1 className="text-4xl font-bold text-blue-600 uppercase">
            {course.name} Semesters
          </h1>
        </div>

        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {course.semesters && course.semesters.length > 0 ? (
            course.semesters.map((semester) => (
              <Link
                key={semester.id}
                to={`/semester/${semester.id}/subjects`}
                className="block"
              >
                <div className="bg-gradient-to-r from-blue-500 to-green-600 rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 text-center">
                  <h4 className="text-2xl font-bold text-white">
                    Semester {semester.semesterNumber}
                  </h4>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-white text-xl">
              No semesters available for this course.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseSemesters;

