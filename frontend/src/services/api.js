import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  getCurrentUser: () => api.get('/auth/me'),
  updateFCMToken: (fcmToken) => api.put('/auth/fcm-token', { fcmToken }),
};

// Course API
export const courseAPI = {
  getAllCourses: () => api.get('/courses'),
  getCourseByCode: (code) => api.get(`/courses/${code}`),
  createCourse: (data) => api.post('/courses', data),
};

// Subject API
export const subjectAPI = {
  getSubjectsBySemester: (semesterId) => api.get(`/subjects/semester/${semesterId}`),
  getSubjectById: (id) => api.get(`/subjects/${id}`),
  createSubject: (data) => api.post('/subjects', data),
};

// Resource API
export const resourceAPI = {
  getResourcesBySubject: (subjectId, type) => {
    const params = type ? { type } : {};
    return api.get(`/resources/subject/${subjectId}`, { params });
  },
  downloadResource: (id) => {
    return api.get(`/resources/download/${id}`, {
      responseType: 'blob',
    });
  },
  uploadResource: (formData) => {
    return api.post('/resources/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  createVideoResource: (data) => api.post('/resources/video', data),
  deleteResource: (id) => api.delete(`/resources/${id}`),
};

export default api;

