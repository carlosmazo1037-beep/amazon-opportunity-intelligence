"""AOI configuration."""
from pathlib import Path
PROJECT_ROOT = Path(__file__).resolve().parents[3]
DB_PATH = PROJECT_ROOT / "database" / "aoi.db"
LOGS_DIR = PROJECT_ROOT / "logs"
REPORTS_DIR = PROJECT_ROOT / "reports"
for d in (DB_PATH.parent, LOGS_DIR, REPORTS_DIR):
    d.mkdir(parents=True, exist_ok=True)
TREND_COUNTRIES = {
    "united_states": "US",
    "japan": "JP",
    "germany": "DE",
    "spain": "ES",
    "united_kingdom": "GB",
    "canada": "CA",
}
