from flask import Blueprint
from controller.user_controller import UserController

user_controller = UserController()

test_bp = Blueprint("user_bp", __name__)
test_bp.route("/", methods=["GET"])(user_controller.index)
test_bp.route("/create", methods=["POST"])(user_controller.store)
test_bp.route("/<int:user_id>", methods=["GET"])(user_controller.show)
test_bp.route("/<int:user_id>/edit", methods=["POST"])(user_controller.update)
test_bp.route("/<int:user_id>", methods=["DELETE"])(user_controller.delete)
