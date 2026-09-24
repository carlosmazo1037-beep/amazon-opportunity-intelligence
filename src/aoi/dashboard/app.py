"""AOI Dashboard - Streamlit interactive panel."""
import sqlite3
from pathlib import Path

import pandas as pd
import streamlit as st

from aoi.core.config import DB_PATH, LOGS_DIR, REPORTS_DIR, PROJECT_ROOT


st.set_page_config(
    page_title="AOI - Amazon Opportunity Intelligence",
    page_icon="??",
    layout="wide",
)


@st.cache_data(ttl=60)
def load_data():
    """Load trends and problems from SQLite."""
    conn = sqlite3.connect(DB_PATH)

    try:
        trends = pd.read_sql_query("SELECT * FROM trends ORDER BY created_at DESC", conn)
    except Exception:
        trends = pd.DataFrame()

    try:
        problems = pd.read_sql_query("SELECT * FROM problems ORDER BY created_at DESC", conn)
    except Exception:
        problems = pd.DataFrame()

    conn.close()
    return trends, problems


def render_header():
    st.title("?? AOI - Amazon Opportunity Intelligence")
    st.caption("Pipeline automatico de deteccion de oportunidades para Amazon Associates")


def render_metrics(trends, problems):
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Trends", len(trends))
    with col2:
        st.metric("Problems", len(problems))
    with col3:
        if not trends.empty:
            countries = trends["country"].nunique()
        else:
            countries = 0
        st.metric("Paises", countries)
    with col4:
        last_run = "?"
        if not trends.empty:
            last_run = str(trends["created_at"].iloc[0])[:19]
        elif not problems.empty:
            last_run = str(problems["created_at"].iloc[0])[:19]
        st.metric("Ultima ejecucion", last_run)


def render_trends(trends):
    st.subheader("?? Tendencias por pais")
    if trends.empty:
        st.info("Sin datos de trends. Ejecuta: `aoi trends`")
        return

    col1, col2 = st.columns([1, 2])

    with col1:
        by_country = trends.groupby("country").size().reset_index(name="count")
        st.dataframe(by_country, width='stretch')

    with col2:
        st.bar_chart(by_country.set_index("country")["count"])

    st.subheader("?? Top keywords")
    top_kw = trends.groupby("keyword").size().reset_index(name="count").sort_values("count", ascending=False).head(15)
    st.dataframe(top_kw, width='stretch')


def render_problems(problems):
    st.subheader("?? Problemas detectados (Google News)")
    if problems.empty:
        st.info("Sin datos de news. Ejecuta: `aoi news`")
        return

    countries = ["Todos"] + sorted(problems["country"].dropna().unique().tolist())
    selected = st.selectbox("Filtrar por pais", countries)

    df = problems if selected == "Todos" else problems[problems["country"] == selected]

    st.dataframe(
        df[["country", "keyword", "source", "title", "status", "created_at"]],
        width='stretch',
        height=400,
    )
    st.caption(f"Mostrando {len(df)} items de {len(problems)} totales")


def render_evidence(trends, problems):
    st.subheader("?? Estado de evidencia")
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("**Trends**")
        if not trends.empty:
            st.dataframe(trends.groupby("status").size().reset_index(name="count"), width='stretch')

    with col2:
        st.markdown("**Problems**")
        if not problems.empty:
            st.dataframe(problems.groupby("status").size().reset_index(name="count"), width='stretch')


def render_reports():
    st.subheader("?? Reportes disponibles")
    report = REPORTS_DIR / "opportunities.xlsx"
    if report.exists():
        size_kb = report.stat().st_size / 1024
        mtime = pd.Timestamp(report.stat().st_mtime, unit="s")
        st.write(f"**opportunities.xlsx** ? {size_kb:.1f} KB ? modificado {mtime}")
        with open(report, "rb") as f:
            st.download_button(
                label="Descargar Excel",
                data=f,
                file_name="opportunities.xlsx",
                mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            )
    else:
        st.info("Sin reporte. Ejecuta: `aoi report`")


def render_logs():
    st.subheader("?? Ultimos eventos")
    log_file = LOGS_DIR / "aoi.log"
    if log_file.exists():
        content = log_file.read_text(encoding="utf-8", errors="ignore")
        st.code(content[-3000:], language="log")
    else:
        st.info("Sin log. Ejecuta: `aoi trends` o `aoi news`")


def main():
    render_header()

    trends, problems = load_data()

    render_metrics(trends, problems)

    st.divider()

    tab1, tab2, tab3, tab4, tab5 = st.tabs(
        ["?? Trends", "?? Problems", "?? Evidencia", "?? Reportes", "?? Logs"]
    )

    with tab1:
        render_trends(trends)
    with tab2:
        render_problems(problems)
    with tab3:
        render_evidence(trends, problems)
    with tab4:
        render_reports()
    with tab5:
        render_logs()


if __name__ == "__main__":
    main()

