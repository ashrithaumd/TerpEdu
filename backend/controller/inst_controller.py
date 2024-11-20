from flask import render_template, request, jsonify
from dao.inst_dao import InstDao

class InstController:
    def __init__(self):
        # Initialize InstController
        self._inst_dao = InstDao()
        
    def get_courses_by_instructor(self, instructor_id):
        """
        Fetch courses associated with a given instructor using the DAO.
        Args:
            instructor_id (int): The ID of the instructor.
        Returns:
            list: List of courses with details including course ID, name, description, and department.
        """
        result = self._inst_dao.fetch_courses_for_instructor(instructor_id)
        response = [
            {
                "course_ID": i[0],
                "name": i[1],
                "description": i[2],
                "department": i[3]
            }
            for i in result
        ]
        # Return the list of courses formatted as a response
        return response
    
    def post_announcement(self):
        """
        Handle the posting of an announcement for a course.
        Expects a POST request with JSON data including course_id, user_id, and announcement.
        Returns:
            JSON response indicating success or failure.
        """
        if request.method == "POST":
            # Extract data from the incoming JSON request
            data = request.json
            course_id = data.get('course_id')
            user_id = data.get('user_id')  
            announcement = data.get('announcement')
            
            # Validate required fields
            if not course_id or not user_id or not announcement:
                return jsonify({"error": "Missing required fields"}), 400

            try:
                # Post the announcement using the DAO
                response = self._inst_dao.post_announcements(course_id, user_id, announcement)
                if "message" in response:
                    # Success response
                    return jsonify({"message": response["message"]}), 201
                else:
                    # Error response from DAO
                    return jsonify({"error": response["error"]}), 500
            except Exception as e:
                # Handle any unexpected exceptions
                return jsonify({"error": str(e)}), 500
