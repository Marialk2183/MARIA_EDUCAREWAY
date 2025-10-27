import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjectAPI } from '../services/api';
import Navbar from '../components/Navbar';

const SemesterSubjects = () => {
  const { semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <div className="flex flex-wrap items-center justify-center gap-8">
            {subjects.map((subject, index) => (
              <React.Fragment key={subject.id}>
                <Link to={`/subject/${subject.id}`} className="group">
                  <div className="text-center">
                    <div
                      className="w-40 h-40 rounded-full border-4 border-dotted border-black bg-cover bg-center flex items-center justify-center text-center group-hover:scale-125 group-hover:border-blue-600 transition-all duration-300 shadow-xl group-hover:shadow-2xl cursor-pointer"
                      style={{
                        backgroundImage: `url(${subject.imageUrl})`,
                        backgroundSize: 'cover',
                      }}
                      title={subject.name}
                    >
                      <span className="sr-only">{subject.name}</span>
                    </div>
                    <p className="mt-3 font-bold text-gray-800 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {subject.code}
                    </p>
                  </div>
                </Link>
                {index < subjects.length - 1 && (
                  <span className="text-5xl text-black font-bold animate-pulse">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterSubjects;

