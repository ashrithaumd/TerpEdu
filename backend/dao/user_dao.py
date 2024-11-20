import dao
from flask import json

class UserDao:
    def __init__(self):
        # Constructor for the UserDao class, initializing the data access object for user-related operations.
        pass

    def create_users(self, user_id, name, email, password, role):
        """
        Inserts a new user into the users table.
        
        Args:
            user_id (str): Unique identifier for the user.
            name (str): Name of the user.
            email (str): Email address of the user.
            password (str): User's password (assumed to be hashed).
            role (str): Role assigned to the user (e.g., Student, Instructor).
        
        SQL Query:
            Inserts provided user data into the users table, with the current timestamp as the creation date.
        """
        sql = """
        INSERT INTO users (UserID, Name, Email, Password, Role, DateCreated)
        VALUES (%s, %s, %s, %s, %s, NOW());
        """
        params = (user_id, name, email, password, role)
        dao.execute_query(sql, params)

    def additional_info_users(self, user_id, address, phone_number):
        """
        Inserts additional profile information for a user into the Profiles table.
        
        Args:
            user_id (str): Unique identifier for the user.
            address (str): Address of the user.
            phone_number (str): Phone number of the user.
        
        SQL Query:
            Inserts user profile details into the Profiles table.
        """
        sql = """
        INSERT INTO Profiles (UserID, Address, PhoneNumber)
        VALUES (%s, %s, %s);
        """
        params = (user_id, address, phone_number)
        dao.execute_query(sql, params)

    def notifications(self, user_id, message):
        """
        Inserts a notification message for a user.
        
        Args:
            user_id (str): Unique identifier for the user.
            message (str): Notification message to be delivered.
        
        SQL Query:
            Inserts a notification entry into the notifications table for the specified user.
        """
        sql = """
        INSERT INTO notifications (UserID, Message)
        VALUES (%s, %s);
        """
        params = (user_id, message)
        dao.execute_query(sql, params)
    
    def get_notifications_by_course(self, course_id):
        """
        Retrieves notifications associated with a specific course.
        
        Args:
            course_id (str): Unique identifier for the course.
        
        SQL Query:
            Joins notifications with users to retrieve notification details, filtered by course ID.
        
        Returns:
            List of notification details, including notification ID, user ID, message, date sent, and course ID.
        """
        sql = """
        SELECT n.NotificationID, n.UserID, n.Message, n.DateSent, n.course_id, u.role
        FROM notifications n
        JOIN users u ON n.UserID = u.UserID
        WHERE n.course_id = %s
        """
        params = [course_id]
        results = dao.execute_query(sql, params, fetch=True)
        return results

    def get_user(self, user_id):
        """
        Retrieves details of a specific user by user ID.
        
        Args:
            user_id (str): Unique identifier for the user.
        
        SQL Query:
            Fetches all user details from the users table for the specified user ID.
        
        Returns:
            The first result (if found) or None if no user is found.
        """
        sql = "SELECT * FROM users WHERE UserID = %s"
        params = [user_id]
        data = dao.execute_query(sql, params, fetch=True)  # Ensure fetch=True to get results
        
        if data:
            return data[0]
        else:
            return None

    def get_user_by_id_and_password(self, user_id, password):
        """
        Retrieves a user by their user ID and password (used for authentication).
        
        Args:
            user_id (str): Unique identifier for the user.
            password (str): User's password.
        
        SQL Query:
            Selects user details where the UserID and Password match.
        
        Returns:
            User data as JSON if found, otherwise None.
        """
        sql = "SELECT * FROM users WHERE UserID = %s AND Password = %s"
        params = (user_id, password)
        try:
            print(f"Debug: Executing query with params {params}")  # Add debug statement
            result = dao.execute_query(sql, params, fetch=True)
            print(f"Debug: Query result {result}")  # Add debug statement
            if result:
                user_data = {
                    "user_id": result[0][0],
                    "password": result[0][3]
                }
                return json.dumps(user_data)
            else:
                return None
        except Exception as e:
            print(f"Error fetching user: {e}")
            return None

    def get_all_users(self):
        """
        Retrieves all users from the users table.
        
        SQL Query:
            Selects user details (UserID, Name, Email, Role, DateCreated) from the users table.
        
        Returns:
            List of user details or an empty list if no users are found.
        """
        sql = "SELECT UserID, Name, Email, Role, DateCreated FROM users;"
        results = dao.execute_query(sql, fetch=True)
        if results:
            print(f"Debug: Retrieved users: {results}")
        else:
            print("Debug: No users found.")
        return results
