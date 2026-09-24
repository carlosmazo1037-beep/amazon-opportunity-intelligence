"""aoi report - generate Excel report from DB (3 sheets)."""
import sqlite3
import pandas as pd
from aoi.core.config import DB_PATH, REPORTS_DIR
from aoi.core.logger import logger


def run() -> None:
    logger.info("Generating report...")
    conn = sqlite3.connect(DB_PATH)

    def safe_query(sql):
        try:
            return pd.read_sql_query(sql, conn)
        except Exception:
            return pd.DataFrame()

    df_trends = safe_query("SELECT * FROM trends ORDER BY created_at DESC")
    df_problems = safe_query("SELECT * FROM problems ORDER BY created_at DESC")
    df_opps = safe_query("SELECT * FROM opportunities ORDER BY created_at DESC")

    conn.close()

    if df_trends.empty and df_problems.empty and df_opps.empty:
        print("[!] No hay datos. Ejecuta aoi scan primero.")
        return

    output = REPORTS_DIR / "opportunities.xlsx"
    with pd.ExcelWriter(output, engine="xlsxwriter") as writer:
        if not df_trends.empty:
            df_trends.to_excel(writer, sheet_name="Trends", index=False)
        if not df_problems.empty:
            df_problems.to_excel(writer, sheet_name="Problems", index=False)
        if not df_opps.empty:
            df_opps.to_excel(writer, sheet_name="Opportunities", index=False)

    logger.info("Report saved: %s" % output)
    print("[OK] Reporte: %s (%d trends, %d problems, %d opportunities)" % (
        output, len(df_trends), len(df_problems), len(df_opps)))
