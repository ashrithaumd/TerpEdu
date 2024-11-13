# admin_controller.py
from flask import jsonify, request
from dao.admin_dao import AdminDao

admin_dao = AdminDao()

def enroll_user():
    data = request.json
    user_id = data.get('user_id')
    course_id = data.get('course_id')
    status = data.get('status', 'Active')  
    
    try:
        admin_dao.enrollment(user_id, course_id, status)
        return jsonify({"message": "User enrolled successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def assign_instructor():
    data = request.json
    course_id = data.get('course_id')
    instructor_id = data.get('instructor_id')
    
    try:
        admin_dao.assign_course(course_id, instructor_id)
        return jsonify({"message": "Instructor assigned successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
