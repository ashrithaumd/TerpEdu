import dao

class CourseDao:
    def __init__(self):
        pass

    def save_course(self, course_name):
        sql = "INSERT INTO courses(course_name) VALUES (%s)"
        param = (course_name)
        dao.insert_query(sql, param)

    def get_course(self, course_id):
        sql = "SELECT course_name FROM courses WHERE id = %s"
        param = [course_id]
        return dao.execute_query(sql, param)[0][0]