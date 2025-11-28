from datetime import datetime
from backend.utils.db import db

class Metric(db.Model):
    __tablename__ = "metrics"

    id = db.Column(db.Integer, primary_key=True)
    metric_name = db.Column(db.String(128), nullable=False)
    value = db.Column(db.Float, nullable=False)
    segment = db.Column(db.String(64), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "metric_name": self.metric_name,
            "value": self.value,
            "segment": self.segment,
            "created_at": self.created_at.isoformat(),
        }
