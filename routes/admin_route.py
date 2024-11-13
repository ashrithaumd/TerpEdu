from flask import Blueprint
from ..controller.admin_controller import enroll_user, assign_instructor

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/enroll', methods=['POST'])
def enroll_route():
    return enroll_user()

@admin_bp.route('/assign-instructor', methods=['POST'])
def assign_instructor_route():
    return assign_instructor()
