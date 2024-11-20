# student_controller.py
from flask import jsonify, request
from dao.student_dao import StudentDao

# Instantiate a StudentDao object for database interaction
student_dao = StudentDao()

def get_enrolled_courses():
    """
    Retrieve courses a student is enrolled in based on their user ID.
    The user ID is passed as a query parameter.
    Returns:
        JSON response containing a list of enrolled courses or an error message.
    """
    user_id = request.args.get('user_id')  # Extract user ID from request arguments
    try:
        # Fetch enrolled courses from the DAO using the user ID
        courses = student_dao.get_enrolled_courses(user_id)
        return jsonify({"enrolled_courses": courses}), 200  # Return list of courses with a success status
    except Exception as e:
        # Handle any exceptions and return an error response
        return jsonify({"error": str(e)}), 500


def get_course_materials():
    """
    Retrieve course materials for a given course.
    The course ID is passed as a query parameter.
    Returns:
        JSON response containing a list of course materials or an error message.
    """
    course_id = request.args.get('course_id')  # Extract course ID from request arguments
    
    try:
        # Fetch course materials from the DAO using the course ID
        materials = student_dao.get_course_materials(course_id)
        return jsonify({"course_materials": materials}), 200  # Return list of materials with a success status
    except Exception as e:
        # Handle any exceptions and return an error response
        return jsonify({"error": str(e)}), 500


def get_course_info():
    """
    Retrieve detailed information about a specific course.
    The course ID is passed as a query parameter.
    Returns:
        JSON response containing course details or an error message.
    """
    course_id = request.args.get('course_id')  # Extract course ID from request arguments
    
    try:
        # Fetch course information from the DAO using the course ID
        course_info = student_dao.get_course_info(course_id)
        return jsonify({"course_info": course_info}), 200  # Return course information with a success status
    except Exception as e:
        # Handle any exceptions and return an error response
        return jsonify({"error": str(e)}), 500
