from flask import Blueprint
from controller.user_controller import UserController

user_controller = UserController()

user_bp = Blueprint("user_bp", __name__)
user_bp.route("/create_users", methods=["POST"])(user_controller.create_user)
user_bp.route("/get_notifications",methods=["GET"])(user_controller.get_notifications)
user_bp.route("/login",methods=["POST"])(user_controller.login_user)
user_bp.route("/get_all_users",methods=["POST","GET"])(user_controller.get_all_users)