import dao

class AdminDao:
    def __init__(self):
        # Constructor for the AdminDao class
        # This class interacts with the database to handle administrative operations.
        pass
    
    def enrollment(self, user_id, course_id, status='Active'):
        """
        Enrolls a user in a specified course with a given status.
        
        Args:
            user_id (str): The ID of the user to be enrolled.
            course_id (str): The ID of the course in which to enroll the user.
            status (str, optional): The enrollment status (default is 'Active').

        SQL Query:
            Inserts a new record into the enrollments table.
        """
        sql = """
        INSERT INTO enrollments (UserID, CourseID, Status)
        VALUES (?, ?, ?);
        """
        params = (user_id, course_id, status)
        dao.execute_query(sql, params)  # Executes the query using provided parameters.
    

    def get_announcements(self):
        """
        Retrieves all announcements along with their associated course names, ordered by the date posted in descending order.
        
        Returns:
            list: A list of dictionaries containing course ID, course name, announcement content, and the date posted.
        """
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
        try:
            results = dao.execute_query(sql, fetch=True)
            if not results:
                return []

            announcements = []
            for result in results:
                # Handle date formatting properly
                date_posted = result[3]
                if isinstance(date_posted, str):
                    # If it's already a string, use it directly
                    formatted_date = date_posted
                elif date_posted is not None:
                    # Format datetime objects to a readable string
                    formatted_date = date_posted.strftime('%Y-%m-%d %H:%M:%S')
                else:
                    # Handle NULL dates
                    formatted_date = "N/A"

                announcements.append({
                    "CourseID": result[0],
                    "CourseName": result[1],
                    "Announcement": result[2],
                    "DatePosted": formatted_date,
                })

            return announcements
        except Exception as e:
            print(f"Error in get_announcements: {e}")
            raise Exception(f"Failed to fetch announcements: {e}")



   


        
