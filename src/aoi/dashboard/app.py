"""AOI Dashboard - Streamlit interactive panel (v0.9.0)."""
import sqlite3
from datetime import datetime
from pathlib import Path
from urllib.parse import quote_plus

import altair as alt
import pandas as pd
import streamlit as st

from aoi.core.config import DB_PATH, LOGS_DIR, REPORTS_DIR

# ---------- Config ----------
st.set_page_config(
    page_title="AOI - Amazon Opportunity Intelligence",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

ASSETS_DIR = Path(__file__).parent / "assets"
LOGO_PATH = ASSETS_DIR / "aoi.png"

# ---------- Estilos ----------
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%);
        padding: 1.5rem 2rem;
        border-radius: 12px;
        color: white;
        margin-bottom: 1.5rem;
    }
    .main-header h1 { color: white; margin: 0; font-size: 1.8rem; }
    .main-header p { color: rgba(255,255,255,0.85); margin: 0.25rem 0 0 0; font-size: 0.95rem; }
    .metric-card {
        background: rgba(102, 126, 234, 0.08);
        border-left: 4px solid #667eea;
        padding: 1rem 1.25rem;
        border-radius: 8px;
        height: 100%;
    }
    .metric-card h3 { margin: 0; color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .metric-card p { margin: 0.25rem 0 0 0; font-size: 1.8rem; font-weight: 700; }
    .metric-card small { color: #888; font-size: 0.75rem; }
    .stTabs [data-baseweb="tab-list"] { gap: 8px; }
    .stTabs [data-baseweb="tab"] {
        height: 45px;
        padding: 0 20px;
        border-radius: 8px 8px 0 0;
    }
    .footer {
        text-align: center;
        padding: 1rem;
        color: #888;
        font-size: 0.85rem;
        border-top: 1px solid rgba(128,128,128,0.2);
        margin-top: 2rem;
    }
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
    try:
        opps = pd.read_sql_query("SELECT * FROM opportunities ORDER BY created_at DESC", conn)
    except Exception:
        opps = pd.DataFrame()
    conn.close()

    for df in (trends, problems, opps):
        if "created_at" in df.columns and not df.empty:
            df["created_at"] = pd.to_datetime(df["created_at"], errors="coerce")

    return trends, problems, opps


def amazon_link(product: str) -> str:
    return f"https://www.amazon.com/s?k={quote_plus(product)}"


def human_time(ts):
    if pd.isna(ts):
        return "-"
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
    col1, col2 = st.columns([1, 6])
    with col1:
        if LOGO_PATH.exists():
            st.image(str(LOGO_PATH), width=100)
    with col2:
        st.markdown("""
        <div style="padding: 0.5rem 0;">
            <h1 style="margin: 0; font-size: 2rem;">AOI - Amazon Opportunity Intelligence</h1>
            <p style="margin: 0.25rem 0 0 0; color: #888; font-size: 1rem;">
                Pipeline automatico de deteccion de oportunidades para Amazon Associates
            </p>
        </div>
        """, unsafe_allow_html=True)


def render_metrics(trends, problems, opps):
    cols = st.columns(4)

    last_run = "-"
    for df in (trends, problems, opps):
        if not df.empty and "created_at" in df.columns:
            last_run = human_time(df["created_at"].iloc[0])
            break

    countries = trends["country"].nunique() if not trends.empty else 0
    high_conf = len(opps[opps["status"] == "ALTA_CONFIANZA"]) if not opps.empty and "status" in opps.columns else 0

    metrics = [
        ("Trends", len(trends), f"{countries} paises"),
        ("Problems", len(problems), "Google News"),
        ("Opportunities", len(opps), f"{high_conf} alta confianza"),
        ("Ultima ejecucion", last_run, "cron diario 6am UTC"),
    ]

    for col, (label, value, sub) in zip(cols, metrics):
        with col:
            st.markdown(f"""
            <div class="metric-card">
                <h3>{label}</h3>
                <p>{value}</p>
                <small>{sub}</small>
            </div>
            """, unsafe_allow_html=True)


def render_opportunities(opps):
    st.subheader("Oportunidades detectadas")
    if opps.empty:
        st.info("Sin oportunidades. Ejecuta: aoi scan")
        return

    col1, col2, col3 = st.columns(3)

    with col1:
        countries = ["Todos"] + sorted(opps["country"].dropna().unique().tolist())
        selected_country = st.selectbox("Pais", countries)

    with col2:
        statuses = ["Todos"] + sorted(opps["status"].dropna().unique().tolist())
        selected_status = st.selectbox("Estado", statuses)

    with col3:
        sources = ["Todos"] + sorted(opps["source"].dropna().unique().tolist())
        selected_source = st.selectbox("Fuente", sources)

    df = opps.copy()
    if selected_country != "Todos":
        df = df[df["country"] == selected_country]
    if selected_status != "Todos":
        df = df[df["status"] == selected_status]
    if selected_source != "Todos":
        df = df[df["source"] == selected_source]

    st.markdown(f"**Mostrando {len(df)} de {len(opps)} oportunidades**")

    display = df[["country", "keyword", "product", "source", "demand", "problem", "status", "created_at"]].copy()
    display["amazon"] = display["product"].apply(amazon_link)
    display["created_at"] = display["created_at"].apply(human_time)

    st.dataframe(
        display,
        use_container_width=True,
        height=450,
        column_config={
            "amazon": st.column_config.LinkColumn("Ver en Amazon", display_text="Buscar"),
            "country": st.column_config.TextColumn("Pais", width="small"),
            "keyword": st.column_config.TextColumn("Keyword", width="medium"),
            "product": st.column_config.TextColumn("Producto", width="medium"),
            "source": st.column_config.TextColumn("Fuente", width="small"),
            "demand": st.column_config.TextColumn("Demanda", width="small"),
            "problem": st.column_config.TextColumn("Problema", width="small"),
            "status": st.column_config.TextColumn("Estado", width="small"),
            "created_at": st.column_config.TextColumn("Cuando", width="small"),
        },
        hide_index=True,
    )


def render_trends(trends):
    if trends.empty:
        st.info("Sin datos de trends. Ejecuta: aoi trends")
        return

    col1, col2 = st.columns([1, 2])

    with col1:
        st.markdown("**Tendencia por pais**")
        by_country = trends.groupby("country").size().reset_index(name="count").sort_values("count", ascending=False)
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
        top_kw = trends.groupby("keyword").size().reset_index(name="count").sort_values("count", ascending=False).head(15)
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


def render_problems(problems):
    if problems.empty:
        st.info("Sin datos de news. Ejecuta: aoi news")
        return

    countries = ["Todos"] + sorted(problems["country"].dropna().unique().tolist())
    selected = st.selectbox("Filtrar por pais", countries, key="problems_country")

    df = problems if selected == "Todos" else problems[problems["country"] == selected]

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


def render_evidence(opps):
    if opps.empty:
        st.info("Sin oportunidades")
        return

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("**Por estado global**")
        counts = opps.groupby("status").size().reset_index(name="count")
        chart = (
            alt.Chart(counts)
            .mark_arc(innerRadius=60, outerRadius=100)
            .encode(
                theta=alt.Theta("count:Q"),
                color=alt.Color("status:N", legend=alt.Legend(orient="bottom")),
                tooltip=["status", "count"],
            )
            .properties(height=300)
        )
        st.altair_chart(chart, use_container_width=True)

    with col2:
        st.markdown("**Por dimension**")
        dims = []
        for dim in ["demand", "problem", "content", "competition"]:
            if dim in opps.columns:
                for val, cnt in opps[dim].value_counts().items():
                    dims.append({"dimension": dim, "value": val, "count": cnt})
        df_dims = pd.DataFrame(dims)
        chart = (
            alt.Chart(df_dims)
            .mark_bar()
            .encode(
                x=alt.X("count:Q", title="Cantidad"),
                y=alt.Y("dimension:N", title=""),
                color=alt.Color("value:N", legend=alt.Legend(orient="bottom", title="")),
                tooltip=["dimension", "value", "count"],
            )
            .properties(height=300)
        )
        st.altair_chart(chart, use_container_width=True)

    st.divider()
    st.markdown("""
    **Que significa cada estado:**
    - **DATO_VERIFICADO** - evidencia directa (Google Trends, RSS oficial)
    - **HIPOTESIS** - inferencia analitica (aun no verificada)
    - **ALTA_CONFIANZA** - 2+ dimensiones verificadas
    - **PENDIENTE** - sin datos suficientes
    """)


def render_reports():
    report = REPORTS_DIR / "opportunities.xlsx"
    if report.exists():
        col1, col2 = st.columns([2, 1])
        with col1:
            size_kb = report.stat().st_size / 1024
            mtime = datetime.fromtimestamp(report.stat().st_mtime)
            st.markdown("### opportunities.xlsx")
            st.markdown(f"- **Tamano:** {size_kb:.1f} KB")
            st.markdown(f"- **Modificado:** {mtime.strftime('%Y-%m-%d %H:%M:%S')}")
        with col2:
            st.markdown("### Descargar")
            with open(report, "rb") as f:
                st.download_button(
                    label="Descargar Excel",
                    data=f,
                    file_name="opportunities.xlsx",
                    mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    use_container_width=True,
                )
    else:
        st.info("Sin reporte. Ejecuta: aoi report")


def render_logs():
    log_file = LOGS_DIR / "aoi.log"
    if log_file.exists():
        content = log_file.read_text(encoding="utf-8", errors="ignore")
        lines = content.strip().split("\n")
        st.caption(f"{len(lines)} lineas - mostrando las ultimas 50")

        level_filter = st.radio("Filtrar", ["Todos", "INFO", "WARNING", "ERROR"], horizontal=True)
        filtered = lines if level_filter == "Todos" else [l for l in lines if level_filter in l]

        st.code("\n".join(filtered[-50:]), language="log")
    else:
        st.info("Sin log. Ejecuta: aoi trends o aoi news")


def render_sidebar():
    with st.sidebar:
        if LOGO_PATH.exists():
            st.image(str(LOGO_PATH), use_container_width=True)

        st.markdown("### Panel de control")
        if st.button("Refrescar datos", use_container_width=True):
            st.cache_data.clear()
            st.rerun()

        st.divider()
        st.markdown("### Estado del pipeline")
        st.markdown("""
        - **Cron:** 6am UTC diario
        - **Fuentes:** Google Trends + News
        - **Almacenamiento:** SQLite
        - **Reportes:** Excel (3 hojas)
        """)

        st.divider()
        st.markdown("### Links")
        st.markdown("""
        - [GitHub Repo](https://github.com/carlosmazo1037-beep/amazon-opportunity-intelligence)
        - [Actions](https://github.com/carlosmazo1037-beep/amazon-opportunity-intelligence/actions)
        - [Releases](https://github.com/carlosmazo1037-beep/amazon-opportunity-intelligence/releases)
        """)

        st.divider()
        st.caption("AOI v0.9.0 - Coste $0/mes")


def main():
    render_sidebar()
    render_header()

    trends, problems, opps = load_data()
    render_metrics(trends, problems, opps)
    st.divider()

    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs(
        ["Oportunidades", "Trends", "Problems", "Evidencia", "Reportes", "Logs"]
    )

    with tab1:
        render_opportunities(opps)
    with tab2:
        render_trends(trends)
    with tab3:
        render_problems(problems)
    with tab4:
        render_evidence(opps)
    with tab5:
        render_reports()
    with tab6:
        render_logs()

    st.markdown('<div class="footer">AOI - Amazon Opportunity Intelligence - v0.9.0 - Pipeline automatico en GitHub Actions</div>', unsafe_allow_html=True)


if __name__ == "__main__":
    main()