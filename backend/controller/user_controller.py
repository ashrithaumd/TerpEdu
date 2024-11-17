from flask import render_template, request, redirect, url_for, session, jsonify
from dao.user_dao import UserDao
from model.student import User

class UserController:
    def __init__(self):
        self._user_dao = UserDao()

    def create_user(self):
        if request.method == "POST":
            # Extract data from the form
            UserID = request.form['UserID']
            name = request.form['name']
            email = request.form['email']
            password = request.form['password']
            role = request.form['role']
            address = request.form['address']
            phone_number = request.form['phone_number']
            date_of_birth = request.form['date_of_birth']

            # Create user and add additional info
            self._user_dao.create_users(name, email, password, role)
            self._user_dao.additional_info_users(UserID, address, phone_number, date_of_birth)

            return "User created successfully!"

        return render_template("frontend/src/signup.jsx")

    def login_user(self):
        if request.method == "POST":
            # Access data sent from the frontend as JSON
            data = request.get_json()  # Use get_json() to parse JSON request data
            
            if not data or 'UserID' not in data or 'password' not in data:
                return jsonify({"status": "error", "message": "Invalid data"}), 400

            user_id = data['UserID']
            password = data['password']

            # Your login logic here
            user = self._user_dao.get_user_by_id_and_password(user_id, password)
            if user:
             print("User data fetched:", user)
            else:
              print("No user found with provided credentials.")

            if user:
                # Assuming user role is at index 4
                user_role = user[4]

                # Store user information in session
                session['user_id'] = user[0]
                session['user_name'] = user[1]
                session['user_role'] = user_role

                # Send back the user role to frontend
                return jsonify({"status": "success", "role": user_role})
            else:
                return jsonify({"status": "error", "message": "Invalid UserID or password. Please try again."}), 401
        
        return jsonify({"status": "error", "message": "Only POST requests are allowed."}), 405

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

