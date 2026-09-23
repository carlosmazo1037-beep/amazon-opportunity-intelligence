$folders=@(
"src/core",
"src/research",
"src/services",
"dashboard",
"database",
"reports",
"logs",
"tests",
".github/workflows"
)

foreach($f in $folders){
    New-Item -ItemType Directory -Force $f | Out-Null
}

@"
streamlit
pandas
python-dotenv
requests
pytrends
praw
openai
reportlab
openpyxl
pytest
"@ | Set-Content requirements.txt

@"
OPENAI_API_KEY=
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USER_AGENT=
"@ | Set-Content .env.example

@"
.env
__pycache__/
*.pyc
database/aoi.db
logs/
.venv/
"@ | Set-Content .gitignore

@"
import logging
from pathlib import Path

Path("logs").mkdir(exist_ok=True)

logging.basicConfig(
 filename="logs/aoi.log",
 level=logging.INFO,
 format="%(asctime)s %(levelname)s %(message)s"
)

logger=logging.getLogger("AOI")
"@ | Set-Content src/core/logger.py

@"
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
"@ | Set-Content database/init_db.py

@"
from database.init_db import create_database
from src.core.logger import logger

def run():
    logger.info("Pipeline iniciado")
    create_database()
    logger.info("Pipeline finalizado")
    print("AOI OK")

if __name__=="__main__":
    run()
"@ | Set-Content pipeline.py

@"
import streamlit as st

st.set_page_config(page_title="AOI",layout="wide")

st.title("Amazon Opportunity Intelligence")

st.success("Proyecto funcionando")
"@ | Set-Content dashboard/app.py

@"
name: AOI Production

on:
 workflow_dispatch:
 schedule:
   - cron: '0 6 * * *'

jobs:
 build:
   runs-on: ubuntu-latest

   steps:
     - uses: actions/checkout@v4

     - uses: actions/setup-python@v5
       with:
         python-version: '3.13'

     - run: pip install -r requirements.txt

     - run: python pipeline.py

     - uses: actions/upload-artifact@v4
       with:
         name: AOI-Reports
         path: reports/
"@ | Set-Content .github/workflows/pipeline.yml

Write-Host ""
Write-Host "Proyecto generado correctamente" -ForegroundColor Green