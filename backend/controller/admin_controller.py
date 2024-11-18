# admin_controller.py
from flask import jsonify, request
from dao.admin_dao import AdminDao

class AdminController:
    def __init__(self):
        self.admin_dao = AdminDao()

    def enroll_user(self):
        data = request.json
        user_id = data.get('user_id')
        course_id = data.get('course_id')
        status = data.get('status', 'Active')

        try:
            self.admin_dao.enrollment(user_id, course_id, status)
            return jsonify({"message": "User enrolled successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    
    def get_announcements(self):
        try:
            announcements = self.admin_dao.get_announcements()
            return jsonify(announcements), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
