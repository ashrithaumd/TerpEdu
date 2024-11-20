import dao
from flask import request, jsonify
import os

class CourseDao:
    def __init__(self):
        # Constructor for the CourseDao class
        pass
    
    def create_course(self, course_id, course_name, description, credits, department, semester, is_currently_active=True):
        sql = """
        INSERT INTO courses (course_id, course_name, description, credits, department, semester, is_currently_active)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        """
        params = (course_id, course_name, description, credits, department, semester, is_currently_active)
        dao.execute_query(sql, params)

    def course_materials(self, course_id, material_type, title, file_path, inst_id):
        sql = """
        INSERT INTO course_materials (course_id, material_type, title, file_path, user_id)
        VALUES (?, ?, ?, ?, ?);
        """
        params = (course_id, material_type, title, file_path, inst_id)
        return dao.execute_query(sql, params)

    def get_course_materials(self, course_id):
        sql = """
        SELECT course_id, material_type, title, file_path
        FROM course_materials
        WHERE course_id = ?;
        """
        params = (course_id,)
        result= dao.execute_query(sql, params, fetch=True)
        # print ("dao result",result)
        return result
    
    def get_course_materials_by_user(self, user_id):
        sql = """
        SELECT * 
        FROM course_materials
        WHERE user_id = ?;  
        """
        params = (user_id,)
        return dao.execute_query(sql, params, fetch=True)

    def get_course(self, course_id):
        sql = "SELECT course_name FROM courses WHERE course_id = ?"  # Ensure column name is course_id
        param = [course_id]
        result= dao.execute_query(sql, param)[0][0]
        # print("dao result",result)
        return result
    
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
        """
        Fetch active courses with assigned instructors (if any).
        """
        sql = """
        SELECT 
            c.course_id AS CourseID, 
            c.course_name AS CourseName, 
            ci.instructor_id AS InstructorID,
            u.Name AS InstructorName
        FROM 
            courses c
        LEFT JOIN 
            course_instructors ci ON c.course_id = ci.course_id
        LEFT JOIN 
            users u ON ci.instructor_id = u.UserID
        WHERE 
            c.is_currently_active = 1;
        """
        results = dao.execute_query(sql, fetch=True)
        return results

    
    def get_instructors(self):
        sql = "SELECT UserID AS InstructorID, Name FROM users WHERE Role = 'Instructor'"
        results = dao.execute_query(sql, fetch=True)
        return results

    def assign_instructors(self, assignments):
        """
        Assign instructors to courses, updating existing records or inserting new ones.
        """
        try:
            for course_id, instructor_id in assignments.items():
                try:
                    # Check if the record exists
                    check_sql = """
                    SELECT COUNT(*) FROM course_instructors WHERE course_id = ?
                    """
                    result = dao.execute_query(check_sql, params=(course_id,), fetch=True)

                    # Default to exists = 0 if result is unexpected
                    exists = result[0][0] if result and len(result) > 0 else 0

                    if exists > 0:
                        # Update if the record exists
                        update_sql = """
                        UPDATE course_instructors
                        SET instructor_id = ?
                        WHERE course_id = ?
                        """
                        dao.execute_query(update_sql, params=(instructor_id, course_id))
                        print(f"Updated course_id {course_id} with instructor_id {instructor_id}")
                    else:
                        # Insert if the record does not exist
                        insert_sql = """
                        INSERT INTO course_instructors (course_id, instructor_id)
                        VALUES (?, ?)
                        """
                        dao.execute_query(insert_sql, params=(course_id, instructor_id))
                        print(f"Inserted course_id {course_id} with instructor_id {instructor_id}")

                except Exception as query_error:
                    # Log and skip to the next course on failure
                    print(f"Error processing course_id {course_id}: {query_error}")

            # Confirm all assignments are completed without errors
            print("All instructor assignments processed successfully.")
            return {"message": "Assignments saved successfully"}

        except Exception as e:
            # Log and raise a meaningful error if something unexpected happens
            print(f"Unexpected error in assign_instructors: {e}")
            raise Exception(f"Failed to assign instructors: {e}")



            
    # def get_user_counts(self):
    #     sql = """
    #     SELECT Role, COUNT(*) as Count
    #     FROM users
    #     GROUP BY Role;
    #     """
    #     results = dao.execute_query(sql, fetch=True)
    #     return {row[0]: row[1] for row in results}
    
    def get_user_counts(self):
        sql = """
        SELECT Role, COUNT(*) as Count
        FROM users
        GROUP BY Role;
        """
        try:
            results = dao.execute_query(sql, fetch=True)  # No params required
            return {row[0]: row[1] for row in results}
        except Exception as e:
            print(f"Database operation failed: {e}")
            return {}

    
    def get_enrolled(self, course_id):
        sql = """
        SELECT COUNT(DISTINCT user_id) AS StudentCount  -- Use user_id, not UserID
        FROM stu_enrollments
        WHERE course_id = ?;
        """
        results = dao.execute_query(sql, (course_id,), fetch=True)
        return results
    
    def remove_courses(self, course_id):
        sql = """
        DELETE FROM courses WHERE course_id = ?;
        """
        results = dao.execute_query(sql, (course_id,))
        return results
