from flask import Blueprint
from controller.course_controller import CourseController

course_controller = CourseController()

course_bp = Blueprint("course_bp", __name__)
course_bp.route("/create", methods=["POST"])(course_controller.create)
course_bp.route("/create_course",methods=["POST","GET"])(course_controller.courses)
course_bp.route("/course_material/<int:course_id>/<int:inst_id>", methods=["POST", "GET"])(course_controller.course_material)
course_bp.route("/get_uploaded_materials/<int:user_id>", methods=["GET"])(course_controller.get_material)
course_bp.route("/<int:course_id>", methods=["GET"])(course_controller.get_course)
course_bp.route("/get_active_courses",methods=["GET","POST"])(course_controller.get_active_courses)
course_bp.route("/get_all_courses",methods=["GET","POST"])(course_controller.get_all_courses)