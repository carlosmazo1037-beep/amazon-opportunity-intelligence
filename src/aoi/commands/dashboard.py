"""aoi dashboard - launch the Streamlit dashboard."""
import subprocess
import sys
from pathlib import Path

from aoi.core.logger import logger


def run() -> None:
    logger.info("Launching dashboard...")
    app_path = Path(__file__).parent.parent / "dashboard" / "app.py"
    print(f"Starting Streamlit: http://localhost:8501")
    print("Presiona Ctrl+C para detener.")
    subprocess.run(
        [sys.executable, "-m", "streamlit", "run", str(app_path)],
        check=False,
    )
