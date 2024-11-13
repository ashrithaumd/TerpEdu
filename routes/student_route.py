# student_route.py
from flask import Blueprint
from controller.student_controller import get_enrolled_courses, get_course_materials, get_course_info


student_bp = Blueprint('student_bp', __name__)

@student_bp.route('/enrolled-courses', methods=['GET'])
def enrolled_courses_route():
    return get_enrolled_courses()

@student_bp.route('/course-materials', methods=['GET'])
def course_materials_route():
    return get_course_materials()

@student_bp.route('/course-info', methods=['GET'])
def course_info_route():
    return get_course_info()
