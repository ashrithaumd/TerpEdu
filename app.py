from flask import Flask
from flask_migrate import Migrate
from db import db  
from model import Course, Student, Admin, User
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/terpedu'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  

# Initialize Flask-Migrate
migrate = Migrate(app, db)

from .routes.course_route import course_bp
from .routes.student_route import student_bp
from .routes.admin_route import admin_bp

app.register_blueprint(course_bp, url_prefix='/course')
app.register_blueprint(student_bp, url_prefix='/student')
app.register_blueprint(admin_bp, url_prefix='/admin')

if __name__ == "__main__":
    app.run(debug=True)
