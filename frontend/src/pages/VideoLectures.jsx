import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjectAPI, resourceAPI } from '../services/api';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

const VideoLectures = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, resourcesRes] = await Promise.all([
          subjectAPI.getSubjectById(subjectId),
          resourceAPI.getResourcesBySubject(subjectId, 'video'),
        ]);

        setSubject(subjectRes.data.subject);
        setResources(resourcesRes.data.resources);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading video lectures...</p>
        </div>
      </div>
    );
  }

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-blue-100">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-6 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">🎓 MCA Study Materials</h1>
            <div className="flex space-x-6">
              <Link to="/dashboard" className="hover:text-yellow-400 transition-colors font-semibold flex items-center space-x-2">
                <span>🏠</span>
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
            <div className="flex items-center justify-center mb-8">
              <div className="text-5xl mr-4">🎬</div>
              <div>
                <h2 className="text-4xl font-bold">{subject?.name}</h2>
                <p className="text-blue-200 text-lg mt-2">Video Lectures</p>
              </div>
            </div>

            {resources.length > 0 ? (
              <div className="space-y-10">
                {resources.map((resource, index) => (
                  <div key={resource.id} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition-all">
                    <div className="flex items-center mb-4">
                      <div className="bg-yellow-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-semibold">
                        {resource.title}
                      </h3>
                    </div>
                    {resource.description && (
                      <p className="text-blue-100 mb-4">{resource.description}</p>
                    )}
                    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={getYouTubeEmbedUrl(resource.url)}
                        title={resource.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-12">
                  <div className="text-7xl mb-6">📹</div>
                  <h3 className="text-3xl font-bold mb-4">No Video Lectures Available</h3>
                  <p className="text-blue-200 text-lg mb-8">Video lectures for this subject will be added soon. Please check back later.</p>
                  <Link 
                    to="/dashboard" 
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoLectures;

