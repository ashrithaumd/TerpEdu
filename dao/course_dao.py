import dao

class CourseDao:
    def __init__(self):
        pass

    def create_courses_table(self):
        sql = """
        CREATE TABLE IF NOT EXISTS courses (
            id INT PRIMARY KEY AUTO_INCREMENT,
            course_name VARCHAR(100) NOT NULL,
            description TEXT,
            credits INT,
            department VARCHAR(50),
            semester ENUM('Fall', 'Spring', 'Summer'),
            is_currently_active BOOLEAN DEFAULT TRUE
        );
        """
        dao.execute_non_query(sql)

    def create_course_materials_table(self):
        sql = """
        CREATE TABLE IF NOT EXISTS course_materials (
            material_id INT PRIMARY KEY AUTO_INCREMENT,
            course_id INT NOT NULL,
            material_type ENUM('PDF', 'Video', 'Document', 'Image') NOT NULL,
            title VARCHAR(100),
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            file_path VARCHAR(255),
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        );
        """
        dao.execute_query(sql)


    def get_course(self, course_id):
        sql = "SELECT course_name FROM courses WHERE id = %s"
        param = [course_id]
        return dao.execute_query(sql, param)[0][0]
