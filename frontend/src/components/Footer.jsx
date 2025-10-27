import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-accent">EduCare</span>Way
            </h2>
            <p className="text-gray-300 mb-4">
              Unlock knowledge with our interactive educational platform, offering engaging lessons and resources for learners of all ages. Empower your learning journey with easy-to-use tools and personalized support.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <FaPhone className="mr-2" />
                <span>Umed: 7045347597 | Maria: 9999999999</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaEnvelope className="mr-2" />
                <span>info@digitalway.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/jqE4v2emv5YjqbDV/?mibextid=qi2Omg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/nmims_mpstme?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/mpstme?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/school/nmims-engineering/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 digitalway.com | Designed by Maria & Umed</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

