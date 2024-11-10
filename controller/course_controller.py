from dao.course_dao import CourseDao


class CourseController:
    def __init__(self):
        self._course_dao = CourseDao()

    def create(self):
        self._course_dao.save_course("test")
        return "saved"
    
    def get_course(self, course_id):
        return self._course_dao.get_course(course_id)
    