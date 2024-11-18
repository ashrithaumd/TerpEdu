from flask import Flask, send_from_directory, redirect, url_for, session, request, jsonify
from flask_migrate import Migrate
from db import db  
from model.course import Course, CourseMaterial
from model.student import User
from model.admin import Enrollment, CourseInstructor
from model.user import User, Profile, Notification
from controller.user_controller import UserController
from controller.course_controller import CourseController
from controller.admin_controller import AdminController
import os
from flask_cors import CORS
from sqlalchemy import text


# Initialize the Flask app
app = Flask(__name__, static_folder='frontend/build', static_url_path='')

# Configure CORS for the app
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow CORS only for /api/* routes from localhost:3000

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/terpedu'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'  # Required for using session management

# Initialize db with the app
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Register blueprints for the routes
from routes.course_route import course_bp
from routes.student_route import student_bp

from routes.user_route import user_bp
from routes.inst_route import inst_bp

app.register_blueprint(course_bp, url_prefix='/course')
app.register_blueprint(student_bp, url_prefix='/student')

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(inst_bp, url_prefix='/inst')

# Instantiate the Controllers
user_controller = UserController()
course_controller = CourseController()
admin_controller= AdminController()

# Serve React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# Route to handle login
@app.route('/api/login', methods=['POST'])
def login():
    return user_controller.login_user()

# Example endpoint for getting user data
@app.route('/api/user_data', methods=['GET'])
def user_data():
    if 'user_id' in session:
        # Example data to send back
        return jsonify({
            "user_id": session['user_id'],
            "user_name": session['user_name'],
            "user_role": session['user_role']
        })
    else:
        return jsonify({"status": "error", "message": "User not logged in"}), 401
    
@app.route('/api/get_all_users', methods=['GET'])
def get_all_users():
    print("Endpoint '/api/get_all_users' was called")
    return user_controller.get_all_users()

# Route to handle assigning courses
@app.route('/api/assign_courses', methods=['GET', 'POST'])
def assign_courses():
    if request.method == 'GET':
        return course_controller.get_courses_for_assignment()
    elif request.method == 'POST':
        return course_controller.assign_courses_to_instructor()

# Route to handle fetching all courses
@app.route('/api/get_all_courses', methods=['GET'])
def get_all_courses():
    return course_controller.get_all_courses()

@app.route('/api/get_active_courses', methods=['GET'])
def get_active_courses():
    course_controller = CourseController()
    return course_controller.get_active_courses()

@app.route('/api/get_instructors', methods=['GET'])
def get_instructors():
    course_controller = CourseController()
    return course_controller.get_instructors()

@app.route('/api/assign_instructors', methods=['POST'])
def assign_instructors():
    course_controller = CourseController()
    return course_controller.assign_instructors()

@app.route('/api/get_announcements', methods=['GET'])
def get_announcements():
    admin_controller= AdminController()
    return admin_controller.get_announcements()


# Start the Flask application
if __name__ == "__main__":
    app.run(debug=True)
