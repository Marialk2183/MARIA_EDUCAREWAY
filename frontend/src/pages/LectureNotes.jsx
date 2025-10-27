import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjectAPI, resourceAPI } from '../services/api';
import { FaHome, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const LectureNotes = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, resourcesRes] = await Promise.all([
          subjectAPI.getSubjectById(subjectId),
          resourceAPI.getResourcesBySubject(subjectId, 'notes'),
        ]);

        setSubject(subjectRes.data.subject);
        setResources(resourcesRes.data.resources);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId]);

  const handleDownload = async (resourceId, fileName) => {
    try {
      const response = await resourceAPI.downloadResource(resourceId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Download started!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading lecture notes...</p>
        </div>
      </div>
    );
  }

  // Group resources by unit
  const resourcesByUnit = resources.reduce((acc, resource) => {
    const unit = resource.unitNumber || 'Other';
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(resource);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 mt-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            📄 {subject?.name}
          </h1>
          <p className="text-white text-lg font-semibold">Lecture Notes</p>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {resources.length > 0 ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">📚 Available Notes by Unit</h2>
              <p className="text-gray-600 mt-2">Click any button to download the notes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.keys(resourcesByUnit)
                .sort()
                .map((unit) => (
                  <div 
                    key={unit} 
                    className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow border-2 border-blue-200"
                  >
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                      <span className="text-3xl">
                        {unit !== 'Other' ? `${unit}` : '📑'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {unit !== 'Other' ? `Unit ${unit}` : 'Additional Resources'}
                    </h2>
                    <div className="space-y-3">
                      {resourcesByUnit[unit].map((resource) => (
                        <button
                          key={resource.id}
                          onClick={() => handleDownload(resource.id, resource.fileName)}
                          className="w-full bg-white hover:bg-blue-600 hover:text-white text-blue-600 font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md border-2 border-blue-300"
                          title={`Download ${resource.title}`}
                        >
                          <FaDownload className="animate-bounce" />
                          <span className="truncate">{resource.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md mx-auto">
              <div className="text-7xl mb-6">📝</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">No Notes Available</h2>
              <p className="text-gray-600 mb-8">Lecture notes for this subject will be uploaded soon. Please check back later.</p>
              <Link 
                to="/dashboard" 
                className="inline-block bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureNotes;

