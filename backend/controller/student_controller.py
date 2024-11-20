from dao.student_dao import StudentDao
from flask import jsonify, request

class StudentController:
    def __init__(self):
        self._student_dao = StudentDao()

    def enroll(self):
        data = request.json
        user_id = data.get('user_id')
        course_id = data.get('course_id')

        if not user_id or not course_id:
            return jsonify({"error": "Missing user_id or course_id"}), 400

        try:
            self._student_dao.enroll_in_course(user_id, course_id)
            return jsonify({"message": "Enrollment successful"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def drop(self):
        data = request.json
        user_id = data.get('user_id')
        course_id = data.get('course_id')

        if not user_id or not course_id:
            return jsonify({"error": "Missing user_id or course_id"}), 400

        try:
            self._student_dao.drop_course(user_id, course_id)
            return jsonify({"message": "Course dropped successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_enrolled_courses(self):
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"error": "Missing user_id"}), 400

        try:
            courses = self._student_dao.get_enrolled_courses(user_id)
            return jsonify(courses), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_course_materials(self):
        course_id = request.args.get('course_id')
        if not course_id:
            return jsonify({"error": "Missing course_id"}), 400

        try:
            materials = self._student_dao.get_course_materials(course_id)
            return jsonify(materials), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def dashboard(self, userID):
        if not userID:
            print("Error: Missing userID")  # Debug log
            return jsonify({"error": "Missing userID"}), 400

        try:
            print(f"Fetching dashboard data for userID: {userID}")  # Debug log
            enrolled_courses = self._student_dao.get_enrolled_courses(userID)
            available_courses = self._student_dao.get_available_courses(userID)

            # Handle empty available_courses
            if not available_courses:
                print("No available courses found.")  # Debug log
                available_courses = []

            # Convert available_courses to a list of dictionaries
            available_courses = [
                {"course_id": course[0], "course_name": course[1]} 
                for course in available_courses
            ]

            print(f"Dashboard data: Enrolled: {enrolled_courses}, Available: {available_courses}")  # Debug log

            return jsonify({
                "enrolled_courses": enrolled_courses,
                "available_courses": available_courses
            }), 200
        except Exception as e:
            print(f"Error in dashboard method: {e}")  # Debug log
            return jsonify({"error": str(e)}), 500
    def get_announcements(self):
        """
        Retrieve all announcements.
        Returns:
            dict: Status and a list of announcements.
        """
        try:
            # Fetch announcements using DAO
            announcements = self.admin_dao.get_announcements()
            
            return {"status": "success", "announcements": announcements}
        except Exception as e:
            # Handle any exceptions and return an error message
            return {"status": "error", "message": str(e)}
    
    def get_material(self):
        """
        Retrieve course materials accessible by a given user.
        Args:
            user_id (int): The ID of the user.
        Returns:
            JSON response with materials or an error message.
        """
        try:
            materials = self._student_dao.get_course_materials_by_user()
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
    