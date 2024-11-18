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
                user = json.loads(user)  # Convert JSON string to a dictionary
                session['user_id'] = user['user_id']

                # Assuming you have a method to retrieve the role from the user data
                user_data = self._user_dao.get_user(user_id)  # Get full user data, including the role
                role = user_data[4]  # Assuming the role is at index 4 in the returned tuple

                # Return a JSON response with status and role
                return jsonify({"status": "success", "role": role})
            else:
                return jsonify({"status": "failed", "message": "Invalid credentials"}), 401
            
    def get_all_users(self):
        users = self._user_dao.get_all_users()
        if users:
            response=[
                {
                    "UserID": user[0],
                    "Name": user[1],
                    "Email":user[2],
                    "Role": user[3],
                    "DateCreated":user[4].strftime('%Y-%m-%d %H:%M:%S')
                }
                for user in users
            ]
            return jsonify(response)
        else:
            return jsonify({"error": "No users found"}), 404