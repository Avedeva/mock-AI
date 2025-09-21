import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { results, answers } = location.state || {};

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Available</h2>
          <Link to="/" className="text-purple-600 hover:text-purple-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const ScoreCard = ({ title, score, maxScore = 10, description, color = "purple" }) => {
    const percentage = (score / maxScore) * 100;
    const colorClasses = {
      purple: "bg-purple-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      orange: "bg-orange-500"
    };

    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="text-2xl font-bold text-gray-900">{score}/{maxScore}</span>
        </div>
        <div className="mb-3">
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className={`${colorClasses[color]} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interview Performance Report
          </h1>
          <p className="text-gray-600">
            Here's your detailed feedback and performance analysis
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overall Performance</h2>
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-purple-100 mb-4">
            <span className="text-4xl font-bold text-purple-600">
              {results.scores?.overall || 'N/A'}
            </span>
          </div>
          <p className="text-xl text-gray-600">Out of 10</p>
          <p className="text-green-600 font-semibold mt-2">
            {results.scores?.overall >= 8 ? 'Excellent Performance!' : 
             results.scores?.overall >= 6 ? 'Good Performance!' : 
             'Room for Improvement'}
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ScoreCard 
            title="Confidence"
            score={results.scores?.confidence || 0}
            description="Your confidence and composure during the interview"
            color="purple"
          />
          <ScoreCard 
            title="Content Quality"
            score={results.scores?.content || 0}
            description="Relevance and depth of your responses"
            color="blue"
          />
          <ScoreCard 
            title="Communication"
            score={results.scores?.communication || 0}
            description="Clarity and effectiveness of communication"
            color="green"
          />
          <ScoreCard 
            title="Eye Contact & Posture"
            score={results.scores?.eye_contact || 0}
            description="Body language and professional presence"
            color="orange"
          />
        </div>

        {/* Feedback & Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              💡 Improvement Suggestions
            </h3>
            <ul className="space-y-3">
              {results.suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              📊 Interview Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Questions Answered:</span>
                <span className="font-semibold">{results.total_answers || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interview Type:</span>
                <span className="font-semibold">Behavioral</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">~5 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate:</span>
                <span className="font-semibold text-green-600">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Answers Review */}
        {answers && answers.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Responses</h3>
            <div className="space-y-6">
              {answers.map((answer, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Q{index + 1}: {answer.question}
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                    {answer.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Link to="/interview">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Take Another Practice Interview
            </button>
          </Link>
          <Link to="/">
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
