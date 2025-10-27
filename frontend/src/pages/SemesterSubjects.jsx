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
    'ML': '/assets/ml.png',
    'ML101': '/assets/ml.png',
    'AI': '/assets/ai.jpg',
    'AI101': '/assets/ai.jpg',
    'PYTHON': '/assets/python.jpg',
    'PY101': '/assets/python.jpg',
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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/gr.png)' }}>
      <Navbar />

      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-blue-400 to-teal-400 text-center py-6 shadow-lg">
          <nav className="text-lg font-semibold">
            <Link to="/dashboard" className="text-black hover:underline hover:text-white transition-colors">
              🏠 Home
            </Link>
            <span className="mx-3 text-black">›</span>
            <span className="text-white">📚 Subjects</span>
          </nav>
        </div>

        {/* Title */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 drop-shadow-lg">
            Select Your Subject
          </h1>
          <p className="text-lg text-gray-700 mt-2">Click on any subject to view resources</p>
        </div>

        {/* Subject Circles */}
        <div className="flex items-center justify-center min-h-[60vh] px-4 pb-12">
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-6xl">
            {subjects.map((subject, index) => {
              const imageUrl = getSubjectImage(subject);
              return (
                <React.Fragment key={subject.id}>
                  <Link to={`/subject/${subject.id}`} className="group">
                    <div className="text-center">
                      {/* Circular Subject Icon */}
                      <div className="relative">
                        <div
                          className="w-44 h-44 rounded-full border-4 border-dotted border-black bg-white bg-cover bg-center flex items-center justify-center text-center group-hover:scale-125 group-hover:border-blue-600 transition-all duration-300 shadow-2xl group-hover:shadow-blue-500/50 cursor-pointer overflow-hidden"
                          style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                          title={subject.name}
                        >
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity px-2 text-center">
                              Click to View
                            </span>
                          </div>
                        </div>
                        
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
                      </div>
                      
                      {/* Subject Name - Always visible */}
                      <p className="mt-4 font-bold text-gray-800 text-base px-2 text-center">
                        {subject.name}
                      </p>
                      
                      {/* Subject Code - Shows on hover */}
                      <p className="mt-1 font-semibold text-blue-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {subject.code}
                      </p>
                    </div>
                  </Link>
                  {index < subjects.length - 1 && (
                    <span className="text-5xl text-gray-700 font-bold animate-pulse hidden sm:inline">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterSubjects;

