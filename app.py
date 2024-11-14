from flask import Flask, render_template, send_from_directory
from flask_migrate import Migrate
from db import db  
from model.course import Course, CourseMaterial
from model.student import User
from model.admin import Enrollment, CourseInstructor
from model.user import User, Profile, Notification
import os

# Initialize the Flask app
app = Flask(__name__, static_folder='frontend/build', static_url_path='')

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/terpedu'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  

# Initialize db with the app
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Register blueprints for the routes
from routes.course_route import course_bp
from routes.student_route import student_bp
from routes.admin_route import admin_bp

app.register_blueprint(course_bp, url_prefix='/course')
app.register_blueprint(student_bp, url_prefix='/student')
app.register_blueprint(admin_bp, url_prefix='/admin')

# Serve React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
@app.route('/dash')
def dash():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'Dash.jsx')
# Start the Flask application
if __name__ == "__main__":
    app.run(debug=True)
