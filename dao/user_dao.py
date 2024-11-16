import mysql.connector

class UserDao:
    def __init__(self):
        # Set up the connection here in the constructor
        self.connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="your_password",
            database="terpedu"
        )
        self.cursor = self.connection.cursor()

    def create_users(self, name, email, password, role):
        sql = """
        INSERT INTO Users (Name, Email, Password, Role, DateCreated)
        VALUES (%s, %s, %s, %s, NOW());
        """
        params = (name, email, password, role)
        self.cursor.execute(sql, params)
        self.connection.commit()

    def additional_info_users(self, user_id, address, phone_number, date_of_birth):
        sql = """
        INSERT INTO Profiles (UserID, Address, PhoneNumber, DateOfBirth)
        VALUES (%s, %s, %s, %s);
        """
        params = (user_id, address, phone_number, date_of_birth)
        self.cursor.execute(sql, params)
        self.connection.commit()

    def notifications(self, user_id, message):
        sql = """
        INSERT INTO Notifications (UserID, Message)
        VALUES (%s, %s);
        """
        params = (user_id, message)
        self.cursor.execute(sql, params)
        self.connection.commit()

    def get_user(self, user_id):
        sql = "SELECT * FROM Users WHERE UserID = %s"
        params = [user_id]
        self.cursor.execute(sql, params)
        data = self.cursor.fetchone()
        return data

    def get_user_by_id_and_password(self, user_id, password):
        # Modified function to use UserID and password for login
        sql = "SELECT * FROM Users WHERE UserID = %s AND Password = %s"
        params = (user_id, password)
        self.cursor.execute(sql, params)
        user = self.cursor.fetchone()
        return user

    def __del__(self):
        # Close the cursor and connection when the object is destroyed
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
