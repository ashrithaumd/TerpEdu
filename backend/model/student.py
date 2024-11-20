class User:
    id: int = 0
    username: str = ""
    password: str = ""

    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password
        
from db import db
from datetime import datetime

class StudentEnrollment(db.Model):
    __tablename__ = 'stu_enrollments'

    stu_enroll = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Primary Key
    user_id = db.Column(db.Integer, db.ForeignKey('users.UserID'), nullable=False)  # Foreign Key to users table
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)  # Foreign Key to courses table
    enrollment_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), nullable=True)  # Auto-generated timestamp

    # Relationships (optional for easy back-referencing if needed)
    student = db.relationship('User', backref='enrollments', lazy=True)
    course = db.relationship('Course', backref='enrollments', lazy=True)

    def __init__(self, user_id, course_id):
        self.user_id = user_id
        self.course_id = course_id
        self.enrollment_date = datetime.now()  # Automatically set the enrollment date

    def save_to_db(self):
        """Saves the enrollment to the database."""
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        """Deletes the enrollment from the database."""
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, stu_enroll):
        """Finds an enrollment by its ID."""
        return cls.query.filter_by(stu_enroll=stu_enroll).first()

    @classmethod
    def find_by_user(cls, user_id):
        """Finds all enrollments for a specific user."""
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def find_by_course(cls, course_id):
        """Finds all enrollments for a specific course."""
        return cls.query.filter_by(course_id=course_id).all()