from dao.user_dao import UserDao


class UserController:
    def __init__(self):
        self._user_dao = UserDao()

    def index(self):
        self._user_dao.save_user("test", "test")
        return "index"

    def store(self):
        return "store"

    def show(self, user_id):
        self._user_dao.get_user(user_id)
        return "show"

    def update(self, user_id):
        return "update"

    def delete(self, user_id):
        return "delete"
