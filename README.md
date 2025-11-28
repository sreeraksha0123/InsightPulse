InsightPulse – Business Analytics Dashboard
==========================================

Tech stack:
- Backend: Flask, Flask-JWT-Extended, SQLAlchemy, PostgreSQL, Boto3
- Frontend: React, Vite, TailwindCSS, Recharts, Axios
- Storage: PostgreSQL for metrics, AWS S3 for file uploads

Folder structure matches:

InsightPulse/
  backend/
    app.py
    requirements.txt
    config.py
    models/metrics.py
    routes/auth.py, data.py, upload.py
    utils/s3_helper.py, db.py
  frontend/
    package.json
    src/App.jsx
    src/components/Dashboard.jsx, FilterPanel.jsx, ChartCard.jsx, Navbar.jsx
    src/services/api.js
  .env.example
  .gitignore
  README.md

Backend exposes:
- POST /api/auth/login          -> demo JWT login
- GET  /api/data/metrics        -> filtered metrics
- POST /api/data/seed-demo      -> populate demo metrics
- POST /api/upload/file         -> upload a file to S3

Frontend:
- Auto-logs into the demo user
- Navbar with "Seed Demo Data" button
- Filter panel for date range + segment
- Dashboard with line charts per metric.
