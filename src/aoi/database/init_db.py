"""SQLite database - schema and persistence."""
import sqlite3
from aoi.core.config import DB_PATH
from aoi.core.logger import logger


def create_database():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS trends (
        id INTEGER PRIMARY KEY,
        country TEXT,
        keyword TEXT,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS problems (
        id INTEGER PRIMARY KEY,
        country TEXT,
        keyword TEXT,
        source TEXT,
        title TEXT,
        link TEXT,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS opportunities (
        id INTEGER PRIMARY KEY,
        country TEXT,
        keyword TEXT,
        product TEXT,
        source TEXT,
        demand TEXT,
        problem TEXT,
        content TEXT,
        competition TEXT,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()
    logger.info("Database ready")


def save_trends(trends: list):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    for t in trends:
        cur.execute(
            "INSERT INTO trends (country, keyword, status) VALUES (?, ?, ?)",
            (t["country"], t["keyword"], t["status"]),
        )
    conn.commit()
    conn.close()
    logger.info("Saved %d trends to DB" % len(trends))


def save_problems(problems: list):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    for p in problems:
        cur.execute(
            "INSERT INTO problems (country, keyword, source, title, link, status) VALUES (?, ?, ?, ?, ?, ?)",
            (p["country"], p["keyword"], p["source"], p["title"], p["link"], p["status"]),
        )
    conn.commit()
    conn.close()
    logger.info("Saved %d problems to DB" % len(problems))


def save_opportunities(opps: list):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    for o in opps:
        cur.execute(
            "INSERT INTO opportunities (country, keyword, product, source, demand, problem, content, competition, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (o["country"], o["keyword"], o["product"], o["source"],
             o["demand"], o["problem"], o["content"], o["competition"], o["status"]),
        )
    conn.commit()
    conn.close()
    logger.info("Saved %d opportunities to DB" % len(opps))
