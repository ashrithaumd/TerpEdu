from dao.course_dao import CourseDao


class CourseController:
    def __init__(self):
        self._course_dao = CourseDao()

    def create(self):
        self._course_dao.save_course("test")
        return "saved"
    
    def create_courses_table(self):
        return self._course_dao.create_courses_table()
    
    def create_course_materials_table(self):
        return self._course_dao.create_course_materials_table()
    
    def get_course(self, course_id):
        return self._course_dao.get_course(course_id)
    