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

    def remove_course_by_id(self):
        if request.method == "POST":
            # Extract form data for course remove
            course_id = request.form['courseId']
            self._course_dao.remove_courses(course_id)
            return "Course created successfully!"  
        return render_template("remove_course_form.html")
    
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
    
    def get_material_for_students(self,course_id):
        try:
            materials = self._course_dao.get_course_materials(course_id)
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
                    "course_name": course[0],
                    "course_instructor": course[1],
                    "course_department": course[2],
                    "course_no_of_students": course[3],
                    "course_id": course[4]
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
                    "InstructorID": course[2] if course[2] is not None else "",
                    "InstructorName": course[3] if course[3] is not None else "Unassigned",
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
            response = [
                {
                    "InstructorID": instructor[0],
                    "Name": instructor[1],
                }
                for instructor in instructors
            ]
            return jsonify(response), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500


   
   
    def assign_instructors(self):
        """
        Assign instructors to courses and return updated course data.
        """
        try:
            # Get the assignments from the request body
            assignments = request.json

            # Check if assignments is valid
            if not assignments or not isinstance(assignments, dict):
                return jsonify({'error': 'Invalid request format. Expected a JSON object.'}), 400

            # Process the assignments
            self._course_dao.assign_instructors(assignments)

            # Fetch updated courses
            updated_courses = self._course_dao.get_active_courses()

            # Return success response with updated courses
            return jsonify({
                'message': 'Courses updated successfully',
                'updatedCourses': [
                    {
                        'CourseID': course[0],
                        'CourseName': course[1],
                        'InstructorID': course[2],
                        'InstructorName': course[3]
                    }
                    for course in updated_courses
                ]
            }), 200

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
    
    def remove_courses(self,course_id):
        result = self._course_dao.remove_courses(course_id)
        return result