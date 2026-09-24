"""aoi report - generate Excel report from DB."""
import sqlite3
import pandas as pd
from aoi.core.config import DB_PATH, REPORTS_DIR
from aoi.core.logger import logger


def run() -> None:
    logger.info("Generating report...")
    conn = sqlite3.connect(DB_PATH)

    df_trends = pd.read_sql_query("SELECT * FROM trends ORDER BY created_at DESC", conn)

    try:
        df_problems = pd.read_sql_query("SELECT * FROM problems ORDER BY created_at DESC", conn)
    except Exception:
        df_problems = pd.DataFrame()

    conn.close()

    if df_trends.empty and df_problems.empty:
        print("[!] No hay datos. Ejecuta aoi trends o aoi news primero.")
        return

    output = REPORTS_DIR / "opportunities.xlsx"
    with pd.ExcelWriter(output, engine="xlsxwriter") as writer:
        if not df_trends.empty:
            df_trends.to_excel(writer, sheet_name="Trends", index=False)
        if not df_problems.empty:
            df_problems.to_excel(writer, sheet_name="Problems", index=False)

    logger.info("Report saved: %s" % output)
    print("[OK] Reporte: %s (%d trends, %d problems)" % (output, len(df_trends), len(df_problems)))
