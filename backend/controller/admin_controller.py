from dao.admin_dao import AdminDao
from flask import request,jsonify

class AdminController:
    def __init__(self):
        self.admin_dao = AdminDao()

    def enrollment(self, user_id, course_id, status='Active'):
        try:
            self.admin_dao.enrollment(user_id, course_id, status)
            return {"status": "success", "message": "User enrolled successfully."}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def get_announcements(self):
        try:
            announcements = self.admin_dao.get_announcements()
            return {"status": "success", "announcements": announcements}
        except Exception as e:
            return {"status": "error", "message": str(e)}
        
    def assign_instructor(self):
        data = request.json
        course_id = data.get('course_id')
        instructor_id = data.get('instructor_id')
        
        try:
            self.admin_dao.assign_course(course_id, instructor_id)
            return jsonify({"message": "Instructor assigned successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def enroll_user(self):
        data=request.json
        user_id=data.get('user_id')
        course_id=data.get('course_id')
        status=data.get('status','Active')
        try:
            self.admin_dao.enrollment(user_id, course_id, status)
            return {"status": "success", "message": "User enrolled successfully."}
        except Exception as e:
            return jsonify({"error":str(e)}),500