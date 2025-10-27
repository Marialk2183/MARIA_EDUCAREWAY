import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sapid: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const sapidRegex = /^\d{11}$/;

    if (!nameRegex.test(formData.name)) {
      setError('Name can only contain letters and spaces.');
      setLoading(false);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!sapidRegex.test(formData.sapid)) {
      setError('SAP ID must be exactly 11 digits.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.name, formData.sapid);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-blue-100 to-blue-400">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-8">
        <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/assets/nmims.png" alt="NMIMS" className="h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">EduCareWay</h1>
            <p className="text-gray-600 mt-2">NMIMS Educational Platform</p>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="sapid" className="block text-sm font-bold text-gray-700 mb-2">
                SAP ID
              </label>
              <input
                type="text"
                id="sapid"
                name="sapid"
                value={formData.sapid}
                onChange={handleChange}
                pattern="\d{11}"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your 11-digit SAP ID"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your password (min 6 characters)"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

