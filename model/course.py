from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Course(db.Model):
    __tablename__ = 'courses'  # Explicitly defining the table name

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    credits = db.Column(db.Integer)
    department = db.Column(db.String(50))
    semester = db.Column(db.Enum('Fall', 'Spring', 'Summer', name='semester_enum'))
    is_currently_active = db.Column(db.Boolean, default=True)

    # Relationship to CourseMaterials (one-to-many)
    materials = db.relationship('CourseMaterial', backref='course', lazy=True)

    def __init__(self, course_name, description, credits, department, semester, is_currently_active=True):
        self.course_name = course_name
        self.description = description
        self.credits = credits
        self.department = department
        self.semester = semester
        self.is_currently_active = is_currently_active

    def __repr__(self):
        return f"<Course {self.course_name}>"

class CourseMaterial(db.Model):
    __tablename__ = 'course_materials'

    material_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    material_type = db.Column(db.Enum('PDF', 'Video', 'Document', 'Image', name='material_type_enum'), nullable=False)
    title = db.Column(db.String(100))
    upload_date = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    file_path = db.Column(db.String(255))

    def __init__(self, course_id, material_type, title, file_path):
        self.course_id = course_id
        self.material_type = material_type
        self.title = title
        self.file_path = file_path

    def __repr__(self):
        return f"<CourseMaterial {self.title}>"
