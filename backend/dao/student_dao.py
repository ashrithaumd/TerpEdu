import dao

class StudentDao:
    def __init__(self):
        # Constructor for the StudentDao class responsible for data access methods related to student operations.
        pass

    def get_enrolled_courses(self, user_id):
        """
        Retrieves a list of active courses in which a user is enrolled.
        
        Args:
            user_id (str): The unique identifier of the student/user.
        
        Returns:
            List of tuples containing course details (id, course_name, description, credits, department, semester, is_currently_active).
        
        SQL Query:
            Joins the enrollments table with the courses table to fetch information about courses where the user is actively enrolled.
        """
        sql = """
        SELECT c.id, c.course_name, c.description, c.credits, c.department, c.semester, c.is_currently_active
        FROM enrollments e
        JOIN courses c ON e.CourseID = c.id
        WHERE e.UserID = %s AND e.Status = 'Active';
        """
        params = (user_id,)
        return dao.execute_sql(sql, params, fetch=True)

    def get_course_materials(self, course_id):
        """
        Retrieves the list of course materials for a specific course.
        
        Args:
            course_id (str): The unique identifier of the course.
        
        Returns:
            List of tuples containing course material details (material_id, material_type, title, upload_date, file_path).
        
        SQL Query:
            Selects all course materials associated with the given course_id.
        """
        sql = """
        SELECT material_id, material_type, title, upload_date, file_path
        FROM course_materials
        WHERE course_id = %s;
        """
        params = (course_id,)
        return dao.execute_sql(sql, params, fetch=True)

    def get_course_info(self, course_id):
        """
        Retrieves detailed information about a specific course.
        
        Args:
            course_id (str): The unique identifier of the course.
        
        Returns:
            Tuple containing course details (id, course_name, description, credits, department, semester, is_currently_active).
        
        SQL Query:
            Selects course information based on the provided course_id.
        """
        sql = """
        SELECT id, course_name, description, credits, department, semester, is_currently_active
        FROM courses
        WHERE id = %s;
        """
        params = (course_id,)
        return dao.execute_sql(sql, params, fetch=True)
