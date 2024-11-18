from flask import Blueprint
from controller.admin_controller import enroll_user, assign_instructor

admin_bp = Blueprint('admin_bp', __name__)




