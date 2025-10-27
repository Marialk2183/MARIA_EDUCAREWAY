import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjectAPI, resourceAPI } from '../services/api';
import { FaHome, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ReferenceBooks = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, resourcesRes] = await Promise.all([
          subjectAPI.getSubjectById(subjectId),
          resourceAPI.getResourcesBySubject(subjectId, 'reference_book'),
        ]);

        setSubject(subjectRes.data.subject);
        setResources(resourcesRes.data.resources);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load reference books');
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
          <p className="text-xl font-semibold text-gray-700">Loading reference books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div
        className="bg-cover bg-center h-32 flex items-center shadow-lg"
        style={{ backgroundImage: 'url(/assets/book.png)', backgroundSize: 'cover' }}
      >
        <Link 
          to="/dashboard" 
          className="ml-8 text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-4 rounded-full text-3xl transition-all"
          title="Back to Dashboard"
        >
          <FaHome />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg bg-black bg-opacity-50 inline-block px-8 py-3 rounded-lg">
            📚 Reference Books
          </h1>
          <p className="text-white text-lg mt-2 font-semibold drop-shadow-md">{subject?.name}</p>
        </div>
        <div className="w-24"></div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {resources.length > 0 ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">📖 Recommended Books</h2>
              <p className="text-gray-600 mt-2">Click on any book to download</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer border-2 border-blue-100 hover:border-blue-400"
                  onClick={() => handleDownload(resource.id, resource.fileName)}
                  title={`Download: ${resource.title}`}
                >
                  <div className="mb-3 relative">
                    {resource.imageUrl ? (
                      <img
                        src={resource.imageUrl}
                        alt={resource.title}
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzNCODJGNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjQ4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk5Y8L3RleHQ+PC9zdmc+';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                        <FaDownload className="text-6xl text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-tl-lg rounded-br-lg">
                      <FaDownload className="text-xl" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px]">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md mx-auto">
              <div className="text-7xl mb-6">📚</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">No Books Available</h2>
              <p className="text-gray-600 mb-8">Reference books for this subject will be uploaded soon. Please check back later.</p>
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

export default ReferenceBooks;

