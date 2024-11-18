from db import db

class User(db.Model):
    __tablename__ = 'users'
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(100), unique=True, nullable=False)
    Password = db.Column(db.String(100), nullable=False)
    Role = db.Column(db.Enum('Student', 'Instructor', 'Admin', name='role_enum'), nullable=False)
    DateCreated = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    profile = db.relationship('Profile', backref='user', uselist=False, lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)

class Profile(db.Model):
    __tablename__ = 'profiles'
    ProfileID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('users.UserID'), nullable=False)
    Address = db.Column(db.String(255))
    PhoneNumber = db.Column(db.String(20))


class Notification(db.Model):
    __tablename__ = 'notifications'
    NotificationID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey('users.UserID'), nullable=False)
    Message = db.Column(db.Text)
    DateSent = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    
