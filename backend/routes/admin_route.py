from flask import Blueprint
from controller.admin_controller import AdminController

admin_controller = AdminController()

admin_bp = Blueprint("admin_bp", __name__)
admin_bp.route("/enrollment", methods=["POST"])(admin_controller.enrollment)
admin_bp.route("/get_announcements", methods=["GET"])(admin_controller.get_announcements)