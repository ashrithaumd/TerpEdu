from flask import Flask, render_template
from flask_migrate import Migrate
from db import db  
from model.course import Course, CourseMaterial
from model.student import User
from model.admin import Enrollment, CourseInstructor
from model.user import User, Profile, Notification

# Initialize the Flask app
app = Flask(__name__)

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

# Route for the index page
@app.route('/')
def index():
    return render_template('index.html')  # Render index.html from the templates folder

if __name__ == "__main__":
    app.run(debug=True)
