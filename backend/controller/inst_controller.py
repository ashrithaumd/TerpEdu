from flask import render_template,request,jsonify
from dao.inst_dao import InstDao

class InstController:
    def __init__(self):
        self._inst_dao = InstDao()
        
    def get_courses_by_instructor(self,instructor_id):
        result= self._inst_dao.fetch_courses_for_instructor(instructor_id)
        response = [
            {
                "course_ID": i[0],
                "name": i[1],
                "description": i[2],
                "department" : i[3]
            }
            for i in result
        ]
        # print(response)
        return response
    
    def post_announcement(self):
        if request.method == "POST":
            data = request.json
            course_id = data.get('course_id')
            user_id = data.get('user_id')  
            announcement = data.get('announcement')
            if not course_id or not user_id or not announcement:
                return jsonify({"error": "Missing required fields"}), 400

            try:
                response = self._inst_dao.post_announcements(course_id, user_id, announcement)
                if "message" in response:
                    return jsonify({"message": response["message"]}), 201
                else:
                    return jsonify({"error": response["error"]}), 500
            except Exception as e:
                return jsonify({"error": str(e)}), 500