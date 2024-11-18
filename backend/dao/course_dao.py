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

    def get_course_materials(self, course_id):
        sql = """
        SELECT material_id, material_type, title, file_path
        FROM course_materials
        WHERE course_id = %s
        """
        params = (course_id,)
        return dao.execute_query(sql, params, fetch=True)
    
    def get_course_materials_by_user(self,user_id):
        sql="""
        SELECT * 
        FROM course_materials
        WHERE user_id = %s
        """
        params = (user_id,)
        return dao.execute_query(sql,params,fetch=True)
    
    def get_course(self, course_id):
        sql = "SELECT course_name FROM courses WHERE id = %s"
        param = [course_id]
        return dao.execute_query(sql, param)[0][0]
    
    
    def get_all_courses(self):
       sql = """
       SELECT 
        c.course_name, 
        u.Name AS instructor_name, 
        c.department, 
        COUNT(e.UserID) AS num_students
    FROM 
        courses c
    LEFT JOIN 
        course_instructors ci ON c.course_id = ci.course_id
    LEFT JOIN 
        users u ON ci.instructor_id = u.UserID
    LEFT JOIN 
        enrollments e ON c.course_id = e.CourseID
    GROUP BY 
        c.course_id, c.course_name, u.Name, c.department;

       """
       results = dao.execute_query(sql, fetch=True)
       return results
   
    def get_active_courses(self):
        sql = """
        SELECT c.id AS CourseID, c.course_name AS CourseName, u.UserID AS InstructorID, u.Name AS InstructorName
        FROM courses c
        LEFT JOIN course_instructors ci ON c.id = ci.course_id
        LEFT JOIN users u ON ci.instructor_id = u.UserID
        WHERE c.is_currently_active = 1
        """
        results = dao.execute_query(sql, fetch=True)
        return results
    
    def get_instructors(self):
        sql = "SELECT UserID AS InstructorID, Name FROM users WHERE Role = 'Instructor'"
        results = dao.execute_query(sql, fetch=True)
        return results

    def assign_instructors(self, assignments):
        for course_id, instructor_id in assignments.items():
            sql = """
            INSERT INTO course_instructors (course_id, instructor_id)
            VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE instructor_id = %s
            """
            params = (course_id, instructor_id, instructor_id)
            dao.execute_query(sql, params=params)


