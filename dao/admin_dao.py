import dao

class AdminDao:
    def __init__(self):
        pass
    
    def enrollment(self, user_id, course_id, status='Active'):
        sql = """
        INSERT INTO enrollments (UserID, CourseID, Status)
        VALUES (%s, %s, %s);
        """
        params = (user_id, course_id, status)
        dao.execute_query(sql, params)
    
    def assign_course(self, course_id, instructor_id):
        sql = """
        INSERT INTO course_instructors (course_id, instructor_id)
        VALUES (%s, %s);
        """
        params = (course_id, instructor_id)
        dao.execute_query(sql, params)
