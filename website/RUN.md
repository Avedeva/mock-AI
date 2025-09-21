# 🚀 How to Run AI Interview Coach Locally

This guide will help you set up and run the AI Interview Coach website on your local machine.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:
- **Python 3.7+** (for Flask backend)
- **Node.js 16+** and **npm** (for React frontend)
- **Git** (to clone the repository)

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mock-AI.git
cd mock-AI/website
```

### 2️⃣ Backend Setup (Flask API)

#### Install Python Dependencies
```bash
pip install Flask==2.3.2 Flask-CORS==4.0.0 gunicorn==21.2.0
```

*Or use the requirements file:*
```bash
pip install -r requirements.txt
```

#### Start the Flask Server
```bash
python app.py
```

✅ **Backend Success:** You should see:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

**Keep this terminal open** - the backend API will run on `http://localhost:5000`

### 3️⃣ Frontend Setup (React App)

Open a **new terminal** window/tab in the same `website` folder.

#### Install Node.js Dependencies
```bash
npm install
```

#### Start the React Development Server
```bash
npm start
```

✅ **Frontend Success:** Your browser should automatically open to `http://localhost:3000`

## 🌐 Access the Application

Once both servers are running:
- **Frontend (React):** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 🎯 Quick Start Commands

For convenience, here are the complete commands to run in **two separate terminals**:

### Terminal 1 - Backend (Flask)
```bash
cd path/to/mock-AI/website
pip install -r requirements.txt
python app.py
```

### Terminal 2 - Frontend (React)
```bash
cd path/to/mock-AI/website
npm install
npm start
```

## 🔍 Testing the Application

1. **Landing Page** (`/`) - Select job role, level, and interview round
2. **Start Interview** - Click "Start Practice Interview" 
3. **Camera Access** - Allow camera permissions when prompted
4. **Answer Questions** - Complete 5 interview questions
5. **View Results** - See your performance report with scores

## 📡 API Endpoints

The Flask backend provides these endpoints:
- `GET /api/questions` - Fetch interview questions
- `POST /api/evaluate` - Submit answers for evaluation
- `GET /api/health` - Health check

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use:** Kill process on port 5000 or change port in `app.py`
- **Module not found:** Ensure Flask dependencies are installed
- **CORS errors:** Verify Flask-CORS is installed and configured

### Frontend Issues
- **npm install fails:** Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- **Port 3000 busy:** React will prompt to use a different port
- **API requests fail:** Ensure backend is running on port 5000

### Camera Issues
- **Camera not working:** Use HTTPS or localhost (required for camera access)
- **No video:** Check browser permissions for camera access

## 🛠 Development Notes

- Backend runs in debug mode for development
- Frontend has hot-reload enabled for instant updates
- API requests are proxied from React (port 3000) to Flask (port 5000)
- Both servers must be running simultaneously for full functionality

## 🔄 Stopping the Application

To stop the servers:
- **Flask:** Press `Ctrl+C` in the backend terminal
- **React:** Press `Ctrl+C` in the frontend terminal

## 📁 Project Structure

```
website/
├── app.py              # Flask backend server
├── requirements.txt    # Python dependencies
├── package.json        # Node.js dependencies
├── src/
│   ├── App.js         # Main React app
│   ├── components/    # React components
│   └── pages/         # Page components
├── public/            # Static files
└── README.md          # Project documentation
```

---

🎉 **You're all set!** The AI Interview Coach should now be running locally with full video interview functionality.
