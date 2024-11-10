import dao


class UserDao:
    def __init__(self):
        pass

    def save_user(self, username, password):
        sql = "INSERT INTO users(username, password) VALUES (%s, %s)"
        param = (username, password)
        dao.insert_query(sql, param)

    def get_user(self, user_id):
        sql = "SELECT * FROM users WHERE id = %s"
        params = [user_id]
        data = dao.execute_query(sql, params)        
        return data[0]
