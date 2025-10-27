import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseAPI, subjectAPI, resourceAPI } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const { user, dbUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload-notes');
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states for file upload
  const [uploadForm, setUploadForm] = useState({
    subjectId: '',
    title: '',
    type: 'notes',
    unitNumber: '',
    description: '',
    file: null
  });

  // Form states for video upload
  const [videoForm, setVideoForm] = useState({
    subjectId: '',
    title: '',
    url: '',
    description: ''
  });

  // Check if user is admin
  useEffect(() => {
    if (dbUser && dbUser.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/dashboard');
    }
  }, [dbUser, navigate]);

  // Fetch initial data
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses();
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    }
  };

  const fetchSemesters = async (courseCode) => {
    try {
      const response = await courseAPI.getCourseByCode(courseCode);
      setSemesters(response.data.course.semesters || []);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  const fetchSubjects = async (semesterId) => {
    try {
      const response = await subjectAPI.getSubjectsBySemester(semesterId);
      setSubjects(response.data.subjects || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setUploadForm({ ...uploadForm, file: e.target.files[0] });
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.file) {
      toast.error('Please select a file');
      return;
    }

    if (!uploadForm.subjectId) {
      toast.error('Please select a subject');
      return;
    }

    setLoading(true);

    // Determine resource type from file extension
    const getResourceType = (filename) => {
      const ext = filename.split('.').pop().toLowerCase();
      const typeMap = {
        'pdf': 'pdf',
        'ppt': 'ppt',
        'pptx': 'pptx',
        'doc': 'doc',
        'docx': 'docx',
        'jpg': 'image',
        'jpeg': 'image',
        'png': 'image'
      };
      return typeMap[ext] || 'pdf';
    };

    const resourceType = getResourceType(uploadForm.file.name);

    const formData = new FormData();
    formData.append('file', uploadForm.file);
    formData.append('subjectId', uploadForm.subjectId);
    formData.append('title', uploadForm.title);
    formData.append('type', uploadForm.type);
    formData.append('resourceType', resourceType);
    formData.append('unitNumber', uploadForm.unitNumber || '');
    formData.append('description', uploadForm.description || '');

    try {
      await resourceAPI.uploadResource(formData);
      toast.success('File uploaded successfully!');
      
      // Reset form
      setUploadForm({
        subjectId: uploadForm.subjectId, // Keep subject selected
        title: '',
        type: 'notes',
        unitNumber: '',
        description: '',
        file: null
      });
      
      // Reset file input
      document.getElementById('file-input').value = '';
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.error || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  // Handle video upload
  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (!videoForm.subjectId || !videoForm.title || !videoForm.url) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      await resourceAPI.createVideoResource(videoForm);
      toast.success('Video added successfully!');
      
      // Reset form
      setVideoForm({
        subjectId: videoForm.subjectId, // Keep subject selected
        title: '',
        url: '',
        description: ''
      });
    } catch (error) {
      console.error('Video upload error:', error);
      toast.error(error.response?.data?.error || 'Failed to add video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <Navbar />

      <div className="pt-20 pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-8 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">
              🔐 Admin Dashboard
            </h1>
            <p className="text-white text-lg">
              Manage courses, subjects, and upload resources
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="flex flex-wrap border-b border-gray-200">
              <button
                onClick={() => setActiveTab('upload-notes')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'upload-notes'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                📝 Upload Notes/PPT
              </button>
              <button
                onClick={() => setActiveTab('upload-video')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'upload-video'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                🎬 Add Video
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'stats'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                📊 Statistics
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Upload Notes Tab */}
              {activeTab === 'upload-notes' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Upload Lecture Notes / PPT</h2>
                  
                  <form onSubmit={handleFileUpload} className="space-y-6">
                    {/* Course Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Course *
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        onChange={(e) => {
                          fetchSemesters(e.target.value);
                          setSemesters([]);
                          setSubjects([]);
                        }}
                      >
                        <option value="">-- Select Course --</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.code}>
                            {course.name} ({course.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Semester Selection */}
                    {semesters.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select Semester *
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          onChange={(e) => {
                            fetchSubjects(e.target.value);
                            setSubjects([]);
                          }}
                        >
                          <option value="">-- Select Semester --</option>
                          {semesters.map((semester) => (
                            <option key={semester.id} value={semester.id}>
                              Semester {semester.semesterNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Subject Selection */}
                    {subjects.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select Subject *
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={uploadForm.subjectId}
                          onChange={(e) => setUploadForm({ ...uploadForm, subjectId: e.target.value })}
                          required
                        >
                          <option value="">-- Select Subject --</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name} ({subject.code})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* File Upload */}
                    {uploadForm.subjectId && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload File * (PDF, PPT, PPTX, DOC, DOCX)
                          </label>
                          <input
                            id="file-input"
                            type="file"
                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                          {uploadForm.file && (
                            <p className="mt-2 text-sm text-gray-600">
                              Selected: {uploadForm.file.name} ({(uploadForm.file.size / 1024).toFixed(2)} KB)
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Title *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Data Structures Unit 1 Notes"
                            value={uploadForm.title}
                            onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Resource Type *
                          </label>
                          <select
                            value={uploadForm.type}
                            onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="notes">Lecture Notes</option>
                            <option value="reference_book">Reference Book</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Unit Number (Optional)
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 1, 2, 3..."
                            value={uploadForm.unitNumber}
                            onChange={(e) => setUploadForm({ ...uploadForm, unitNumber: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            min="1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description (Optional)
                          </label>
                          <textarea
                            placeholder="Brief description of the content..."
                            value={uploadForm.description}
                            onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows="3"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? '⏳ Uploading...' : '📤 Upload File'}
                        </button>
                      </>
                    )}
                  </form>
                </div>
              )}

              {/* Upload Video Tab */}
              {activeTab === 'upload-video' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Add Video Lecture</h2>
                  
                  <form onSubmit={handleVideoUpload} className="space-y-6">
                    {/* Course Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Course *
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        onChange={(e) => {
                          fetchSemesters(e.target.value);
                          setSemesters([]);
                          setSubjects([]);
                        }}
                      >
                        <option value="">-- Select Course --</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.code}>
                            {course.name} ({course.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Semester Selection */}
                    {semesters.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select Semester *
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          onChange={(e) => {
                            fetchSubjects(e.target.value);
                            setSubjects([]);
                          }}
                        >
                          <option value="">-- Select Semester --</option>
                          {semesters.map((semester) => (
                            <option key={semester.id} value={semester.id}>
                              Semester {semester.semesterNumber}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Subject Selection */}
                    {subjects.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Select Subject *
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={videoForm.subjectId}
                          onChange={(e) => setVideoForm({ ...videoForm, subjectId: e.target.value })}
                          required
                        >
                          <option value="">-- Select Subject --</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name} ({subject.code})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Video Details */}
                    {videoForm.subjectId && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Video Title *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Data Structures Complete Course"
                            value={videoForm.title}
                            onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            YouTube URL *
                          </label>
                          <input
                            type="url"
                            placeholder="https://youtube.com/watch?v=... or https://youtube.com/playlist?list=..."
                            value={videoForm.url}
                            onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                          <p className="mt-2 text-sm text-gray-600">
                            💡 Supports both individual videos and playlists
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description (Optional)
                          </label>
                          <textarea
                            placeholder="Brief description of the video content..."
                            value={videoForm.description}
                            onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows="3"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? '⏳ Adding Video...' : '🎬 Add Video'}
                        </button>
                      </>
                    )}
                  </form>
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === 'stats' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Platform Statistics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-6 text-white">
                      <div className="text-5xl mb-2">📚</div>
                      <div className="text-3xl font-bold">{courses.length}</div>
                      <div className="text-blue-100">Total Courses</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white">
                      <div className="text-5xl mb-2">📅</div>
                      <div className="text-3xl font-bold">3</div>
                      <div className="text-purple-100">Active Semesters</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white">
                      <div className="text-5xl mb-2">🎓</div>
                      <div className="text-3xl font-bold">16</div>
                      <div className="text-green-100">Total Subjects</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      to="/dashboard"
                      className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      ← Back to Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

