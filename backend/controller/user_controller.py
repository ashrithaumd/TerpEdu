from flask import render_template,request,jsonify,session
from dao.user_dao import UserDao
from model.student import User
import json

class UserController:
    def __init__(self):
        self._user_dao = UserDao()

    def create_user(self):
        if request.method == "POST":
            # Handle JSON data
            data = request.json
            UserID = data.get('UserID')
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            role = data.get('role')
            address = data.get('address')
            phone_number = data.get('phoneNumber')  # Use correct key based on React state
            
            # Create user and additional info in database
            self._user_dao.create_users(UserID, name, email, password, role)
            self._user_dao.additional_info_users(UserID, address, phone_number)

            return jsonify({"message": "User created successfully!"}), 201
        
        return jsonify({"error": "Invalid request method"}), 405

    def get_notifications(self):
        notifications = self._user_dao.get_all_notifications()
    
        # Convert notifications to a suitable format for response (e.g., JSON)
        response = [
            {
                "UserID": notification[1],
                "Message": notification[2],
                "DateSent": notification[3].strftime('%Y-%m-%d %H:%M:%S')   # Adjust if you have more columns
            }
            for notification in notifications
        ]
        
        return jsonify(response)

    def login_user(self):
        if request.method == "POST":
            data = request.json
            user_id = data.get('user_id')
            password = data.get('password')
            
            # Authenticate user
            user = self._user_dao.get_user_by_id_and_password(user_id, password)
            if user:
                # Parse user from JSON string to dictionary
                user = json.loads(user)  # Convert JSON string to dictionary
                session['user_id'] = user['user_id'] 
                return jsonify({"message": "Login successful!"})
            else:
                return jsonify({"error": "Invalid credentials"}), 401