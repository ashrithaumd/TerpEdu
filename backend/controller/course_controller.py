from dao.course_dao import CourseDao
from flask import render_template, request, jsonify

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
    
    def get_all_courses(self):
        courses = self._course_dao.get_all_courses()

        if courses:
            response = [
                {
                    "CourseName": course[0],
                    "Instructor": course[1],
                    "Department": course[2],
                    "NumberOfStudents": course[3],
                }
                for course in courses
            ]
            return jsonify(response)
        else:
            return jsonify({"message": "No courses found"}), 404
        
    
    def get_active_courses(self):
        try:
            courses = self._course_dao.get_active_courses()
            response = [
                {
                    "CourseID": course[0],
                    "CourseName": course[1],
                    "InstructorID": course[2],
                    "InstructorName": course[3],
                }
                for course in courses
            ]
            return jsonify(response), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def get_instructors(self):
      try:
        instructors =self._course_dao.get_instructors()
        return jsonify(instructors), 200
      except Exception as e:
        return jsonify({'error': str(e)}), 500

   
    def assign_instructors(self):
      try:
        assignments = request.json
        self._course_dao.assign_instructors(assignments)
        return jsonify({'message': 'Courses updated successfully'}), 200
      except Exception as e:
        return jsonify({'error': str(e)}), 500
    