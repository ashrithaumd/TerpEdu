from flask import render_template, request, redirect, url_for, session, jsonify
from dao.user_dao import UserDao

class UserController:
    def __init__(self):
        self._user_dao = UserDao()

    def create_user(self):
        if request.method == "POST":
            # Extract data from the form
            user_id = request.form.get('UserID')
            name = request.form.get('name')
            email = request.form.get('email')
            password = request.form.get('password')
            role = request.form.get('role')
            address = request.form.get('address')
            phone_number = request.form.get('phone_number')
            date_of_birth = request.form.get('date_of_birth')

            # Create user and add additional info
            self._user_dao.create_users(name, email, password, role)
            self._user_dao.additional_info_users(user_id, address, phone_number, date_of_birth)

            return "User created successfully!"

        return render_template("frontend/src/signup.jsx")

    def login_user(self):
       if request.method == "POST":
        try:
            # Access data sent from the frontend as JSON
            data = request.get_json()
            if not data or 'UserID' not in data or 'password' not in data:
                return jsonify({"status": "error", "message": "Invalid data"}), 400

            user_id = data['UserID']
            password = data['password']

            # Fetch user from the database
            user = self._user_dao.get_user_by_id_and_password(user_id, password)

            if user:
                # Assuming the user tuple is structured as: (UserID, Name, Email, Password, Role, ...)
                # Update to match your actual table column order if needed.
                user_role = user[4]  # Assuming that the role is at index 4

                # Store user information in session
                session['user_id'] = user[0]  # UserID
                session['user_name'] = user[1]  # Name
                session['user_role'] = user_role  # Role

                # Send back the user role to the frontend
                return jsonify({"status": "success", "role": user_role})
            else:
                return jsonify({"status": "error", "message": "Invalid UserID or password. Please try again."}), 401

        except Exception as e:
            return jsonify({"status": "error", "message": f"An error occurred during login: {str(e)}"}), 500
    
        return jsonify({"status": "error", "message": "Only POST requests are allowed."}), 405

    def get_notifications(self):
        notifications = self._user_dao.get_all_notifications()

        # Convert notifications to a suitable format for response (e.g., JSON)
        response = [
            {
                "UserID": notification['UserID'],
                "Message": notification['Message'],
                "DateSent": notification['DateSent'].strftime('%Y-%m-%d %H:%M:%S')
            }
            for notification in notifications
        ]

        return jsonify(response)

    def get_all_users(self):
        # Fetch all users from UserDao
        users = self._user_dao.get_all_users()

        if users:
            response = [
                {
                    "UserID": user[0],
                    "Name": user[1],
                    "Email": user[2],
                    "Role": user[3],
                    "DateCreated": user[4].strftime('%Y-%m-%d %H:%M:%S')  # Format the date to a readable format
                }
                for user in users
            ]
            return jsonify(response)
        else:
            return jsonify({"message": "No users found"}), 404
        
   


 