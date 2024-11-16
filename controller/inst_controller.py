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
