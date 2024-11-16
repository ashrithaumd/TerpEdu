import dao

class StudentDao:
    def __init__(self):
        pass

    def get_enrolled_courses(self, user_id):
        sql = """
        SELECT c.id, c.course_name, c.description, c.credits, c.department, c.semester, c.is_currently_active
        FROM enrollments e
        JOIN courses c ON e.CourseID = c.id
        WHERE e.UserID = %s AND e.Status = 'Active';
        """
        params = (user_id,)
        return dao.execute_sql(sql, params, fetch=True)

    def get_course_materials(self, course_id):
        sql = """
        SELECT material_id, material_type, title, upload_date, file_path
        FROM course_materials
        WHERE course_id = %s;
        """
        params = (course_id,)
        return dao.execute_sql(sql, params, fetch=True)

    def get_course_info(self, course_id):
        sql = """
        SELECT id, course_name, description, credits, department, semester, is_currently_active
        FROM courses
        WHERE id = %s;
        """
        params = (course_id,)
        return dao.execute_sql(sql, params, fetch=True)
