from flask import Flask, render_template, send_from_directory, jsonify
from flask_migrate import Migrate
from db import db  
from model.course import Course, CourseMaterial
from model.student import User
from model.admin import Enrollment, CourseInstructor
from model.user import User, Profile, Notification
import os
from flask_cors import CORS
from flask import Flask, session
# from flask_session import Session

project_root = os.path.dirname(os.path.abspath(__file__))  # Get the absolute path to the backend directory
frontend_build_path = os.path.join(project_root, 'build')
UPLOAD_FOLDER = os.path.join(project_root, 'build', 'materials')

# Initialize the Flask app
app = Flask(__name__, static_folder=frontend_build_path, static_url_path='')
CORS(app,supports_credentials=True)
# app.config['SECRET_KEY'] = 'da7bc86442a0cf44cc2aca2f5692d89e' 
# app.config['SESSION_TYPE'] = 'filesystem'  
# Session(app)
# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/terpedu'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

# Serve React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    full_path = os.path.join(app.static_folder, path)
    print(f"Requested path: {path}")
    print(f"Full path: {full_path}")
    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/api/user_data',methods=['GET'])
def user_data():
    if 'user_id' in session:
        return jsonify({
            "user_id":session['user_id'],
            "user_name":session['user_name'],
            "user_role":session['user_role']
        })
    else:
        return jsonify({"status":"error","message":"User not logged in"}),401

# Start the Flask application
if __name__ == "__main__":
    app.run(debug=True)
