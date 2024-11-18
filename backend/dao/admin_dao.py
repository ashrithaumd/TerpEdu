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
    

    def get_announcements(self):
        sql = """
    SELECT 
    a.course_id, 
    c.course_name, 
    a.announcement, 
    a.date_posted
FROM 
    announcements a
INNER JOIN 
    courses c ON a.course_id = c.course_id
ORDER BY 
    a.date_posted DESC;

    """
        results = dao.execute_query(sql, fetch=True)
        return [
            {
                "CourseID": result[0],
                "CourseName": result[1],
                "Announcement": result[2],
                "DatePosted": result[3].strftime('%Y-%m-%d %H:%M:%S')
            }
            for result in results
        ]
