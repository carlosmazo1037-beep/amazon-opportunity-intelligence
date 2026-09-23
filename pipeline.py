
import sqlite3
import pandas as pd
from pathlib import Path

from database.init_db import create_database
from research.google_trends import get_trends

DB="database/aoi.db"

def save_trends(rows):

    conn=sqlite3.connect(DB)

    cur=conn.cursor()

    for r in rows:

        cur.execute("""
        INSERT INTO research(product_id,source,evidence,status)
        VALUES(NULL,?,?,?)
        """,(r["source"],f'{r["country"]}: {r["keyword"]}',r["status"]))

    conn.commit()
    conn.close()

def export_excel():

    conn=sqlite3.connect(DB)

    df=pd.read_sql("SELECT * FROM research",conn)

    Path("reports").mkdir(exist_ok=True)

    df.to_excel("reports/opportunities.xlsx",index=False)

    conn.close()

def run():

    print("AOI iniciado")

    create_database()

    trends=get_trends()

    save_trends(trends)

    export_excel()

    print(f"{len(trends)} tendencias guardadas")

    print("Excel generado")

if __name__=="__main__":
    run()