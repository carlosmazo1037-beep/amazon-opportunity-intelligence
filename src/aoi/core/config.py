"""AOI configuration - centralized paths and constants."""
import os
from pathlib import Path

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[3]

load_dotenv(PROJECT_ROOT / ".env")

DB_PATH = PROJECT_ROOT / "database" / "aoi.db"
LOGS_DIR = PROJECT_ROOT / "logs"
REPORTS_DIR = PROJECT_ROOT / "reports"

for d in (DB_PATH.parent, LOGS_DIR, REPORTS_DIR):
    d.mkdir(parents=True, exist_ok=True)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

TREND_COUNTRIES = {
    "united_states": "US",
    "japan": "JP",
    "germany": "DE",
    "spain": "ES",
    "united_kingdom": "GB",
    "canada": "CA",
}
