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
            # Extract data from the form
            user_id = request.form['UserID']
            password = request.form['password']

            # Check user credentials
            user = self._user_dao.get_user_by_userid_and_password(user_id, password)

            if user:
                # Store user information in session
                session['user_id'] = user[0]
                session['user_name'] = user[1]
                session['user_role'] = user[4]  # Assuming role is stored at index 4

                # Redirect based on user role
                if user[4] == 'Admin':
                    return redirect(url_for('admin_dashboard'))
                elif user[4] == 'Student':
                    return redirect(url_for('student_dashboard'))
                elif user[4] == 'Instructor':
                    return redirect(url_for('instructor_dashboard'))
                else:
                    return "Login successful for a user with no specific dashboard!"

            else:
                return "Invalid UserID or password. Please try again."

        return render_template("frontend/src/login.jsx")

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

