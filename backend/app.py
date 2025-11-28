from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from backend.config import Config
from backend.utils.db import db
from backend import models  # noqa: F401
from backend.routes.auth import auth_bp
from backend.routes.data import data_bp
from backend.routes.upload import upload_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    JWTManager(app)

    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok", "app": "InsightPulse"}), 200

    app.register_blueprint(auth_bp)
    app.register_blueprint(data_bp)
    app.register_blueprint(upload_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=8000)
