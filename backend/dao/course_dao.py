import dao
from flask import request,jsonify
import os

class CourseDao:
    def __init__(self):
        pass
    
    def create_course(self,course_id, course_name, description, credits, department, semester, is_currently_active=True):
        sql = """
        INSERT INTO courses (course_id, course_name, description, credits, department, semester, is_currently_active)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
        """
        params = (course_id, course_name, description, credits, department, semester, is_currently_active)
        dao.execute_query(sql, params)


    def course_materials(self, course_id, material_type, title, file_path,inst_id):
        sql = """
        INSERT INTO course_materials (course_id, material_type, title, file_path,user_id)
        VALUES (%s, %s, %s, %s,%s);
        """
        params = (course_id, material_type, title, file_path,inst_id)
        return dao.execute_query(sql, params)

    def get_course(self, course_id):
        sql = "SELECT course_name FROM courses WHERE id = %s"
        param = [course_id]
        return dao.execute_query(sql, param)[0][0]
    
    def get_course_materials(self, course_id):
        sql = """
        SELECT material_id, material_type, title, file_path
        FROM course_materials
        WHERE course_id = %s
        """
        params = (course_id,)
        return dao.execute_query(sql, params, fetch=True)

            
