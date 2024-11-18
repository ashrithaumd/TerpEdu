import dao

class UserDao:
    def __init__(self):
        pass

    def create_users(self, name, email, password, role):
        sql = """
        INSERT INTO users (Name, Email, Password, Role, DateCreated)
        VALUES (%s, %s, %s, %s, NOW());
        """
        params = (name, email, password, role)
        dao.execute_query(sql, params)

    def additional_info_users(self, user_id, address, phone_number, date_of_birth):
        sql = """
        INSERT INTO Profiles (UserID, Address, PhoneNumber, DateOfBirth)
        VALUES (%s, %s, %s, %s);
        """
        params = (user_id, address, phone_number, date_of_birth)
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
        results = dao.execute_query(sql, fetch=True)
        return [dict(zip(result.keys(), result)) for result in results]

    def get_user(self, user_id):
        sql = "SELECT * FROM users WHERE UserID = %s"
        params = [user_id]
        results = dao.execute_query(sql, params, fetch=True)
        return [dict(zip(result.keys(), result)) for result in results]

    def get_user_by_id_and_password(self, user_id, password):
        sql = "SELECT * FROM users WHERE UserID = %s AND Password = %s"
        params = (user_id, password)
        results = dao.execute_query(sql, params, fetch=True)
    
        if results:
           return results[0]  # Returning the first result directly, as it was before
        else:
           return None
       
    def get_all_users(self):
        sql = "SELECT UserID, Name, Email, Role, DateCreated FROM users;"
        results = dao.execute_query(sql, fetch=True)
        return results

    