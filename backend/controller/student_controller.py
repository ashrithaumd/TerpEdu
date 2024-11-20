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
