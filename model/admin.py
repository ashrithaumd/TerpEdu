from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    EnrollmentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('users.UserID'), nullable=False)
    CourseID = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    EnrollmentDate = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    Status = db.Column(db.Enum('Active', 'Dropped', name='enrollment_status_enum'), default='Active')

    user = db.relationship('User', backref='enrollments')  # Relationship to User
    course = db.relationship('Course', backref='enrollments')  # Relationship to Course

    def __init__(self, user_id, course_id, status='Active'):
        self.UserID = user_id
        self.CourseID = course_id
        self.Status = status

    def __repr__(self):
        return f"<Enrollment {self.EnrollmentID}>"

class CourseInstructor(db.Model):
    __tablename__ = 'course_instructors'

    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), primary_key=True)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.UserID'), primary_key=True)

    course = db.relationship('Course', backref='course_instructors')  # Relationship to Course
    instructor = db.relationship('User', backref='assigned_courses')  # Relationship to User (instructor)

    def __init__(self, course_id, instructor_id):
        self.course_id = course_id
        self.instructor_id = instructor_id

    def __repr__(self):
        return f"<CourseInstructor course_id={self.course_id}, instructor_id={self.instructor_id}>"
