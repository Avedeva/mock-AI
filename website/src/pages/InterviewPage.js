import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
    startCamera();
    initializeSpeechRecognition();
    
    // Start timer
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (recognition) {
        if (recognition.manualStop) {
          recognition.manualStop();
        } else {
          recognition.stop();
        }
      }
    };
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      if (data.success) {
        setQuestions(data.questions);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Simple configuration - no continuous mode to avoid auto-stop issues
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      
      let isManualStop = false;
      let currentTranscript = '';
      
      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        isManualStop = false;
      };
      
      recognition.onresult = (event) => {
        console.log('Speech recognition result:', event.results);
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        currentTranscript = finalTranscript + interimTranscript;
        setTranscript(currentTranscript);
        setCurrentAnswer(currentTranscript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'network') {
          alert('Speech recognition requires internet connection. Please check your connection and try again.');
        } else if (event.error === 'service-not-allowed') {
          alert('Speech recognition service not available. Please use typing instead.');
        } else if (event.error === 'no-speech') {
          console.log('No speech detected, restarting...');
          // Try to restart for no-speech errors
          setTimeout(() => {
            if (isListening) {
              try {
                recognition.start();
              } catch (e) {
                console.error('Error restarting after no-speech:', e);
              }
            }
          }, 100);
        } else {
          console.log('Recognition error:', event.error, 'but continuing...');
        }
      };
      
      recognition.onend = () => {
        console.log('Speech recognition ended, manual stop:', isManualStop);
        if (!isManualStop && isListening) {
          // Auto-restart only if not manually stopped
          setTimeout(() => {
            if (isListening) {
              try {
                recognition.start();
                console.log('Restarting recognition...');
              } catch (e) {
                console.error('Error restarting:', e);
                setIsListening(false);
              }
            }
          }, 100);
        } else {
          setIsListening(false);
        }
      };
      
      recognition.manualStop = () => {
        isManualStop = true;
        recognition.stop();
      };
      
      recognition.clearTranscript = () => {
        currentTranscript = '';
      };
      
      setRecognition(recognition);
    } else {
      console.warn('Speech Recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  };

  const startRecording = async () => {
    if (!recognition) {
      alert('Speech recognition not available. Please use Chrome, Edge, or Safari, and ensure you have an internet connection.');
      return;
    }

    // Check if online
    if (!navigator.onLine) {
      alert('You appear to be offline. Voice recognition requires internet connection. Please check your connection or use typing instead.');
      return;
    }

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Clear previous transcript
      setTranscript('');
      setCurrentAnswer('');
      if (recognition.clearTranscript) {
        recognition.clearTranscript();
      }
      
      console.log('Starting speech recognition...');
      recognition.start();
    } catch (error) {
      console.error('Microphone access error:', error);
      alert('Please allow microphone access to use voice recording.');
      setIsListening(false);
    }
  };

  const stopRecording = () => {
    if (recognition && isListening) {
      console.log('Manually stopping speech recognition...');
      setIsListening(false);
      if (recognition.manualStop) {
        recognition.manualStop();
      } else {
        recognition.stop();
      }
    }
  };

  const handleNext = () => {
    // Stop recording if still listening
    if (isListening) {
      stopRecording();
    }

    const newAnswers = [...answers, {
      questionId: questions[currentQuestion].id,
      question: questions[currentQuestion].question,
      answer: currentAnswer
    }];
    setAnswers(newAnswers);
    setCurrentAnswer('');
    setTranscript('');

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Interview complete, navigate to results
      submitInterview(newAnswers);
    }
  };

  const submitInterview = async (finalAnswers) => {
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await response.json();
      
      // Pass results to results page
      navigate('/results', { state: { results: data, answers: finalAnswers } });
    } catch (error) {
      console.error('Error submitting interview:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading interview questions...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">No questions available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Video Interface */}
      <div className="relative h-screen">
        {/* Main background area - solid color instead of video */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        </div>

        {/* Timer and Recording Status */}
        <div className="absolute top-6 left-6 flex space-x-4">
          <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-lg font-mono">
            ⏱ {formatTime(timeElapsed)}
          </div>
          {isRecording && (
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
              <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
              RECORDING
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="absolute top-6 right-6 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        {/* User video (small window) */}
        <div className="absolute bottom-8 right-8 w-64 h-48 bg-gray-800 rounded-lg border-2 border-white overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
          <div className="absolute top-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
            You
          </div>
        </div>

        {/* Question and Answer Area */}
        <div className="absolute bottom-8 left-8 right-80 bg-white bg-opacity-95 rounded-lg p-6 backdrop-blur-sm">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current question */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {questions[currentQuestion]?.question}
            </h2>
            <span className="text-sm text-purple-600 font-medium">
              {questions[currentQuestion]?.category}
            </span>
          </div>

          {/* Audio Recording Section */}
          <div className="mb-4">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center mb-3">
                <button
                  onClick={isListening ? stopRecording : startRecording}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <span className="text-xl">🎤</span>
                  <span>{isListening ? 'Stop Recording' : 'Start Recording'}</span>
                </button>
              </div>
              
              {isListening && (
                <div className="text-center mb-3">
                  <div className="flex justify-center items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <p className="text-red-600 text-sm mt-1">Listening...</p>
                </div>
              )}
            </div>
            
            {/* Transcript Display */}
            {transcript && (
              <div className="bg-white border-2 border-purple-200 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-purple-700 mb-2">Your Response:</h4>
                <p className="text-gray-800 leading-relaxed">{transcript}</p>
              </div>
            )}
            
            {/* Manual Edit Option */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💬 Type your answer or use voice recording above
              </label>
              <textarea
                value={currentAnswer}
                onChange={(e) => {
                  setCurrentAnswer(e.target.value);
                  setTranscript(e.target.value);
                }}
                placeholder="Your spoken response will appear here... or type your answer manually"
                className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                ℹ️ Voice recording requires internet connection. You can always type your answer.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {recognition ? (
                isListening ? (
                  <span className="text-red-600">🔴 Recording in progress</span>
                ) : (
                  <span className="text-green-600">🎤 Voice recording ready</span>
                )
              ) : (
                <span className="text-orange-600">⚠️ Use Chrome/Edge/Safari for voice recording</span>
              )}
            </div>
            
            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim()}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
