import dao

class InstDao:
    def __init__(self):
        pass

    def fetch_courses_for_instructor(self,instructor_id):
        sql = """
        SELECT c.course_id, c.course_name, c.description, c.department
        FROM courses c
        INNER JOIN course_instructors ci ON c.course_id = ci.course_id
        WHERE ci.instructor_id = %s
        """
        results = dao.execute_query(sql, (instructor_id,), fetch=True)
        return results
