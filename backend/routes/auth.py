from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# Demo-only user for portfolio purposes
DEMO_USER = {
    "email": "demo@insightpulse.com",
    "password": "password123",  # Do NOT use plain text in real apps
    "name": "Demo Analyst",
}

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if email != DEMO_USER["email"] or password != DEMO_USER["password"]:
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity={"email": DEMO_USER["email"], "name": DEMO_USER["name"]})
    return jsonify({"access_token": token, "user": {"name": DEMO_USER["name"], "email": DEMO_USER["email"]}})
