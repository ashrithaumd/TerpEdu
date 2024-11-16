from db import db

class Course(db.Model):
    __tablename__ = 'courses'
    course_id=db.Column(db.Integer,primary_key=True,nullable=False)
    course_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    credits = db.Column(db.Integer)
    department = db.Column(db.String(50))
    semester = db.Column(db.Enum('Fall', 'Spring', 'Summer', name='semester_enum'))
    is_currently_active = db.Column(db.Boolean, default=True)

    materials = db.relationship('CourseMaterial', backref='course', lazy=True)

class CourseMaterial(db.Model):
    __tablename__ = 'course_materials'
    material_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    material_type = db.Column(db.Enum('PDF', 'Video', 'Document', 'Image', name='material_type_enum'), nullable=False)
    title = db.Column(db.String(100))
    upload_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    file_path = db.Column(db.String(255))
