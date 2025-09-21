import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">MockView</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/interview" className="text-gray-600 hover:text-gray-900">
              Interviews
            </Link>
            <span className="text-gray-600">Resume</span>
            <span className="text-gray-600">Jobs</span>
            <span className="text-gray-600">Pricing</span>
            <span className="text-gray-600">Business Solutions</span>
            <span className="text-gray-600">Contact</span>
            <span className="text-gray-600">Sign In</span>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
