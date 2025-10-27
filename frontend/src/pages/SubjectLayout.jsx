import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjectAPI } from '../services/api';

const SubjectLayout = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await subjectAPI.getSubjectById(subjectId);
        setSubject(response.data.subject);
      } catch (error) {
        console.error('Error fetching subject:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading subject resources...</p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="text-7xl mb-6">❌</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Subject Not Found</h2>
          <p className="text-gray-600 mb-8">The requested subject could not be found.</p>
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

  const resourceTypes = [
    { 
      path: 'notes', 
      title: 'Lecture Notes', 
      icon: '📝',
      description: 'Download PPTs and PDFs',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      path: 'videos', 
      title: 'Video Lectures', 
      icon: '🎬',
      description: 'Watch recorded lectures',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      path: 'books', 
      title: 'Reference Books', 
      icon: '📚',
      description: 'Download textbooks',
      color: 'from-green-500 to-teal-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50 shadow-2xl">
        <ul className="flex justify-center space-x-12 text-white py-6">
          <li>
            <Link to="/dashboard" className="hover:text-yellow-400 transition-colors font-semibold text-lg flex items-center space-x-2">
              <span>🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition-colors font-semibold text-lg">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition-colors font-semibold text-lg">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition-colors font-semibold text-lg">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400 transition-colors font-semibold text-lg">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center pt-24 px-4">
        <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-12 max-w-6xl w-full mx-4">
          {/* Subject Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">📖</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-3">{subject.name}</h1>
            <p className="text-xl text-gray-600">{subject.description}</p>
            <div className="mt-4">
              <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-lg">
                {subject.code}
              </span>
            </div>
          </div>

          {/* Resource Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resourceTypes.map((type, index) => (
              <Link 
                key={type.path} 
                to={`/subject/${subjectId}/${type.path}`} 
                className="group"
              >
                <div className={`min-h-[400px] bg-gradient-to-br ${type.color} rounded-2xl flex flex-col items-center justify-center text-white p-8 hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer shadow-2xl border-4 border-white`}>
                  <div className="text-7xl mb-6 group-hover:animate-bounce">{type.icon}</div>
                  <h2 className="text-3xl font-bold mb-3 text-center">{type.title}</h2>
                  <p className="text-lg text-center text-white text-opacity-90">{type.description}</p>
                  <div className="mt-6 bg-white text-gray-800 px-6 py-2 rounded-full font-bold group-hover:bg-yellow-400 transition-colors">
                    View →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center mt-10">
            <Link 
              to="/dashboard" 
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectLayout;

