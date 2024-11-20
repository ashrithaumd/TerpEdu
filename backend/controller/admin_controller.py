from dao.admin_dao import AdminDao
from flask import request, jsonify

class AdminController:
    def __init__(self):
        # Initialize the AdminController with an instance of AdminDao
        self.admin_dao = AdminDao()

    def enrollment(self, user_id, course_id, status='Active'):
        """
        Enroll a user into a course with a specified status.
        Args:
            user_id (int): The ID of the user to be enrolled.
            course_id (int): The ID of the course for enrollment.
            status (str): Status of enrollment, default is 'Active'.
        Returns:
            dict: Status and message of the enrollment action.
        """
        try:
            # Use DAO to enroll a user in a course
            self.admin_dao.enrollment(user_id, course_id, status)
            return {"status": "success", "message": "User enrolled successfully."}
        except Exception as e:
            # Handle any exceptions and return an error message
            return {"status": "error", "message": str(e)}

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
        
    def assign_instructor(self):
        """
        Assign an instructor to a specific course.
        Expects 'course_id' and 'instructor_id' in the request JSON payload.
        Returns:
            JSON response with a success or error message.
        """
        data = request.json
        course_id = data.get('course_id')
        instructor_id = data.get('instructor_id')
        
        try:
            # Assign the instructor to the specified course using DAO
            self.admin_dao.assign_course(course_id, instructor_id)
            return jsonify({"message": "Instructor assigned successfully"}), 201
        except Exception as e:
            # Handle any exceptions and return an error message
            return jsonify({"error": str(e)}), 500
        
    def enroll_user(self):
        """
        Enroll a user in a course. 
        Expects 'user_id', 'course_id', and optional 'status' in the request JSON payload.
        Returns:
            JSON response with a success or error message.
        """
        data = request.json
        user_id = data.get('user_id')  
        course_id = data.get('course_id')  
        status = data.get('status', 'Active')
        
        try:
            # Use DAO to enroll the user in the course
            self.admin_dao.enrollment(user_id, course_id, status)
            return {"status": "success", "message": "User enrolled successfully."}
        except Exception as e:
            # Handle any exceptions and return an error message
            return jsonify({"error": str(e)}), 500
