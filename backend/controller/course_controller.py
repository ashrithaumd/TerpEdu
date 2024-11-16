from dao.course_dao import CourseDao
from flask import render_template, request

class CourseController:
    def __init__(self):
        self._course_dao = CourseDao()

    def create(self):
        self._course_dao.save_course("test")
        return "saved"
        
    def courses(self):
        if request.method == "POST":
            course_id=request.form['course_id']
            course_name = request.form['course_name']
            description = request.form['description']
            credits = request.form['credits']
            department = request.form['department']
            semester = request.form['semester']
            is_currently_active = 'is_currently_active' in request.form
            self._course_dao.create_course(course_id,course_name, description, credits, department, semester, is_currently_active)
            
            return "Course created successfully!"  
        return render_template("course_form.html")

    
    def course_materials(self):
        return self._course_dao.course_materials()
    
    def get_course(self, course_id):
        return self._course_dao.get_course(course_id)
    