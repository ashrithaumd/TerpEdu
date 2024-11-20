from dao.student_dao import StudentDao
from flask import jsonify, request

class StudentController:
    def __init__(self):
        self._student_dao = StudentDao()

    def enroll(self):
        data = request.json
        user_id = data.get("user_id")
        course_id = data.get("course_id")

        if not user_id or not course_id:
            return jsonify({"status": "error", "error": "Missing user_id or course_id"}), 400

        try:
            self._student_dao.enroll_in_course(user_id, course_id)
            return jsonify({"status": "success", "message": "Enrollment successful"}), 200
        except Exception as e:
            return jsonify({"status": "error", "error": str(e)}), 500


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
        # Fetch enrolled courses for a student
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({"error": "Missing user_id"}), 400

        try:
            courses = self._student_dao.get_enrolled_courses(user_id)
            return jsonify(courses), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_course_materials(self):
        # Get materials for a course
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
            return jsonify({"error": "Missing userID"}), 400

        try:
            enrolled_courses = self._student_dao.get_enrolled_courses(userID)
            available_courses = self._student_dao.get_available_courses(userID)

            # Format enrolled_courses properly
            enrolled_courses = [
                {"course_id": course[0], "course_name": course[1]}
                for course in enrolled_courses
            ]

            available_courses = [
                {"course_id": course[0], "course_name": course[1]}
                for course in available_courses
            ]

            return jsonify({
                "enrolled_courses": enrolled_courses,
                "available_courses": available_courses
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    def get_announcements(self):
        try:
            announcements = self._student_dao.get_announcements()
            return jsonify({"status": "success", "announcements": announcements})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    def get_material(self):
        try:
            materials = self._student_dao.get_course_materials_by_user()
            if not materials:
                return jsonify({"message": "No materials found for the specified user."}), 404

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
            return jsonify({"error": f"Failed to retrieve materials: {str(e)}"}), 500
