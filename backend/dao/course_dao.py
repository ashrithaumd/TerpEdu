import dao
from flask import request, jsonify
import os

class CourseDao:
    def __init__(self):
        # Constructor for the CourseDao class
        # This class provides methods to interact with course-related data in the database.
        pass
    
    def create_course(self, course_id, course_name, description, credits, department, semester, is_currently_active=True):
        """
        Inserts a new course into the database.
        
        Args:
            course_id (str): Unique identifier for the course.
            course_name (str): Name of the course.
            description (str): Description of the course.
            credits (int): Number of credits assigned to the course.
            department (str): Department offering the course.
            semester (str): Semester in which the course is offered.
            is_currently_active (bool): Status of whether the course is active (default is True).
        
        SQL Query:
            Inserts a new course into the courses table.
        """
        sql = """
        INSERT INTO courses (course_id, course_name, description, credits, department, semester, is_currently_active)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        """
        params = (course_id, course_name, description, credits, department, semester, is_currently_active)
        dao.execute_query(sql, params)

    def course_materials(self, course_id, material_type, title, file_path, inst_id):
        """
        Inserts course material details into the database.
        
        Args:
            course_id (str): Unique identifier for the course.
            material_type (str): Type of material (e.g., PDF).
            title (str): Title of the course material.
            file_path (str): File path of the uploaded material.
            inst_id (str): Instructor ID who uploaded the material.
        
        SQL Query:
            Inserts material details into the course_materials table.
        """
        sql = """
        INSERT INTO course_materials (course_id, material_type, title, file_path, user_id)
        VALUES (?, ?, ?, ?, ?);
        """
        params = (course_id, material_type, title, file_path, inst_id)
        return dao.execute_query(sql, params)

    def get_course_materials(self, course_id):
        """
        Fetches course materials for a specified course.
        
        Args:
            course_id (str): Unique identifier for the course.
        
        Returns:
            List of tuples containing material details.
        
        SQL Query:
            Selects material details from the course_materials table based on the course ID.
        """
        sql = """
        SELECT material_id, material_type, title, file_path
        FROM course_materials
        WHERE course_id = ?
        """
        params = (course_id,)
        return dao.execute_query(sql, params, fetch=True)
    
    def get_course_materials_by_user(self, user_id):
        """
        Fetches course materials uploaded by a specified user.
        
        Args:
            user_id (str): Unique identifier for the user.
        
        Returns:
            List of tuples containing material details uploaded by the user.
        
        SQL Query:
            Selects materials from the course_materials table based on the user ID.
        """
        sql = """
        SELECT * 
        FROM course_materials
        WHERE user_id = ?
        """
        params = (user_id,)
        return dao.execute_query(sql, params, fetch=True)

    def get_course(self, course_id):
        """
        Fetches the course name for a specified course ID.
        
        Args:
            course_id (str): Unique identifier for the course.
        
        Returns:
            str: The name of the course.
        
        SQL Query:
            Selects the course name from the courses table.
        """
        sql = "SELECT course_name FROM courses WHERE id = ?"
        param = [course_id]
        return dao.execute_query(sql, param)[0][0]
    
    def get_all_courses(self):
        """
        Fetches all courses along with their details such as course name, instructor name, department, and number of enrolled students.
        
        Returns:
            List of tuples containing course details.
        
        SQL Query:
            Joins multiple tables to retrieve comprehensive course details and counts the number of enrolled students.
        """
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
        """
        Fetches all active courses and their associated instructors.
        
        Returns:
            List of tuples containing active course details.
        
        SQL Query:
            Selects details for active courses and joins with instructors to provide instructor information.
        """
        sql = """
        SELECT c.course_id AS CourseID, c.course_name AS CourseName, u.UserID AS InstructorID, u.Name AS InstructorName
        FROM courses c
        LEFT JOIN course_instructors ci ON c.course_id = ci.course_id
        LEFT JOIN users u ON ci.instructor_id = u.UserID
        WHERE c.is_currently_active = 1
        """
        results = dao.execute_query(sql, fetch=True)
        return results
    
    def get_instructors(self):
        """
        Fetches all users who have the role of an instructor.
        
        Returns:
            List of tuples containing instructor details.
        
        SQL Query:
            Selects instructor details from the users table.
        """
        sql = "SELECT UserID AS InstructorID, Name FROM users WHERE Role = 'Instructor'"
        results = dao.execute_query(sql, fetch=True)
        return results

    def assign_instructors(self, assignments):
        """
        Assigns instructors to courses and updates the assignments if they already exist.
        
        Args:
            assignments (dict): Dictionary with course IDs as keys and instructor IDs as values.
        
        SQL Query:
            Inserts or updates course-instructor assignments.
        """
        for course_id, instructor_id in assignments.items():
            sql = """
            INSERT INTO course_instructors (course_id, instructor_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE instructor_id = ?
            """
            params = (course_id, instructor_id, instructor_id)
            dao.execute_query(sql, params=params)
            
    def get_user_counts(self):
        """
        Fetches the count of users based on their roles.
        
        Returns:
            Dictionary mapping roles to their respective counts.
        
        SQL Query:
            Groups and counts users based on their roles in the users table.
        """
        sql = """
        SELECT Role, COUNT(*) as Count
        FROM users
        GROUP BY Role
        """
        results = dao.execute_query(sql, fetch=True)
        return {row[0]: row[1] for row in results}  # Returns a dictionary, e.g., {"Student": 100, "Instructor": 10}
    
    def get_enrolled(self, course_id):
        """
        Fetches the count of students enrolled in a specified course.
        
        Args:
            course_id (str): Unique identifier for the course.
        
        Returns:
            Count of enrolled students.
        
        SQL Query:
            Counts distinct users enrolled in a specific course.
        """
        sql = """
        SELECT COUNT(DISTINCT UserID) AS StudentCount
        FROM stu_enrollments
        WHERE CourseID = ?;
        """
        results = dao.execute_query(sql, (course_id,), fetch=True)  # Executes the query with the course ID.
        return results
    
    def remove_courses(self,course_id):
        sql="""
        DELETE from courses WHERE course_id = ?;
        """
        results =dao.execute_query(sql,(course_id,))
        return results