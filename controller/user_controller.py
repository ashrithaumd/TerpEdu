from flask import render_template,request,jsonify
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
            self._user_dao.create_users(UserID, name, email, password, role)
            self._user_dao.additional_info_users(UserID, address, phone_number, date_of_birth)

            return "User created successfully!" 
        
        return render_template("frontend/src/signup.jsx")

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

            