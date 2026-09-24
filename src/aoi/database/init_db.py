"""SQLite database."""
import sqlite3
from aoi.core.config import DB_PATH
from aoi.core.logger import logger

def create_database():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS trends (id INTEGER PRIMARY KEY, country TEXT, keyword TEXT, status TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
    conn.commit()
    conn.close()
    logger.info("Database ready")

def save_trends(trends: list):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    for t in trends:
        cur.execute("INSERT INTO trends (country, keyword, status) VALUES (?, ?, ?)", (t["country"], t["keyword"], t["status"]))
    conn.commit()
    conn.close()
    logger.info("Saved %d trends to DB" % len(trends))
