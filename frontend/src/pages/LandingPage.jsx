import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['/assets/nmims.png', '/assets/mcalogo.jpg', '/assets/mpstme.jpg'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-100 via-green-200 to-blue-300">
      <Navbar transparent />

      {/* Hero Section with Image Carousel */}
      <div className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={prevImage}
              className="text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-4 mr-8 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full max-w-4xl h-96 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={images[currentImageIndex]}
                alt="NMIMS"
                className="w-full h-full object-contain bg-white bg-opacity-40 transition-opacity duration-500 hover:opacity-100 opacity-40"
              />
            </div>

            <button
              onClick={nextImage}
              className="text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-4 ml-8 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <h2 className="text-5xl font-bold text-center text-black mb-16">
            WELCOME TO NMIMS
          </h2>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">LIBRARY</h3>
              <p className="text-xl font-semibold text-gray-600 mb-4">Location Infrastructure</p>
              <p className="text-gray-700">
                Prof. Y. K. Bhushan Information & Knowledge Resource Centre is a comprehensive library with extensive collection of books, journals, online databases, and a dedicated digital library.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">LAB</h3>
              <p className="text-xl font-semibold text-gray-600 mb-4">Infrastructure Facilities</p>
              <div className="text-gray-700">
                <p>AVR LAB</p>
                <p>HDLCE LAB</p>
                <p>HYDRAULICS LAB</p>
                <p>ADDITIVE MANUFACTURING LAB</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4">SEMINAR HALLS</h3>
              <p className="text-xl font-semibold text-gray-600 mb-4">Event Spaces</p>
              <p className="text-gray-700">
                Seminar halls are dedicated spaces for hosting presentations, workshops, and conferences, facilitating knowledge sharing and collaboration. They provide a professional environment for academic, corporate, and formal events.
              </p>
            </div>
          </div>

          {/* Courses Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/course/MCA" className="group">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105">
                <div
                  className="h-48 rounded-lg mb-6 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/assets/mca.jpeg)' }}
                ></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">MCA</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• SEM 1</li>
                  <li>• SEM 2</li>
                  <li>• SEM 3</li>
                </ul>
                <div className="mt-4 text-primary group-hover:text-secondary transition-colors">
                  Explore →
                </div>
              </div>
            </Link>

            <div className="group">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 opacity-70">
                <div
                  className="h-48 rounded-lg mb-6 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/assets/BTECH.jpg)' }}
                ></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">BTECH</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• SEM 1 - SEM 8</li>
                </ul>
                <p className="text-xl font-bold text-gray-500 mt-4">COMING SOON...</p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 opacity-70">
                <div
                  className="h-48 rounded-lg mb-6 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/assets/btechint.png)' }}
                ></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">BTECH-Int</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• SEM 1 - SEM 12</li>
                </ul>
                <p className="text-xl font-bold text-gray-500 mt-4">COMING SOON...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;

