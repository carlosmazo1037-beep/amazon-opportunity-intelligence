"""AOI Dashboard - Streamlit interactive panel (v0.5.1)."""
import sqlite3
from datetime import datetime

import altair as alt
import pandas as pd
import streamlit as st

from aoi.core.config import DB_PATH, LOGS_DIR, REPORTS_DIR

st.set_page_config(
    page_title="AOI - Amazon Opportunity Intelligence",
    page_icon="??",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ---------- Estilos ----------
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1.5rem 2rem;
        border-radius: 12px;
        color: white;
        margin-bottom: 1.5rem;
    }
    .main-header h1 { color: white; margin: 0; font-size: 2rem; }
    .main-header p { color: rgba(255,255,255,0.85); margin: 0.25rem 0 0 0; }
    .metric-card {
        background: #f8f9fa;
        border-left: 4px solid #667eea;
        padding: 1rem 1.25rem;
        border-radius: 8px;
        height: 100%;
    }
    .metric-card h3 { margin: 0; color: #666; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .metric-card p { margin: 0.25rem 0 0 0; font-size: 1.8rem; font-weight: 700; color: #333; }
    .metric-card small { color: #888; }
    .stTabs [data-baseweb="tab-list"] { gap: 8px; }
    .stTabs [data-baseweb="tab"] {
        height: 45px;
        padding: 0 20px;
        background-color: #f0f2f6;
        border-radius: 8px 8px 0 0;
    }
    .stTabs [aria-selected="true"] { background-color: #667eea; color: white; }
</style>
""", unsafe_allow_html=True)


# ---------- Data ----------
@st.cache_data(ttl=60)
def load_data():
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

    for df in (trends, problems):
        if "created_at" in df.columns and not df.empty:
            df["created_at"] = pd.to_datetime(df["created_at"], errors="coerce")

    return trends, problems


def human_time(ts):
    if pd.isna(ts):
        return "?"
    delta = datetime.now() - ts
    secs = int(delta.total_seconds())
    if secs < 60:
        return f"hace {secs}s"
    if secs < 3600:
        return f"hace {secs // 60} min"
    if secs < 86400:
        return f"hace {secs // 3600} h"
    return f"hace {secs // 86400} d"


# ---------- Render ----------
def render_header():
    st.markdown("""
    <div class="main-header">
        <h1>?? AOI - Amazon Opportunity Intelligence</h1>
        <p>Pipeline automatico de deteccion de oportunidades para Amazon Associates ? v0.5.1</p>
    </div>
    """, unsafe_allow_html=True)


def render_metrics(trends, problems):
    cols = st.columns(4)

    last_run = "?"
    for df in (trends, problems):
        if not df.empty and "created_at" in df.columns:
            last_run = human_time(df["created_at"].iloc[0])
            break

    countries = trends["country"].nunique() if not trends.empty else 0
    top_country = trends["country"].value_counts().index[0] if not trends.empty else "?"

    metrics = [
        ("??", "Trends", len(trends), f"{countries} paises"),
        ("??", "Problems", len(problems), "Google News"),
        ("??", "Top pais", top_country, "mas tendencias"),
        ("??", "Ultima ejecucion", last_run, "cron diario 6am UTC"),
    ]

    for col, (icon, label, value, sub) in zip(cols, metrics):
        with col:
            st.markdown(f"""
            <div class="metric-card">
                <h3>{icon} {label}</h3>
                <p>{value}</p>
                <small>{sub}</small>
            </div>
            """, unsafe_allow_html=True)


def render_trends(trends):
    if trends.empty:
        st.info("Sin datos de trends. Ejecuta: `aoi trends`")
        return

    col1, col2 = st.columns([1, 2])

    with col1:
        st.markdown("**Tendencia por pais**")
        by_country = (
            trends.groupby("country").size().reset_index(name="count").sort_values("count", ascending=False)
        )
        chart = (
            alt.Chart(by_country)
            .mark_bar(cornerRadiusTopRight=6, cornerRadiusBottomRight=6, color="#667eea")
            .encode(
                x=alt.X("count:Q", title="Cantidad"),
                y=alt.Y("country:N", sort="-x", title=""),
                tooltip=["country", "count"],
            )
            .properties(height=280)
        )
        st.altair_chart(chart, use_container_width=True)

    with col2:
        st.markdown("**Top 15 keywords**")
        top_kw = (
            trends.groupby("keyword").size().reset_index(name="count")
            .sort_values("count", ascending=False).head(15)
        )
        chart = (
            alt.Chart(top_kw)
            .mark_bar(cornerRadiusTopRight=6, cornerRadiusBottomRight=6, color="#764ba2")
            .encode(
                x=alt.X("count:Q", title="Frecuencia"),
                y=alt.Y("keyword:N", sort="-x", title=""),
                tooltip=["keyword", "count"],
            )
            .properties(height=430)
        )
        st.altair_chart(chart, use_container_width=True)

    with st.expander("?? Ver tabla completa de trends", expanded=False):
        st.dataframe(trends, use_container_width=True, height=300)


def render_problems(problems):
    if problems.empty:
        st.info("Sin datos de news. Ejecuta: `aoi news`")
        return

    col1, col2, col3 = st.columns([2, 2, 1])

    with col1:
        countries = sorted(problems["country"].dropna().unique().tolist())
        selected_countries = st.multiselect("Paises", countries, default=countries[:3] if len(countries) >= 3 else countries)

    with col2:
        keywords = sorted(problems["keyword"].dropna().unique().tolist())
        selected_keywords = st.multiselect("Keywords", keywords, default=[])

    with col3:
        st.metric("Filtrados", len(problems))

    df = problems.copy()
    if selected_countries:
        df = df[df["country"].isin(selected_countries)]
    if selected_keywords:
        df = df[df["keyword"].isin(selected_keywords)]

    st.markdown(f"**Mostrando {len(df)} de {len(problems)} items**")

    display = df[["country", "keyword", "title", "link", "created_at"]].copy()
    display["created_at"] = display["created_at"].apply(human_time)

    st.dataframe(
        display,
        use_container_width=True,
        height=450,
        column_config={
            "link": st.column_config.LinkColumn("Link", display_text="Abrir"),
            "title": st.column_config.TextColumn("Titulo", width="large"),
            "country": st.column_config.TextColumn("Pais", width="small"),
            "keyword": st.column_config.TextColumn("Keyword", width="medium"),
            "created_at": st.column_config.TextColumn("Cuando", width="small"),
        },
        hide_index=True,
    )


def render_evidence(trends, problems):
    col1, col2 = st.columns(2)

    def donut(df, title, color):
        if df.empty:
            st.info(f"Sin {title}")
            return
        counts = df.groupby("status").size().reset_index(name="count")
        chart = (
            alt.Chart(counts)
            .mark_arc(innerRadius=60, outerRadius=100)
            .encode(
                theta=alt.Theta("count:Q"),
                color=alt.Color("status:N", legend=alt.Legend(orient="bottom")),
                tooltip=["status", "count"],
            )
            .properties(height=280, title=title)
        )
        st.altair_chart(chart, use_container_width=True)

    with col1:
        donut(trends, "Trends por estado", "#667eea")
    with col2:
        donut(problems, "Problems por estado", "#764ba2")

    st.divider()
    st.markdown("**Que significa cada estado**")
    st.markdown("""
    - ?? **DATO_VERIFICADO** ? evidencia directa (Google Trends, RSS oficial)
    - ?? **HIPOTESIS** ? inferencia analitica (aun no verificada)
    - ? **PENDIENTE** ? sin datos suficientes
    """)


def render_reports():
    report = REPORTS_DIR / "opportunities.xlsx"
    if report.exists():
        col1, col2 = st.columns([2, 1])
        with col1:
            size_kb = report.stat().st_size / 1024
            mtime = datetime.fromtimestamp(report.stat().st_mtime)
            st.markdown(f"### ?? opportunities.xlsx")
            st.markdown(f"- **Tamano:** {size_kb:.1f} KB")
            st.markdown(f"- **Modificado:** {mtime.strftime('%Y-%m-%d %H:%M:%S')}")
            st.markdown(f"- **Ubicacion:** `{report}`")
        with col2:
            st.markdown("### Descargar")
            with open(report, "rb") as f:
                st.download_button(
                    label="?? Excel",
                    data=f,
                    file_name="opportunities.xlsx",
                    mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    use_container_width=True,
                )
    else:
        st.info("Sin reporte. Ejecuta: `aoi report`")


def render_logs():
    log_file = LOGS_DIR / "aoi.log"
    if log_file.exists():
        content = log_file.read_text(encoding="utf-8", errors="ignore")
        lines = content.strip().split("\n")
        st.caption(f"{len(lines)} lineas en el log ? mostrando las ultimas 50")

        level_filter = st.radio("Filtrar por nivel", ["Todos", "INFO", "WARNING", "ERROR"], horizontal=True)

        filtered = lines
        if level_filter != "Todos":
            filtered = [l for l in lines if level_filter in l]

        st.code("\n".join(filtered[-50:]), language="log")
    else:
        st.info("Sin log. Ejecuta: `aoi trends` o `aoi news`")


def render_sidebar():
    with st.sidebar:
        st.markdown("### ?? Panel de control")
        if st.button("?? Refrescar datos", use_container_width=True):
            st.cache_data.clear()
            st.rerun()

        st.divider()
        st.markdown("### ?? Estado del pipeline")
        st.markdown("""
        - **Cron:** 6am UTC diario
        - **Fuentes:** Google Trends + Google News
        - **Almacenamiento:** SQLite
        - **Reportes:** Excel (2 hojas)
        """)

        st.divider()
        st.markdown("### ?? Links")
        st.markdown("""
        - [GitHub Repo](https://github.com/carlosmazo1037-beep/amazon-opportunity-intelligence)
        - [Actions](https://github.com/carlosmazo1037-beep/amazon-opportunity-intelligence/actions)
        - [Releases](https://github.com/carlosmazo1037-beep/amazon-opportunity-intelligence/releases)
        """)

        st.divider()
        st.caption("AOI v0.5.1 ? Amazon Opportunity Intelligence")


def main():
    render_sidebar()
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
