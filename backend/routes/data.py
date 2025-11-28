from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from backend.models.metrics import Metric
from backend.utils.db import db

data_bp = Blueprint("data", __name__, url_prefix="/api/data")

@data_bp.route("/metrics", methods=["GET"])
@jwt_required()
def get_metrics():
    """Return metrics with optional filters: start_date, end_date, segment."""
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    segment = request.args.get("segment")

    query = Metric.query

    if start_date:
        try:
            start = datetime.fromisoformat(start_date)
            query = query.filter(Metric.created_at >= start)
        except ValueError:
            return jsonify({"message": "Invalid start_date format"}), 400

    if end_date:
        try:
            end = datetime.fromisoformat(end_date)
            query = query.filter(Metric.created_at <= end)
        except ValueError:
            return jsonify({"message": "Invalid end_date format"}), 400

    if segment:
        query = query.filter(Metric.segment == segment)

    metrics = query.order_by(Metric.created_at.desc()).limit(200).all()
    return jsonify([m.to_dict() for m in metrics])

@data_bp.route("/seed-demo", methods=["POST"])
def seed_demo_data():
    """Seed the database with some demo metrics (for local testing only)."""
    Metric.query.delete()
    db.session.commit()

    base_time = datetime.utcnow()
    segments = ["North", "South", "East", "West"]
    metric_names = ["Revenue", "Active Users", "Conversion Rate"]

    rows = []
    for i in range(60):
        for name in metric_names:
            rows.append(
                Metric(
                    metric_name=name,
                    value=round(1000 + i * 10 + (i % 5) * 50, 2),
                    segment=segments[i % len(segments)],
                    created_at=base_time - timedelta(days=i),
                )
            )

    db.session.add_all(rows)
    db.session.commit()
    return jsonify({"message": "Demo data seeded", "count": len(rows)})
