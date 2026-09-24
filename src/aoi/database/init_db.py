import sqlite3
from pathlib import Path

DB=Path("database/aoi.db")

def create_database():
    DB.parent.mkdir(exist_ok=True)
    conn=sqlite3.connect(DB)
    cur=conn.cursor()

    cur.execute('''
    CREATE TABLE IF NOT EXISTS research(
        id INTEGER PRIMARY KEY,
        source TEXT,
        evidence TEXT,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    conn.commit()
    conn.close()

if __name__=="__main__":
    create_database()
