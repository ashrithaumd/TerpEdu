import dao
from datetime import datetime

class StudentDao:
    def __init__(self):
        pass

    # Method to enroll a student in a course
    def enroll_in_course(self, user_id, course_id):
        """
        Enroll a student in a course if the student has not reached the maximum of 3 courses.
        """
        # Check if the student is already enrolled in 3 courses
        sql_check = """
        SELECT COUNT(*) 
        FROM stu_enrollments
        WHERE UserID = %s;
        """
        params_check = (user_id,)
        result = dao.execute_query(sql_check, params_check, fetch=True)

        if result[0][0] >= 3:
            raise Exception("Student cannot enroll in more than 3 courses.")

        # Insert the enrollment record
        sql_insert = """
        INSERT INTO stu_enrollments (UserID, CourseID)
        VALUES (%s, %s);
        """
        params_insert = (user_id, course_id)
        dao.execute_query(sql_insert, params_insert)

    # Method to drop a course for a student
    def drop_course(self, user_id, course_id):
        """
        Remove a student from a course.
        """
        sql = """
        DELETE FROM stu_enrollments
        WHERE UserID = %s AND CourseID = %s;
        """
        params = (user_id, course_id)
        dao.execute_query(sql, params)

    # Method to get all courses a student is enrolled in
    def get_enrolled_courses(self, user_id):
        sql = """
        SELECT c.course_id, c.course_name, c.description, c.credits, c.department, c.semester, c.is_currently_active
        FROM stu_enrollments e
        JOIN courses c ON e.CourseID = c.course_id
        WHERE e.UserID = %s;
        """
        params = (user_id,)
        result = dao.execute_query(sql, params, fetch=True)
        print(f"Enrolled courses for user {user_id}: {result}")
        return result


    # Method to get course details
    def get_course_info(self, course_id):
        """
        Fetch details of a specific course.
        """
        sql = """
        SELECT course_id, course_name, description, credits, department, semester, is_currently_active
        FROM courses
        WHERE course_id = %s;
        """
        params = (course_id,)
        return dao.execute_query(sql, params, fetch=True)

    # Method to get course materials for a specific course
    def get_course_materials(self, course_id):
        """
        Fetch materials associated with a course.
        """
        sql = """
        SELECT material_id, material_type, title, upload_date, file_path
        FROM course_materials
        WHERE course_id = %s;
        """
        params = (course_id,)
        return dao.execute_query(sql, params, fetch=True)

    # Method to get all students enrolled in a specific course
    def get_students_in_course(self, course_id):
        """
        Fetch all students enrolled in a given course.
        """
        sql = """
        SELECT u.UserID, u.Name, u.Email
        FROM stu_enrollments e
        JOIN users u ON e.UserID = u.UserID
        WHERE e.CourseID = %s;
        """
        params = (course_id,)
        return dao.execute_query(sql, params, fetch=True)

    # Method to get all courses with enrollment statistics
    def get_course_enrollments(self):
        """
        Fetch all courses along with the number of students enrolled in each course.
        """
        sql = """
        SELECT c.course_id, c.course_name, c.department, COUNT(e.UserID) AS num_students
        FROM courses c
        LEFT JOIN stu_enrollments e ON c.course_id = e.CourseID
        GROUP BY c.course_id, c.course_name, c.department;
        """
        results = dao.execute_query(sql, fetch=True)
        return results

    def get_course_materials(self, course_id):
        sql = """
        SELECT material_id, material_type, title, file_path
        FROM course_materials
        WHERE course_id = %s;
        """
        params = (course_id,)
        return dao.execute_query(sql, params, fetch=True)

    
    def get_available_courses(self, user_id):
    # Check how many courses the student is enrolled in
        sql_count = """
        SELECT COUNT(*) 
        FROM stu_enrollments 
        WHERE UserID = %s;
        """
        params_count = (user_id,)
        enrolled_count = dao.execute_query(sql_count, params_count, fetch=True)[0][0]

        # If the student has already reached the limit, return no available courses
        if enrolled_count >= 3:
            return []

        # Fetch courses not already enrolled in and that are active
        sql_available = """
        SELECT course_id, course_name
        FROM courses
        WHERE course_id NOT IN (
            SELECT CourseID FROM stu_enrollments WHERE UserID = %s
        ) AND is_currently_active = 1;
        """
        params_available = (user_id,)
        return dao.execute_query(sql_available, params_available, fetch=True)

    def get_announcements(self):
        """
        Retrieves all announcements along with their associated course names, ordered by the date posted in descending order.
        
        Returns:
            list: A list of dictionaries containing course ID, course name, announcement content, and the date posted.
        
        SQL Query:
            Selects course and announcement details from the announcements table, joining with the courses table to retrieve course names.
        """
        sql = """
        SELECT 
            a.course_id, 
            c.course_name, 
            a.announcement, 
            a.date_posted
        FROM 
            announcements a
        INNER JOIN 
            courses c ON a.course_id = c.course_id
        ORDER BY 
            a.date_posted DESC;
        """
        results = dao.execute_query(sql, fetch=True)
        # print(results)# Executes the SQL query and fetches results.
        return [
            {
                "CourseID": result[0],
                "CourseName": result[1],
                "Announcement": result[2],
                "DatePosted": result[3].strftime('%Y-%m-%d %H:%M:%S')
            }
            for result in results
        ]

    def get_course_materials_by_user(self):
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
        FROM course_materials;
        """
        return dao.execute_query(sql, fetch=True)
