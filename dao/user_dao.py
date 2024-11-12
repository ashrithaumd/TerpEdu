import dao


class UserDao:
    def __init__(self):
        pass
    
    def create_users(self):
        sql="""
            CREATE TABLE Users (
            UserID INT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(100),
            Email VARCHAR(100) UNIQUE,
            Password VARCHAR(100),
            Role ENUM('Student', 'Instructor', 'Admin'),
            DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        dao.execute_non_query(sql)
        
    def additional_info_users(self):
        sql="""
        CREATE TABLE Profiles (
        ProfileID INT PRIMARY KEY AUTO_INCREMENT,
        UserID INT,
        Address VARCHAR(255),
        PhoneNumber VARCHAR(20),
        DateOfBirth DATE,
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
        );
        """
        dao.execute_non_query(sql)
        
    def notifications(self):
        sql="""
        CREATE TABLE Notifications (
        NotificationID INT PRIMARY KEY AUTO_INCREMENT,
        UserID INT NOT NULL,
        Message TEXT,
        DateSent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        Status ENUM('Read', 'Unread') DEFAULT 'Unread',
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
        );
        """
        dao.execute_non_query(sql)
    
    def get_user(self, user_id):
        sql = "SELECT * FROM users WHERE id = %s"
        params = [user_id]
        data = dao.execute_query(sql, params)        
        return data[0]
