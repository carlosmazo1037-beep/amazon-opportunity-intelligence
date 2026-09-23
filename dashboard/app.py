
import sqlite3
import pandas as pd
import streamlit as st

st.set_page_config(page_title="AOI",layout="wide")

st.title("Amazon Opportunity Intelligence")

conn=sqlite3.connect("database/aoi.db")

try:
    df=pd.read_sql("SELECT * FROM research ORDER BY id DESC",conn)
except:
    df=pd.DataFrame()

st.metric("Oportunidades detectadas",len(df))

if not df.empty:

    col1,col2=st.columns(2)

    with col1:
        st.subheader("Fuentes")
        st.dataframe(df[["source","status"]].value_counts().reset_index(name="total"))

    with col2:
        st.subheader("Últimas oportunidades")
        st.dataframe(df.tail(15))

else:
    st.info("Aún no existen datos.")


    
from pathlib import Path

log=Path("logs/aoi.log")

if log.exists():

    st.subheader("Últimos eventos")

    st.code(log.read_text()[-3000:])
    

conn.close()