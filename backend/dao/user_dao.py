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
        data = dao.execute_query(sql, params)        
        return data[0]

    def get_user_by_id_and_password(self, user_id, password):
        sql = "SELECT * FROM users WHERE UserID = %s AND Password = %s"
        params = (user_id, password)
        try:
            result = dao.execute_query(sql, params, fetch=True)
            if result:
                # Convert result to a dictionary and return it as JSON
                user_data = {
                    "user_id": result[0][0],  
                    "password": result[0][3],    
                }
                return json.dumps(user_data)
            else:
                return None
        except Exception as e:
            print(f"Error fetching user: {e}")
            return None
