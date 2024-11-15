from flask import Blueprint
from controller.user_controller import UserController

user_controller = UserController()

user_bp = Blueprint("user_bp", __name__)
user_bp.route("/create_users", methods=["POST"])(user_controller.create_user)
# user_bp.route("/<int:user_id>", methods=["GET"])(user_controller.get_user)
# user_bp.route("/update_profile", methods=["POST"])(user_controller.update_profile)
# user_bp.route("/send_notification", methods=["POST"])(user_controller.send_notification)
