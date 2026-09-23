import sqlite3
import pandas as pd
import streamlit as st

st.set_page_config(page_title="AOI",layout="wide")

st.title("Amazon Opportunity Intelligence")

conn=sqlite3.connect("database/aoi.db")
df=pd.read_sql("SELECT * FROM products",conn)

st.metric("Productos",len(df))
st.dataframe(df)
