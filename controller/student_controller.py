# student_controller.py
from flask import jsonify, request
from ..dao.student_dao import StudentDao

student_dao = StudentDao()

def get_enrolled_courses():
    user_id = request.args.get('user_id')  
    try:
        courses = student_dao.get_enrolled_courses(user_id)
        return jsonify({"enrolled_courses": courses}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_course_materials():
    course_id = request.args.get('course_id') 
    
    try:
        materials = student_dao.get_course_materials(course_id)
        return jsonify({"course_materials": materials}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_course_info():
    course_id = request.args.get('course_id')  
    
    try:
        course_info = student_dao.get_course_info(course_id)
        return jsonify({"course_info": course_info}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
