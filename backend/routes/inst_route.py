from flask import Blueprint, jsonify
from controller.inst_controller import InstController

inst_controller = InstController()

inst_bp = Blueprint("inst_bp", __name__)
inst_bp.route("/announce",methods=["POST","GET"])(inst_controller.post_announcement)

@inst_bp.route("/get_courses_by_inst/<int:instructor_id>", methods=["GET"])
def fetch_courses_by_instructor(instructor_id):
    try:
        response = inst_controller.get_courses_by_instructor(instructor_id)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


