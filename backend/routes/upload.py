from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from backend.utils.s3_helper import upload_file_to_s3

upload_bp = Blueprint("upload", __name__, url_prefix="/api/upload")

@upload_bp.route("/file", methods=["POST"])
@jwt_required()
def upload_file():
    """Upload a CSV or file to S3 and return its URL."""
    if "file" not in request.files:
        return jsonify({"message": "No file part in request"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"message": "No selected file"}), 400

    timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    key = f"uploads/{timestamp}-{file.filename}"

    try:
        url = upload_file_to_s3(file, key, content_type=file.mimetype)
        return jsonify({"url": url})
    except RuntimeError as e:
        return jsonify({"message": str(e)}), 500
