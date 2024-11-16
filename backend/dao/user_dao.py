import dao

class UserDao:
    def __init__(self):
        pass

    def create_users(self, name, email, password, role):
        sql = """
        INSERT INTO Users (Name, Email, Password, Role, DateCreated)
        VALUES (%s, %s, %s, %s, NOW());
        """
        params = (name, email, password, role)
        dao.execute_sql(sql, params)        

    def additional_info_users(self, user_id, address, phone_number, date_of_birth):
        sql = """
        INSERT INTO Profiles (UserID, Address, PhoneNumber, DateOfBirth)
        VALUES (%s, %s, %s, %s);
        """
        params = (user_id, address, phone_number, date_of_birth)
        dao.execute_sql(sql, params)

    def notifications(self, user_id, message):
        sql = """
        INSERT INTO Notifications (UserID, Message)
        VALUES (%s, %s);
        """
        params = (user_id, message)
        dao.execute_sql(sql, params)

    def get_user(self, user_id):
        sql = "SELECT * FROM Users WHERE UserID = %s"
        params = [user_id]
        return dao.execute_sql(sql, params, fetch=True)

    def get_user_by_id_and_password(self, user_id, password):
        # Modified function to use UserID and password for login
        sql = "SELECT * FROM Users WHERE UserID = %s AND Password = %s"
        params = (user_id, password)        
        return dao.execute_sql(sql, params, fetch=True)
    