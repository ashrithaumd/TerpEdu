import dao

class InstDao:
    def __init__(self):
        # Constructor for InstDao class which provides data access methods for instructor-related operations.
        pass

    def fetch_courses_for_instructor(self, instructor_id):
        """
        Retrieves courses assigned to a specific instructor.
        
        Args:
            instructor_id (str): Unique identifier for the instructor.
        
        Returns:
            List of tuples containing course details (course_id, course_name, description, department).
        
        SQL Query:
            Joins the courses table with course_instructors to fetch courses associated with the instructor.
        """
        sql = """
        SELECT c.course_id, c.course_name, c.description, c.department
        FROM courses c
        INNER JOIN course_instructors ci ON c.course_id = ci.course_id
        WHERE ci.instructor_id = %s
        """
        results = dao.execute_query(sql, (instructor_id,), fetch=True)
        return results

    def post_announcements(self, course_id, user_id, announcement):
        """
        Posts an announcement for a specific course.
        
        Args:
            course_id (str): Unique identifier for the course.
            user_id (str): Unique identifier for the user.
            announcement (str): The announcement content.
        
        SQL Query:
            Inserts a new announcement into the announcements table with the current timestamp.
        
        Returns:
            A dictionary indicating success or failure of the operation.
        """
        sql = """
        INSERT INTO announcements (course_id, UserID, announcement, date_posted)
        VALUES (%s, %s, %s, NOW());
        """
        params = (course_id, user_id, announcement)
        try:
            dao.execute_query(sql, params)
            return {"message": "Announcement posted successfully"}
        except Exception as e:
            # Handle any exceptions that occur during the database operation
            print(f"Error posting announcement: {e}")
            return {"error": "Failed to post announcement"}
