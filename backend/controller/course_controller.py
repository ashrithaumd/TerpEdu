from dao.course_dao import CourseDao
from flask import render_template, request, jsonify, current_app, session
import os


class CourseController:
    def __init__(self):
        # Initialize the CourseController with an instance of CourseDao
        self._course_dao = CourseDao()

    def create(self):
        """
        Create a test course using the DAO.
        Returns:
            str: Confirmation message of course creation.
        """
        self._course_dao.save_course("test")
        return "saved"
        
    def courses(self):
        """
        Handle the creation of a course.
        If the request is POST, extract course data from form and create a new course.
        Otherwise, render a form for course creation.
        """
        if request.method == "POST":
            # Extract form data for course creation
            course_id = request.form['course_id']
            course_name = request.form['course_name']
            description = request.form['description']
            credits = request.form['credits']
            department = request.form['department']
            semester = request.form['semester']
            is_currently_active = 'is_currently_active' in request.form
            # Call the DAO method to create the course
            self._course_dao.create_course(course_id, course_name, description, credits, department, semester, is_currently_active)
            
            return "Course created successfully!"  
        return render_template("course_form.html")

    def get_course(self, course_id):
        """
        Retrieve a course by its ID using the DAO.
        Args:
            course_id (int): The ID of the course to retrieve.
        Returns:
            Course data.
        """
        return self._course_dao.get_course(course_id)

    def course_material(self, course_id, inst_id):
        """
        Handle uploading course material for a course.
        Args:
            course_id (int): ID of the course.
            inst_id (int): ID of the instructor.
        Returns:
            JSON response indicating success or error.
        """
        if 'materialFile' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['materialFile']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Get form data for the material title
        title = request.form.get('materialName')

        # Determine the file type based on file extension
        file_extension = os.path.splitext(file.filename)[1]  
        material_type = file_extension.lower()

        # Save the file to the desired location
        try:
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
            file.save(file_path)
            
            relative_file_path = os.path.relpath(file_path, start='../frontend/public')

            # Save material record using the DAO
            self._course_dao.course_materials(course_id, material_type, title, relative_file_path, inst_id)

            return jsonify({"message": "File uploaded and record saved successfully!"}), 200
        except Exception as e:
            return jsonify({"error": f"Failed to upload file or save record: {str(e)}"}), 500

        
    def get_material(self, user_id):
        """
        Retrieve course materials accessible by a given user.
        Args:
            user_id (int): The ID of the user.
        Returns:
            JSON response with materials or an error message.
        """
        try:
            materials = self._course_dao.get_course_materials_by_user(user_id)
            print("course_controller", materials)
            
            if not materials:
                return jsonify({"message": "No materials found for the specified user."}), 404

            # Format materials for response
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
        """
        Retrieve all courses from the DAO.
        Returns:
            JSON response with course data or an error message.
        """
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
        """
        Retrieve all active courses using the DAO.
        Returns:
            JSON response with course data or an error message.
        """
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
        """
        Retrieve a list of instructors using the DAO.
        Returns:
            JSON response with instructor data or an error message.
        """
        try:
            instructors = self._course_dao.get_instructors()
            return jsonify(instructors), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

   
    def assign_instructors(self):
        """
        Assign instructors to courses based on request data.
        Expects assignments in the request body.
        Returns:
            JSON response indicating success or error.
        """
        try:
            assignments = request.json
            self._course_dao.assign_instructors(assignments)
            return jsonify({'message': 'Courses updated successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def get_user_counts(self):
        """
        Retrieve user counts using the DAO.
        Returns:
            JSON response with user counts or an error message.
        """
        try:
            user_counts = self._course_dao.get_user_counts()
            return jsonify(user_counts), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def get_enrolled(self, course_id):
        """
        Retrieve the number of students enrolled in a course.
        Args:
            course_id (int): The ID of the course.
        Returns:
            dict: Enrolled count data.
        """
        enrolled_count = self._course_dao.get_enrolled(course_id)
        result_data = {"enrolledCount": enrolled_count}
        return result_data
