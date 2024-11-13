from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(100), unique=True, nullable=False)
    Password = db.Column(db.String(100), nullable=False)
    Role = db.Column(db.Enum('Student', 'Instructor', 'Admin', name='role_enum'), nullable=False)
    DateCreated = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    # Relationship to Profiles (one-to-one)
    profile = db.relationship('Profile', backref='user', uselist=False, lazy=True)

    # Relationship to Notifications (one-to-many)
    notifications = db.relationship('Notification', backref='user', lazy=True)

    def __init__(self, name, email, password, role):
        self.Name = name
        self.Email = email
        self.Password = password
        self.Role = role

    def __repr__(self):
        return f"<User {self.Name}>"

class Profile(db.Model):
    __tablename__ = 'profiles'

    ProfileID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('users.UserID'), nullable=False)
    Address = db.Column(db.String(255))
    PhoneNumber = db.Column(db.String(20))
    DateOfBirth = db.Column(db.Date)

    def __init__(self, user_id, address=None, phone_number=None, date_of_birth=None):
        self.UserID = user_id
        self.Address = address
        self.PhoneNumber = phone_number
        self.DateOfBirth = date_of_birth

    def __repr__(self):
        return f"<Profile {self.UserID}>"

class Notification(db.Model):
    __tablename__ = 'notifications'

    NotificationID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('users.UserID'), nullable=False)
    Message = db.Column(db.Text)
    DateSent = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    Status = db.Column(db.Enum('Read', 'Unread', name='status_enum'), default='Unread')

    def __init__(self, user_id, message, status='Unread'):
        self.UserID = user_id
        self.Message = message
        self.Status = status

    def __repr__(self):
        return f"<Notification {self.NotificationID}>"
