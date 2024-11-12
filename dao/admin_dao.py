import dao


class AdminDao:
    def __init__(self):
        pass
    
    def enrollment(self):
        sql="""
        CREATE TABLE Enrollments (
        EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
        UserID INT,
        CourseID INT,
        EnrollmentDate DATE DEFAULT CURRENT_DATE,
        Status ENUM('Active', 'Dropped') DEFAULT 'Active',
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
        FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE
        );
        """
        dao.execute_non_query(sql)
    
    def assign_course(self):
        sql="""
        CREATE TABLE IF NOT EXISTS course_instructors (
        course_id INT,
        instructor_id INT,
        FOREIGN KEY (course_id) REFERENCES courses(id),
        FOREIGN KEY (instructor_id) REFERENCES instructors(id),
        PRIMARY KEY (course_id, instructor_id)
        );
        """
        dao.execute_non_query(sql)
