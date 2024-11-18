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

    def post_announcements(self, course_id, user_id, announcement):
        # Insert announcement data into the announcements table
        sql = """
        INSERT INTO announcements (course_id, UserID, announcement, date_posted)
        VALUES (%s, %s, %s, NOW());
        """
        params = (course_id, user_id, announcement)
        try:
            dao.execute_query(sql, params)
            return {"message": "Announcement posted successfully"}
        except Exception as e:
            # Log the exception or handle accordingly
            print(f"Error posting announcement: {e}")
            return {"error": "Failed to post announcement"}
