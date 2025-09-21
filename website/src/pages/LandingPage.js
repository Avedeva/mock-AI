import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Ready to Ace Your{' '}
            <span className="text-purple-600">Next Interview?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            AI mock interviews with personalized practice and real-time analytics to
            boost your confidence and performance.
          </p>
          
          {/* Selection Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Select job...</option>
                  <option>Software Engineer</option>
                  <option>Data Scientist</option>
                  <option>Product Manager</option>
                  <option>Marketing Manager</option>
                  <option>Sales Representative</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Select level...</option>
                  <option>Entry Level</option>
                  <option>Mid-Level</option>
                  <option>Senior Level</option>
                  <option>Executive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interview Round
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Select round...</option>
                  <option>Initial Screening</option>
                  <option>Technical Round</option>
                  <option>Behavioral Round</option>
                  <option>Final Round</option>
                </select>
              </div>
            </div>
            
            <Link to="/interview">
              <button className="w-full md:w-auto bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition-colors">
                🎯 Start Practice
              </button>
            </Link>
          </div>
          
          <Link to="/interview">
            <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg">
              Start Practice Interview
            </button>
          </Link>
        </div>
      </div>
      
      {/* Demo Video Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
          <div className="relative aspect-video">
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-sm font-semibold">REC</span>
                </div>
                <div className="text-white text-lg mb-2">🎤 Interview Session</div>
                <div className="text-gray-300">Click "Start Practice" to begin your mock interview</div>
              </div>
            </div>
            
            {/* Timer */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-md text-sm">
              ⏱ 05:32
            </div>
            
            {/* Recording indicator */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              RECORDING
            </div>
            
            {/* User video placeholder (small window) */}
            <div className="absolute bottom-6 right-6 w-32 h-24 bg-gray-600 rounded-lg border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-gray-500 flex items-center justify-center">
                <span className="text-white text-xs">Your Video</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
