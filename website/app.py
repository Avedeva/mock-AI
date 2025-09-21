from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Static interview questions
INTERVIEW_QUESTIONS = [
    {
        "id": 1,
        "question": "Tell me about yourself and your background.",
        "category": "Introduction"
    },
    {
        "id": 2,
        "question": "What interests you most about this position?",
        "category": "Motivation"
    },
    {
        "id": 3,
        "question": "Describe a challenging project you've worked on and how you overcame obstacles.",
        "category": "Problem Solving"
    },
    {
        "id": 4,
        "question": "Where do you see yourself in 5 years?",
        "category": "Career Goals"
    },
    {
        "id": 5,
        "question": "Why should we hire you over other candidates?",
        "category": "Value Proposition"
    }
]

@app.route('/api/questions', methods=['GET'])
def get_questions():
    """Return interview questions"""
    return jsonify({
        "success": True,
        "questions": INTERVIEW_QUESTIONS,
        "total": len(INTERVIEW_QUESTIONS)
    })

@app.route('/api/evaluate', methods=['POST'])
def evaluate_interview():
    """Evaluate interview answers and return feedback"""
    data = request.get_json()
    answers = data.get('answers', [])
    
    # Dummy scoring logic (replace with AI later)
    confidence = random.randint(6, 9)
    content = random.randint(5, 9)
    communication = random.randint(6, 8)
    eye_contact = random.randint(5, 8)
    
    overall_score = (confidence + content + communication + eye_contact) / 4
    
    # Generate suggestions based on scores
    suggestions = []
    if confidence < 7:
        suggestions.append("Work on building confidence through practice")
    if content < 7:
        suggestions.append("Focus on providing more specific examples")
    if communication < 7:
        suggestions.append("Practice speaking more clearly and at appropriate pace")
    if eye_contact < 7:
        suggestions.append("Maintain better eye contact with the camera")
    
    if not suggestions:
        suggestions.append("Great performance! Keep practicing to maintain your skills")
    
    return jsonify({
        "success": True,
        "scores": {
            "confidence": confidence,
            "content": content,
            "communication": communication,
            "eye_contact": eye_contact,
            "overall": round(overall_score, 1)
        },
        "suggestions": suggestions,
        "total_answers": len(answers)
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "AI Interview Coach API is running"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
