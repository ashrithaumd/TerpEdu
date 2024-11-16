from flask import Flask, render_template, send_from_directory, redirect, url_for, session, request,jsonify
from flask_migrate import Migrate
from db import db  
from model.course import Course, CourseMaterial
from model.student import User
from model.admin import Enrollment, CourseInstructor
from model.user import User, Profile, Notification
from controller.user_controller import UserController  # Import UserController for handling login
import os
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

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
from routes.admin_route import admin_bp
from routes.user_route import user_bp
from routes.inst_route import inst_bp

app.register_blueprint(course_bp, url_prefix='/course')
app.register_blueprint(student_bp, url_prefix='/student')
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(inst_bp, url_prefix='/inst')

# Instantiate the UserController
user_controller = UserController()

# Serve React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Route to handle login
@app.route('/login', methods=['GET', 'POST'])
def login():
    return user_controller.login_user()

# Routes for different dashboards
@app.route('/admin_dashboard')
def admin_dashboard():
    if 'user_role' in session and session['user_role'] == 'Admin':
        return render_template('admin_dashboard.html')
    else:
        return redirect(url_for('login'))

@app.route('/student_dashboard')
def student_dashboard():
    if 'user_role' in session and session['user_role'] == 'Student':
        return render_template('student_dashboard.html')
    else:
        return redirect(url_for('login'))

@app.route('/instructor_dashboard')
def instructor_dashboard():
    if 'user_role' in session and session['user_role'] == 'Instructor':
        return render_template('instructor_dashboard.html')
    else:
        return redirect(url_for('login'))

# Start the Flask application
if __name__ == "__main__":
    app.run(debug=True)
