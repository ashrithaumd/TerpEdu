from flask import Blueprint
from controller.student_controller import StudentController

student_controller = StudentController()

student_bp = Blueprint("student_bp", __name__)

# Routes
student_bp.route('/enroll', methods=['POST'])(student_controller.enroll)
student_bp.route('/drop', methods=['POST'])(student_controller.drop)
student_bp.route('/dashboard/<userID>', methods=['GET'])(student_controller.dashboard)
student_bp.route('/course-materials', methods=['GET'])(student_controller.get_course_materials)
student_bp.route('/uploaded_materials', methods=["POST", "GET"])(student_controller.get_material)
student_bp.route('/get_enrolled_students/<course_id>', methods=['GET'])(student_controller.get_enrolled_courses)
