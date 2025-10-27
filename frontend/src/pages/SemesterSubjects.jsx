import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjectAPI } from '../services/api';
import Navbar from '../components/Navbar';

const SemesterSubjects = () => {
  const { semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map subject codes to local images
  const subjectImageMap = {
    // Semester 1
    'DSA': '/assets/dsa.jpg',
    'DS101': '/assets/dsa.jpg',
    'CN': '/assets/cn.jpg',
    'CN101': '/assets/cn.jpg',
    'OS': '/assets/os.jpg',
    'OS101': '/assets/os.jpg',
    'DBMS': '/assets/dbms.jpg',
    'DB101': '/assets/dbms.jpg',
    'WT': '/assets/wt.jpg',
    'WT101': '/assets/wt.jpg',
    'JAVA': '/assets/java.jpg',
    'JV101': '/assets/java.jpg',
    
    // Semester 2
    'PYTHON': '/assets/python.jpg',
    'PY101': '/assets/python.jpg',
    'SE': '/assets/sof.jpg',
    'MAD': '/assets/mobile.jpeg',
    'STATS': '/assets/prob.jpg',
    'AWD': '/assets/Advanced-Web-Development-1-500x385-1.png',
    
    // Semester 3
    'ML': '/assets/ml.png',
    'ML101': '/assets/ml.png',
    'AI': '/assets/ai.jpg',
    'AI101': '/assets/ai.jpg',
    'ASP': '/assets/asp.jpg',
    'CYBER': '/assets/cyber.jpg',
    'CLOUD': '/assets/cloud.jpg',
  };

  // Get image URL for a subject
  const getSubjectImage = (subject) => {
    // First try the database imageUrl
    if (subject.imageUrl && subject.imageUrl.startsWith('/assets/')) {
      return subject.imageUrl;
    }
    
    // Then try mapping by code
    if (subjectImageMap[subject.code]) {
      return subjectImageMap[subject.code];
    }
    
    // Try mapping by name (case insensitive)
    const subjectName = subject.name.toUpperCase();
    for (const [key, value] of Object.entries(subjectImageMap)) {
      if (subjectName.includes(key)) {
        return value;
      }
    }
    
    // Default fallback image
    return '/assets/book.png';
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await subjectAPI.getSubjectsBySemester(semesterId);
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [semesterId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading subjects...</p>
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-teal-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 pt-20">
          <div className="text-center bg-white p-12 rounded-lg shadow-2xl">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Subjects Available</h2>
            <p className="text-gray-600 mb-6">Subjects for this semester are coming soon.</p>
            <Link 
              to="/dashboard" 
              className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />

      <div className="pt-20 pb-16">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-center py-6 shadow-lg">
          <nav className="text-lg font-semibold text-white">
            <Link to="/dashboard" className="hover:text-yellow-300 transition-colors">
              🏠 Home
            </Link>
            <span className="mx-3">›</span>
            <span className="text-yellow-200">📚 Subjects</span>
          </nav>
        </div>

        {/* Title Section */}
        <div className="text-center py-12 px-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Subject
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore comprehensive study materials, video lectures, and reference books
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {subjects.map((subject, index) => {
              const imageUrl = getSubjectImage(subject);
              
              // Dynamic gradient colors for each card
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-green-500 to-teal-500',
                'from-orange-500 to-red-500',
                'from-indigo-500 to-purple-500',
                'from-yellow-500 to-orange-500',
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <Link 
                  key={subject.id} 
                  to={`/subject/${subject.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={subject.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      
                      {/* Subject Code Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                          {subject.code}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {subject.name}
                      </h3>
                      
                      {subject.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {subject.description}
                        </p>
                      )}
                      
                      {/* Action Button */}
                      <div className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:underline`}>
                        <span>Explore Resources</span>
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Bottom Accent Line */}
                    <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 px-4">
          <p className="text-gray-500 text-sm">
            💡 Click on any subject card to access notes, videos, and reference books
          </p>
        </div>
      </div>
    </div>
  );
};

export default SemesterSubjects;

