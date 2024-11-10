class User:
    id: int = 0
    username: str = ""
    password: str = ""

    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password