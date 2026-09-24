"""aoi report."""
import sqlite3
import pandas as pd
from aoi.core.config import DB_PATH, REPORTS_DIR
from aoi.core.logger import logger

def run() -> None:
    logger.info("Generating report...")
    conn = sqlite3.connect(DB_PATH)
    df = pd.read_sql_query("SELECT * FROM trends ORDER BY created_at DESC", conn)
    conn.close()
    if df.empty:
        print("[!] No hay datos. Ejecuta aoi trends primero.")
        return
    output = REPORTS_DIR / "opportunities.xlsx"
    df.to_excel(output, index=False)
    logger.info("Report saved: %s" % output)
    print("[OK] Reporte: %s (%d filas)" % (output, len(df)))
