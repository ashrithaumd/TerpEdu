from dao.course_dao import CourseDao
from flask import render_template, request, jsonify, current_app, session
import os

class CourseController:
    def __init__(self):
        self._course_dao = CourseDao()

    def create(self):
        self._course_dao.save_course("test")
        return "saved"
        
    def courses(self):
        if request.method == "POST":
            course_id = request.form['course_id']
            course_name = request.form['course_name']
            description = request.form['description']
            credits = request.form['credits']
            department = request.form['department']
            semester = request.form['semester']
            is_currently_active = 'is_currently_active' in request.form
            self._course_dao.create_course(course_id, course_name, description, credits, department, semester, is_currently_active)
            
            return "Course created successfully!"  
        return render_template("course_form.html")

    def get_course(self, course_id):
        return self._course_dao.get_course(course_id)

    def course_material(self, course_id,inst_id):
        if 'materialFile' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['materialFile']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Get form data
        title = request.form.get('materialName')  # Adjust based on formData key

        # Extract file extension to determine the material type
        file_extension = os.path.splitext(file.filename)[1]  # Get file extension (e.g., .pdf)
        material_type = file_extension.lower()  # Optionally convert to lowercase for consistency

        # Save the file to the desired location
        try:
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)
            
            relative_file_path = os.path.relpath(file_path, start='../frontend/public')

            # Save to the database using the DAO
            self._course_dao.course_materials(course_id, material_type, title, relative_file_path, inst_id)

            return jsonify({"message": "File uploaded and record saved successfully!"}), 200
        except Exception as e:
            return jsonify({"error": f"Failed to upload file or save record: {str(e)}"}), 500

        
    def get_material(self,user_id):
        try:
            materials = self._course_dao.get_course_materials_by_user(user_id)
            print("course_controller", materials)
            
            if not materials:
                return jsonify({"message": "No materials found for the specified user."}), 404

            # Format the materials for response
            formatted_materials = [
                {
                    "material_id": material[0],  
                    "material_type": material[1],
                    "title": material[2],
                    "file_path": f"../frontend/public/{material[3]}"  
                }
                for material in materials
            ]

            return jsonify(formatted_materials), 200
        except Exception as e:
            print(f"Error occurred: {e}")  # Log the error for debugging
            return jsonify({"error": f"Failed to retrieve materials: {str(e)}"}), 500
    
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
    

        