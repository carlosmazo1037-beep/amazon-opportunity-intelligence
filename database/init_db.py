import sqlite3
from pathlib import Path

DB=Path("database/aoi.db")

def create_database():
    DB.parent.mkdir(exist_ok=True)
    conn=sqlite3.connect(DB)
    cur=conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY,
        name TEXT,
        brand TEXT,
        niche TEXT,
        country TEXT,
        marketplace TEXT,
        price REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS research(
        id INTEGER PRIMARY KEY,
        product_id INTEGER,
        source TEXT,
        evidence TEXT,
        status TEXT
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS content(
        id INTEGER PRIMARY KEY,
        product_id INTEGER,
        hook TEXT,
        script TEXT,
        platform TEXT
    )
    """)

    conn.commit()
    conn.close()

if __name__=="__main__":
    create_database()
