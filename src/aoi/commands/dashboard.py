"""aoi dashboard — launch the Streamlit dashboard."""
import subprocess
import sys
from pathlib import Path

from aoi.core.logger import logger


def run() -> None:
    logger.info("Launching dashboard...")
    app_path = Path(__file__).parent.parent / "dashboard" / "app.py"
    subprocess.run([sys.executable, "-m", "streamlit", "run", str(app_path)], check=False)