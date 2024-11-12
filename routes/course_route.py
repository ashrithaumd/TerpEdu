from flask import Blueprint
from controller.course_controller import CourseController

course_controller = CourseController()

course_bp = Blueprint("course_bp", __name__)
course_bp.route("/create", methods=["POST"])(course_controller.create)
course_bp.route("/create_course",methods=["POST","GET"])(course_controller.create_courses_table)
course_bp.route("/create_course_material",methods=["POST","GET"])(course_controller.create_course_materials_table)
course_bp.route("/<int:course_id>", methods=["GET"])(course_controller.get_course)

