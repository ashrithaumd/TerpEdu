import dao
from flask import json


class UserDao:
    def __init__(self):
        pass

    def create_users(self, user_id, name, email, password, role):
        sql = """
        INSERT INTO users (UserID, Name, Email, Password, Role,DateCreated)
        VALUES (%s, %s, %s, %s,%s,NOW());
        """
        params = (user_id, name, email, password, role)
        dao.execute_query(sql, params)


    def additional_info_users(self, user_id, address, phone_number):
        sql = """
        INSERT INTO Profiles (UserID, Address, PhoneNumber)
        VALUES (%s, %s, %s);
        """
        params = (user_id, address, phone_number)
        dao.execute_query(sql, params)

    def notifications(self, user_id, message):
        sql = """
        INSERT INTO Notifications (UserID, Message)
        VALUES (%s, %s);
        """
        params = (user_id, message)
        dao.execute_query(sql, params)
    
    def get_all_notifications(self):
            sql = """
                SELECT * FROM notifications;
                """
            results = dao.execute_query(sql,fetch=True)  
            return results


    def get_user(self, user_id):
        sql = "SELECT * FROM Users WHERE UserID = %s"
        params = [user_id]
        data = dao.execute_query(sql, params, fetch=True)  # Ensure fetch=True to get results
        
        if data:  # Check if data is not None or empty
            return data[0]
        else:
            return None

    def get_user_by_id_and_password(self, user_id, password):
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
        sql = "SELECT UserID, Name, Email, Role, DateCreated FROM users;"
        results = dao.execute_query(sql, fetch=True)
        if results:
            print(f"Debug: Retrieved users: {results}")  # Debug statement
        else:
            print("Debug: No users found.")
        return results

