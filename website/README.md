# 🎤 AI Interview Coach

A professional full-stack web application for practicing interviews with real-time speech recognition, video interface, and AI-powered feedback.

![AI Interview Coach](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%2018-blue)
![Backend](https://img.shields.io/badge/Backend-Flask-green)
![Speech](https://img.shields.io/badge/Speech-Recognition-orange)

## ✨ Features

- 🎯 **Smart Landing Page** - Job role, experience level, and interview type selection
- 📹 **Real-time Video Interface** - Professional interview simulation with camera feed
- 🎤 **Speech Recognition** - Voice-to-text transcription with real-time feedback
- 📝 **Typing Fallback** - Manual text input when speech recognition isn't available
- 📊 **Performance Analytics** - Detailed scoring with improvement suggestions
- 🎨 **Modern UI** - Clean, responsive design with TailwindCSS
- ⚡ **Real-time Progress** - Question tracking and interview timer

## 🚀 Tech Stack

- **Frontend**: React 18, React Router, TailwindCSS
- **Backend**: Flask (Python), Flask-CORS
- **Speech**: Web Speech API (Chrome/Edge/Safari)
- **Video**: WebRTC Camera API
- **Styling**: Tailwind CSS with custom purple theme
- **APIs**: RESTful endpoints for questions and evaluation

## 🛠 Quick Setup

### Prerequisites
- Python 3.7+ 
- Node.js 16+
- Chrome/Edge/Safari (for speech recognition)

### 1️⃣ Backend Setup
```bash
cd website
pip install flask flask-cors
python app.py
```
✅ Server runs at `http://localhost:5000`

### 2️⃣ Frontend Setup
```bash
# In a new terminal
cd website  
npm install
npm start
```
✅ App opens at `http://localhost:3000`

## 🎯 How to Use

1. **Launch** - Open http://localhost:3000
2. **Select** - Choose job role, experience level, interview type
3. **Start Interview** - Click "Start Practice Interview"
4. **Camera** - Allow camera and microphone permissions
5. **Record** - Use 🎤 button for speech or type answers
6. **Complete** - Answer all questions to get detailed feedback

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/questions` | GET | Returns interview questions |
| `/api/evaluate` | POST | Evaluates answers and returns scores |
| `/api/health` | GET | Health check endpoint |

## 📁 Project Structure

```
mock-AI/
├── website/
│   ├── app.py              # Flask backend
│   ├── requirements.txt    # Python dependencies
│   ├── package.json        # Node.js dependencies
│   ├── src/
│   │   ├── App.js         # Main React app
│   │   ├── components/    # Reusable components
│   │   └── pages/         # Page components
│   └── public/            # Static assets
├── RUN.md                 # Detailed setup guide
└── README.md              # This file
```

## 🎤 Speech Recognition

- **Supported Browsers**: Chrome, Edge, Safari
- **Requirements**: Internet connection (uses Google's speech service)
- **Fallback**: Manual typing always available
- **Features**: Real-time transcription, auto-restart, error handling

## 🔄 Future Enhancements

- [ ] OpenAI/Gemini integration for intelligent scoring
- [ ] Whisper API for offline speech-to-text  
- [ ] MediaPipe for posture and eye contact analysis
- [ ] User authentication and session management
- [ ] More interview question categories and difficulty levels
- [ ] Export interview results to PDF
- [ ] Video recording and playback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you encounter any issues:
1. Check the [RUN.md](RUN.md) for detailed setup instructions
2. Ensure you have an internet connection for speech recognition
3. Use Chrome/Edge/Safari browsers for best compatibility
4. Enable microphone permissions in your browser

---

⭐ **Star this repo** if you find it helpful!
