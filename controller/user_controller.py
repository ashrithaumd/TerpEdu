from flask import render_template
from dao.user_dao import UserDao
from model.student import User


class UserController:
    def __init__(self):
        self._user_dao = UserDao()

    def index(self):
        self._user_dao.save_user("test", "test")
        return "index"

    def store(self):
        return "store"

    def show(self, user_id):
        userid, username, password = self._user_dao.get_user(user_id)
        user = User(userid, username, password)
        return render_template("users/show.html", data={"user": user})

    def update(self, user_id):
        return "update"

    def delete(self, user_id):
        return "delete"
