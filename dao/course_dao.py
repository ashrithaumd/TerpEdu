import dao

class CourseDao:
    def __init__(self):
        pass
    
    def courses(self, course_name, description, credits, department, semester, is_currently_active=True):
        sql = """
        INSERT INTO courses (course_name, description, credits, department, semester, is_currently_active)
        VALUES (%s, %s, %s, %s, %s, %s);
        """
        params = (course_name, description, credits, department, semester, is_currently_active)
        dao.execute_query(sql, params)

    def course_materials(self, course_id, material_type, title, file_path):
        sql = """
        INSERT INTO course_materials (course_id, material_type, title, file_path)
        VALUES (%s, %s, %s, %s);
        """
        params = (course_id, material_type, title, file_path)
        dao.execute_query(sql, params)

    def get_course(self, course_id):
        sql = "SELECT course_name FROM courses WHERE id = %s"
        param = [course_id]
        return dao.execute_query(sql, param)[0][0]
